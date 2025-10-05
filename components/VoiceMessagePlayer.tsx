// Fix: Created content for the previously empty components/VoiceMessagePlayer.tsx file.
import React, { useState, useEffect, useRef } from 'react';
import { decode, decodeAudioData } from '../utils/audio.ts';
// Fix: Added .tsx extension to the import path.
import { PlayIcon, PauseIcon } from './icons.tsx';
// Fix: Added .tsx extension to the import path.
import { Spinner } from './Spinner.tsx';

interface VoiceMessagePlayerProps {
  audioUrl: string; // "data:audio/pcm;base64,..."
}

// Create a single AudioContext instance to be reused.
// Fix: Cast window to any to allow webkitAudioContext for broader browser support.
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

export const VoiceMessagePlayer: React.FC<VoiceMessagePlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    let active = true;
    const loadAudio = async () => {
      try {
        setIsLoading(true);
        const base64Data = audioUrl.split(',')[1];
        if (!base64Data) {
            throw new Error("Invalid audio data URL");
        }
        const audioBytes = decode(base64Data);
        const buffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);
        if (active) {
          audioBufferRef.current = buffer;
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to decode audio:", error);
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadAudio();

    return () => {
      active = false;
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioBufferRef.current || isLoading) return;

    if (isPlaying) {
      sourceRef.current?.stop();
      setIsPlaying(false);
    } else {
      const source = audioContext.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContext.destination);
      source.onended = () => {
        setIsPlaying(false);
        sourceRef.current = null;
      };
      source.start();
      sourceRef.current = source;
      setIsPlaying(true);
    }
  };
  
  if (isLoading) {
      return <div className="p-2 flex items-center justify-center"><Spinner className="w-5 h-5" /></div>;
  }
  
  if (!audioBufferRef.current) {
      return null;
  }

  return (
    <button onClick={togglePlay} className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" disabled={isLoading}>
      {isPlaying ? <PauseIcon className="w-5 h-5 text-gray-700" /> : <PlayIcon className="w-5 h-5 text-gray-700" />}
    </button>
  );
};
