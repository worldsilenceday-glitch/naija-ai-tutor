// Fix: Created content for the previously empty hooks/useVoiceChat.ts file.
import { useState, useRef, useCallback, useEffect } from 'react';
// Fix: Removed ConnectLiveRequest as it is not an exported member.
import { LiveServerMessage, Modality, Blob } from '@google/genai';
import { ai } from '../services/aiTutorService.ts';
import { encode, decode, decodeAudioData } from '../utils/audio.ts';

const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;
const BUFFER_SIZE = 4096;

export const useVoiceChat = (systemInstruction: string) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    
    const sessionPromiseRef = useRef<Promise<any> | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    const outputSources = useRef(new Set<AudioBufferSourceNode>()).current;
    const nextStartTimeRef = useRef(0);

    const stopPlayback = useCallback(() => {
        outputSources.forEach(source => {
            source.stop();
        });
        outputSources.clear();
        nextStartTimeRef.current = 0;
        setIsSpeaking(false);
    }, [outputSources]);

    const stopRecording = useCallback(async () => {
        if (!isRecording && !sessionPromiseRef.current) return;
        
        setIsRecording(false);
        
        if (sessionPromiseRef.current) {
            try {
                const session = await sessionPromiseRef.current;
                session.close();
            } catch (error) {
                console.error("Error closing session:", error);
            } finally {
                sessionPromiseRef.current = null;
            }
        }

        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (mediaStreamSourceRef.current) {
            mediaStreamSourceRef.current.disconnect();
            mediaStreamSourceRef.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
            await inputAudioContextRef.current.close().catch(e => console.error("Error closing input context", e));
        }
        
        inputAudioContextRef.current = null;
        stopPlayback();
    }, [isRecording, stopPlayback]);

    const startRecording = useCallback(async () => {
        if (isRecording) return;

        setTranscript('');
        setIsRecording(true);

        try {
            // Setup output audio context
            if (!outputAudioContextRef.current || outputAudioContextRef.current.state === 'closed') {
                // Fix: Cast window to any to allow webkitAudioContext for broader browser support.
                outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: OUTPUT_SAMPLE_RATE });
            }
            const outputNode = outputAudioContextRef.current.createGain();
            outputNode.connect(outputAudioContextRef.current.destination);
            
            // Setup input audio context
            if (!inputAudioContextRef.current || inputAudioContextRef.current.state === 'closed') {
                 // Fix: Cast window to any to allow webkitAudioContext for broader browser support.
                 inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: INPUT_SAMPLE_RATE });
            }

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            
            const liveRequest = {
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    systemInstruction,
                },
                callbacks: {
                    onopen: () => {
                        const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
                        mediaStreamSourceRef.current = source;
                        const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(BUFFER_SIZE, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const l = inputData.length;
                            const int16 = new Int16Array(l);
                            for (let i = 0; i < l; i++) {
                                int16[i] = inputData[i] * 32768;
                            }
                            const pcmBlob: Blob = {
                                data: encode(new Uint8Array(int16.buffer)),
                                mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}`,
                            };
                            if (sessionPromiseRef.current) {
                                sessionPromiseRef.current.then((session) => {
                                    session.sendRealtimeInput({ media: pcmBlob });
                                });
                            }
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContextRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.interrupted) {
                            stopPlayback();
                        }
                        
                        if (message.serverContent?.inputTranscription) {
                            setTranscript(message.serverContent.inputTranscription.text);
                        }
                        
                        if (message.serverContent?.turnComplete) {
                            setTranscript('');
                        }

                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                        if (base64Audio) {
                            setIsSpeaking(true);
                            const audioContext = outputAudioContextRef.current!;
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContext.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, OUTPUT_SAMPLE_RATE, 1);
                            const sourceNode = audioContext.createBufferSource();
                            sourceNode.buffer = audioBuffer;
                            sourceNode.connect(outputNode);
                            sourceNode.addEventListener('ended', () => {
                                outputSources.delete(sourceNode);
                                if (outputSources.size === 0) {
                                    setIsSpeaking(false);
                                }
                            });
                            sourceNode.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            outputSources.add(sourceNode);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live session error:', e);
                        stopRecording();
                    },
                    onclose: (e: CloseEvent) => {
                        // The session is closed, ensure recording state is false.
                        if(isRecording) {
                            stopRecording();
                        }
                    },
                }
            };

            sessionPromiseRef.current = ai.live.connect(liveRequest);

        } catch (error) {
            console.error('Failed to start voice chat:', error);
            setIsRecording(false);
        }
    }, [isRecording, stopRecording, stopPlayback, systemInstruction, outputSources]);
    
    useEffect(() => {
        return () => {
            // Cleanup on unmount
            stopRecording();
            if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
                outputAudioContextRef.current.close().catch(e => console.error("Error closing output context", e));
            }
        };
    }, [stopRecording]);

    return { isRecording, isSpeaking, transcript, startRecording, stopRecording };
};
