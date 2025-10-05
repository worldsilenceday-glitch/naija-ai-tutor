// constants.ts
// Fix: Added .ts extension to the import path.
import type { Subject, Language, GameType, Badge } from './types.ts';

export const SUBJECTS: Subject[] = [
  // Core / General Subjects
    { name: 'English Language', emoji: '📚', description: 'English language skills and comprehension.', details: [
            'Grammar: Parts of speech, sentence structure, tenses',
            'Comprehension: Passage analysis, inference, summary',
            'Essay Writing: Argumentative, narrative, expository',
            'Precis Writing and Letter/Application writing',
            'Oral/Aural Comprehension and phonetics basics'
        ], imageUrl: 'https://source.unsplash.com/400x300/?english,books', category: 'General' },
    { name: 'Mathematics', emoji: '🔢', description: 'Numbers, algebra, geometry and more.', details: [
            'Number systems, surds and indices',
            'Algebra: equations, inequalities, polynomials',
            'Coordinate geometry and straight lines',
            'Trigonometry: identities and applications',
            'Calculus basics: differentiation and integration',
            'Geometry: mensuration and Euclidean geometry',
            'Statistics & probability: averages, dispersion, probability'
        ], imageUrl: 'https://source.unsplash.com/400x300/?math', category: 'General' },
    { name: 'Civic Education', emoji: '🗳️', description: 'Civic responsibilities and citizenship.', details: [
            'Citizenship and civic responsibilities',
            'Human rights and duties',
            'Democracy and governance',
            'National development and community service',
            'Conflict resolution and civic values'
        ], imageUrl: 'https://source.unsplash.com/400x300/?civic', category: 'General' },
    { name: 'Economics', emoji: '💰', description: 'Principles of economics and finance.', details: [
            'Basic economic problems and systems',
            'Demand, supply and market equilibrium',
            'Production, costs and revenue',
            'Money, banking and public finance',
            'International trade and development economics'
        ], imageUrl: 'https://source.unsplash.com/400x300/?economics', category: 'General' },
    { name: 'Government', emoji: '🏛️', description: 'Structures of government and politics.', details: [
            'Political institutions and constitution',
            'Electoral systems and political parties',
            'Public administration and governance',
            'Citizenship, rights and duties',
            'Comparative government and international relations'
        ], imageUrl: 'https://source.unsplash.com/400x300/?government', category: 'General' },
    { name: 'Geography', emoji: '🌍', description: 'Physical and human geography.', details: [
            'Physical geography: landforms, climate, weather',
            'Geomorphology and drainage systems',
            'Population and settlement patterns',
            'Economic geography: resources and industries',
            'Map work and fieldwork techniques'
        ], imageUrl: 'https://source.unsplash.com/400x300/?geography', category: 'General' },
    { name: 'Agricultural Science', emoji: '🌾', description: 'Farming, crops and agricultural principles.', details: [
            'Soil science and conservation',
            'Crop production and husbandry',
            'Plant propagation and nursery management',
            'Farm tools and machinery',
            'Animal production basics and farm management'
        ], imageUrl: 'https://source.unsplash.com/400x300/?agriculture', category: 'Science' },
    { name: 'Biology', emoji: '🔬', description: 'Life sciences and biological systems.', details: [
            'Cell structure and function',
            'Genetics and inheritance',
            'Human physiology and anatomy',
            'Ecology and ecosystems',
            'Microbiology and disease',
            'Plant biology and classification'
        ], imageUrl: 'https://source.unsplash.com/400x300/?biology', category: 'Science' },
    { name: 'Chemistry', emoji: '⚗️', description: 'Chemistry fundamentals and reactions.', details: [
            'Atomic structure and periodicity',
            'Chemical bonding and states of matter',
            'Stoichiometry and chemical calculations',
            'Acids, bases and salts',
            'Organic chemistry basics and functional groups',
            'Chemical energetics and kinetics'
        ], imageUrl: 'https://source.unsplash.com/400x300/?chemistry', category: 'Science' },
    { name: 'Physics', emoji: '💡', description: 'Physics concepts and problem solving.', details: [
            'Mechanics: motion, forces, energy',
            'Waves, sound and light (optics)',
            'Electricity and magnetism',
            'Thermodynamics and heat',
            'Modern physics: atoms and nuclei',
            'Measurement and experimental methods'
        ], imageUrl: 'https://source.unsplash.com/400x300/?physics', category: 'Science' },
    { name: 'Commerce', emoji: '🏪', description: 'Business and trade concepts.', details: [
            'Principles of commerce and trade',
            'Types of business organisations',
            'Trade documents and procedures',
            'Retail and wholesale operations',
            'E-commerce basics and banking'
        ], imageUrl: 'https://source.unsplash.com/400x300/?commerce', category: 'Commercial' },
    { name: 'Financial Accounting', emoji: '📊', description: 'Accounting principles and practice.', details: [
            'Basic bookkeeping and ledgers',
            'Trial balance and financial statements',
            'Depreciation and adjustments',
            'Bank reconciliation and control accounts',
            'Accounting principles and ethics'
        ], imageUrl: 'https://source.unsplash.com/400x300/?accounting', category: 'Commercial' },
    { name: 'Christian Religious Studies (CRS)', emoji: '✝️', description: 'Christian religious education.', details: [
            'Bible studies: Old and New Testament themes',
            'Christian doctrines and ethics',
            'Christian history and missions',
            'Church practices and sacraments'
        ], imageUrl: 'https://source.unsplash.com/400x300/?christianity', category: 'Arts' },
    { name: 'Islamic Religious Studies (IRS)', emoji: '☪️', description: 'Islamic religious education.', details: [
            'Quranic studies and interpretation basics',
            'Hadith and Islamic practice',
            'Islamic beliefs and pillars',
            'Islamic ethics and history'
        ], imageUrl: 'https://source.unsplash.com/400x300/?islam', category: 'Arts' },
    { name: 'Literature in English', emoji: '📖', description: 'Study of English literature.', details: [
            'Prose: novels and short stories',
            'Poetry: forms, analysis and devices',
            'Drama: plays and performance analysis',
            'Literary criticism and context'
        ], imageUrl: 'https://source.unsplash.com/400x300/?literature', category: 'Arts' },
    { name: 'History', emoji: '📜', description: 'Historical events and contexts.', details: [
            'Pre-colonial and colonial history',
            'Nationalist movements and independence',
            'World conflicts and Nigeria’s role',
            'Historical sources and interpretation'
        ], imageUrl: 'https://source.unsplash.com/400x300/?history', category: 'Arts' },
    { name: 'Social Studies', emoji: '👥', description: 'Foundational social science topics.', details: [
            'Community and social institutions',
            'Human rights and social justice',
            'Citizenship education',
            'Basic economics and civics'
        ], imageUrl: 'https://source.unsplash.com/400x300/?social', category: 'General' },
  { name: 'Commerce', emoji: '🏪', description: 'Business and trade concepts.', details: ['Trade', 'Retail'], imageUrl: 'https://source.unsplash.com/400x300/?commerce' },
  { name: 'Financial Accounting', emoji: '📊', description: 'Accounting principles and practice.', details: ['Bookkeeping', 'Financial Statements'], imageUrl: 'https://source.unsplash.com/400x300/?accounting' },
  { name: 'Christian Religious Studies (CRS)', emoji: '✝️', description: 'Christian religious education.', details: ['Bible Studies', 'Christian Ethics'], imageUrl: 'https://source.unsplash.com/400x300/?christianity' },
  { name: 'Islamic Religious Studies (IRS)', emoji: '☪️', description: 'Islamic religious education.', details: ['Quranic Studies', 'Islamic Ethics'], imageUrl: 'https://source.unsplash.com/400x300/?islam' },
  { name: 'Literature in English', emoji: '📖', description: 'Study of English literature.', details: ['Prose', 'Poetry', 'Drama'], imageUrl: 'https://source.unsplash.com/400x300/?literature' },
    { name: 'History', emoji: '�', description: 'Historical events and contexts.', details: ['World History', 'Nigerian History'], imageUrl: 'https://source.unsplash.com/400x300/?history', category: 'Arts' },
    { name: 'Social Studies', emoji: '👥', description: 'Foundational social science topics.', details: ['Society', 'Civic'], imageUrl: 'https://source.unsplash.com/400x300/?social', category: 'General' },

  // Science Subjects (additional)
  { name: 'Further Mathematics', emoji: '📐', description: 'Advanced mathematical topics.', details: ['Advanced Algebra', 'Further Calculus'], imageUrl: 'https://source.unsplash.com/400x300/?mathematics' },
  { name: 'Technical Drawing', emoji: '🖊️', description: 'Drawing techniques for engineering/design.', details: ['Orthographic', 'Isometric'], imageUrl: 'https://source.unsplash.com/400x300/?technical,drawing' },
  { name: 'Health Science', emoji: '🏥', description: 'Health and hygiene education.', details: ['Public Health', 'Anatomy Basics'], imageUrl: 'https://source.unsplash.com/400x300/?health' },
  { name: 'Computer Studies / ICT', emoji: '💻', description: 'Computing and IT skills.', details: ['Basic Programming', 'Office Tools'], imageUrl: 'https://source.unsplash.com/400x300/?computer' },
  { name: 'Fisheries', emoji: '🐟', description: 'Aquaculture and fisheries studies.', details: ['Fish Culture', 'Fisheries Management'], imageUrl: 'https://source.unsplash.com/400x300/?fisheries' },
  { name: 'Animal Husbandry', emoji: '🐄', description: 'Livestock management practices.', details: ['Animal Nutrition', 'Breeding'], imageUrl: 'https://source.unsplash.com/400x300/?livestock' },
  { name: 'Forestry', emoji: '🌲', description: 'Forest resources and management.', details: ['Silviculture', 'Forest Conservation'], imageUrl: 'https://source.unsplash.com/400x300/?forest' },
  { name: 'Building Construction', emoji: '🏗️', description: 'Fundamentals of building and construction.', details: ['Construction Materials', 'Site Work'], imageUrl: 'https://source.unsplash.com/400x300/?construction' },
  { name: 'Woodwork', emoji: '🪚', description: 'Carpentry and woodworking skills.', details: ['Joinery', 'Wood Finishing'], imageUrl: 'https://source.unsplash.com/400x300/?woodwork' },
  { name: 'Metalwork', emoji: '🔧', description: 'Metal fabrication and working.', details: ['Metal Joining', 'Fabrication'], imageUrl: 'https://source.unsplash.com/400x300/?metalwork' },
  { name: 'Applied Electricity', emoji: '⚡', description: 'Basic electrical principles and practice.', details: ['Circuits', 'Wiring'], imageUrl: 'https://source.unsplash.com/400x300/?electricity' },
  { name: 'Auto Mechanics', emoji: '🚗', description: 'Automotive repair and maintenance.', details: ['Engine Basics', 'Maintenance'], imageUrl: 'https://source.unsplash.com/400x300/?automobile' },
  { name: 'Food and Nutrition', emoji: '🍽️', description: 'Nutrition and food science fundamentals.', details: ['Dietary Needs', 'Food Prep'], imageUrl: 'https://source.unsplash.com/400x300/?food' },
  { name: 'Home Management', emoji: '🏠', description: 'Household management and skills.', details: ['Budgeting', 'Household Skills'], imageUrl: 'https://source.unsplash.com/400x300/?home' },
  { name: 'Physical and Health Education', emoji: '🏃', description: 'Physical education and well-being.', details: ['Fitness', 'Sports'], imageUrl: 'https://source.unsplash.com/400x300/?sports' },
  { name: 'General Science', emoji: '🔎', description: 'Foundational science concepts.', details: ['Basic Science Topics'], imageUrl: 'https://source.unsplash.com/400x300/?science' },
    { name: 'Data Processing', emoji: '🗄️', description: 'Data handling and processing skills.', details: ['Spreadsheets', 'Data Entry'], imageUrl: 'https://source.unsplash.com/400x300/?data', category: 'Commercial' },
    { name: 'Further Mathematics', emoji: '📐', description: 'Advanced mathematical topics.', details: [
            'Matrices and determinants',
            'Sequences and series',
            'Advanced calculus and differential equations',
            'Complex numbers and advanced trigonometry'
        ], imageUrl: 'https://source.unsplash.com/400x300/?mathematics' },
    { name: 'Technical Drawing', emoji: '🖊️', description: 'Drawing techniques for engineering/design.', details: [
            'Orthographic projection',
            'Isometric and perspective drawing',
            'Dimensioning and scales',
            'Architectural and mechanical drawing basics'
        ], imageUrl: 'https://source.unsplash.com/400x300/?technical,drawing' },
    { name: 'Health Science', emoji: '🏥', description: 'Health and hygiene education.', details: [
            'Personal and community health',
            'Disease prevention and control',
            'Nutrition and first aid',
            'Public health initiatives'
        ], imageUrl: 'https://source.unsplash.com/400x300/?health' },
    { name: 'Computer Studies / ICT', emoji: '💻', description: 'Computing and IT skills.', details: [
            'Computer fundamentals and hardware',
            'Introduction to programming and algorithms',
            'Word processing, spreadsheets, presentations',
            'Internet and networking basics'
        ], imageUrl: 'https://source.unsplash.com/400x300/?computer' },
    { name: 'Fisheries', emoji: '🐟', description: 'Aquaculture and fisheries studies.', details: [
            'Principles of aquaculture',
            'Fish biology and breeding',
            'Fish health and pond management',
            'Marketing and processing of fish products'
        ], imageUrl: 'https://source.unsplash.com/400x300/?fisheries' },
    { name: 'Animal Husbandry', emoji: '🐄', description: 'Livestock management practices.', details: [
            'Animal breeding and genetics',
            'Animal nutrition and feeding',
            'Livestock disease control',
            'Housing and welfare'
        ], imageUrl: 'https://source.unsplash.com/400x300/?livestock' },
    { name: 'Forestry', emoji: '🌲', description: 'Forest resources and management.', details: [
            'Forest ecology and conservation',
            'Forest management techniques',
            'Silviculture and reforestation',
            'Forest products and utilization'
        ], imageUrl: 'https://source.unsplash.com/400x300/?forest' },
    { name: 'Building Construction', emoji: '🏗️', description: 'Fundamentals of building and construction.', details: [
            'Construction materials and properties',
            'Site preparation and foundation works',
            'Estimating and costing',
            'Structural basics and safety'
        ], imageUrl: 'https://source.unsplash.com/400x300/?construction' },
    { name: 'Woodwork', emoji: '🪚', description: 'Carpentry and woodworking skills.', details: [
            'Timber properties and seasoning',
            'Joinery and carpentry techniques',
            'Wood finishing and maintenance',
            'Tool use and workshop safety'
        ], imageUrl: 'https://source.unsplash.com/400x300/?woodwork' },
    { name: 'Metalwork', emoji: '🔧', description: 'Metal fabrication and working.', details: [
            'Metal properties and tools',
            'Fabrication and soldering',
            'Sheet metal work and forming',
            'Workshop safety and measurements'
        ], imageUrl: 'https://source.unsplash.com/400x300/?metalwork' },
    { name: 'Applied Electricity', emoji: '⚡', description: 'Basic electrical principles and practice.', details: [
            'Basic circuit theory',
            'Domestic wiring and safety',
            'Electromagnetism fundamentals',
            'Practical wiring tasks and testing'
        ], imageUrl: 'https://source.unsplash.com/400x300/?electricity' },
    { name: 'Auto Mechanics', emoji: '🚗', description: 'Automotive repair and maintenance.', details: [
            'Engine systems and components',
            'Maintenance and servicing',
            'Ignition and fueling systems',
            'Basic diagnostics and repairs'
        ], imageUrl: 'https://source.unsplash.com/400x300/?automobile' },
    { name: 'Food and Nutrition', emoji: '🍽️', description: 'Nutrition and food science fundamentals.', details: [
            'Nutrition principles and dietary needs',
            'Food preservation and hygiene',
            'Meal planning and catering basics',
            'Food safety and quality control'
        ], imageUrl: 'https://source.unsplash.com/400x300/?food' },
    { name: 'Home Management', emoji: '🏠', description: 'Household management and skills.', details: [
            'Household budgeting and resource management',
            'Family health and child care',
            'Home sanitation and maintenance',
            'Consumer education and small enterprises'
        ], imageUrl: 'https://source.unsplash.com/400x300/?home' },
    { name: 'Physical and Health Education', emoji: '🏃', description: 'Physical education and well-being.', details: [
            'Physical fitness and training',
            'Sports rules and skills',
            'Health education and first aid',
            'Recreational activities and team sports'
        ], imageUrl: 'https://source.unsplash.com/400x300/?sports' },
    { name: 'General Science', emoji: '🔎', description: 'Foundational science concepts.', details: [
            'Basic scientific method and experiments',
            'Introduction to biology, chemistry and physics',
            'Health and environment basics',
            'Everyday applications of science'
        ], imageUrl: 'https://source.unsplash.com/400x300/?science' },
    { name: 'Data Processing', emoji: '🗄️', description: 'Data handling and processing skills.', details: [
            'Data entry and validation',
            'Spreadsheets and basic analysis',
            'Simple database concepts',
            'Reporting and presentation'
        ], imageUrl: 'https://source.unsplash.com/400x300/?data' },

  // Commercial / Business Subjects
  { name: 'Business Management', emoji: '📈', description: 'Managing businesses and organizations.', details: ['Management', 'Organization'], imageUrl: 'https://source.unsplash.com/400x300/?business' },
  { name: 'Office Practice', emoji: '🗃️', description: 'Office procedures and administration.', details: ['Filing', 'Clerical Skills'], imageUrl: 'https://source.unsplash.com/400x300/?office' },
  { name: 'Insurance', emoji: '🛡️', description: 'Principles of insurance and risk management.', details: ['Insurance Basics'], imageUrl: 'https://source.unsplash.com/400x300/?insurance' },
  { name: 'Store Management', emoji: '🏷️', description: 'Managing retail operations and inventory.', details: ['Inventory', 'Sales'], imageUrl: 'https://source.unsplash.com/400x300/?store' },
  { name: 'Marketing', emoji: '📣', description: 'Marketing principles and practice.', details: ['Market Research', 'Promotion'], imageUrl: 'https://source.unsplash.com/400x300/?marketing' },
  { name: 'Typewriting / Keyboarding', emoji: '⌨️', description: 'Typing skills and keyboarding.', details: ['Speed', 'Accuracy'], imageUrl: 'https://source.unsplash.com/400x300/?typing' },
  { name: 'Bookkeeping', emoji: '🧾', description: 'Record keeping for businesses.', details: ['Ledger', 'Entries'], imageUrl: 'https://source.unsplash.com/400x300/?bookkeeping' },
  { name: 'Entrepreneurship Studies', emoji: '🚀', description: 'Starting and running businesses.', details: ['Startup Basics', 'Business Plan'], imageUrl: 'https://source.unsplash.com/400x300/?entrepreneur' },
    { name: 'Business Management', emoji: '📈', description: 'Managing businesses and organizations.', details: ['Management', 'Organization'], imageUrl: 'https://source.unsplash.com/400x300/?business', category: 'Commercial' },
    { name: 'Office Practice', emoji: '🗃️', description: 'Office procedures and administration.', details: ['Filing', 'Clerical Skills'], imageUrl: 'https://source.unsplash.com/400x300/?office', category: 'Commercial' },
    { name: 'Insurance', emoji: '🛡️', description: 'Principles of insurance and risk management.', details: ['Insurance Basics'], imageUrl: 'https://source.unsplash.com/400x300/?insurance', category: 'Commercial' },
    { name: 'Store Management', emoji: '🏷️', description: 'Managing retail operations and inventory.', details: ['Inventory', 'Sales'], imageUrl: 'https://source.unsplash.com/400x300/?store', category: 'Commercial' },
    { name: 'Marketing', emoji: '📣', description: 'Marketing principles and practice.', details: ['Market Research', 'Promotion'], imageUrl: 'https://source.unsplash.com/400x300/?marketing', category: 'Commercial' },
    { name: 'Typewriting / Keyboarding', emoji: '⌨️', description: 'Typing skills and keyboarding.', details: ['Speed', 'Accuracy'], imageUrl: 'https://source.unsplash.com/400x300/?typing', category: 'Commercial' },
    { name: 'Bookkeeping', emoji: '🧾', description: 'Record keeping for businesses.', details: ['Ledger', 'Entries'], imageUrl: 'https://source.unsplash.com/400x300/?bookkeeping', category: 'Commercial' },
    { name: 'Entrepreneurship Studies', emoji: '🚀', description: 'Starting and running businesses.', details: ['Startup Basics', 'Business Plan'], imageUrl: 'https://source.unsplash.com/400x300/?entrepreneur', category: 'Commercial' },

  // Arts / Humanities
  { name: 'Visual Art / Fine Art', emoji: '🎨', description: 'Art theory and practical art skills.', details: ['Drawing', 'Painting'], imageUrl: 'https://source.unsplash.com/400x300/?art' },
  { name: 'Music', emoji: '🎵', description: 'Music theory and practice.', details: ['Instruments', 'Theory'], imageUrl: 'https://source.unsplash.com/400x300/?music' },
  { name: 'French', emoji: '🇫🇷', description: 'French language study.', details: ['Grammar', 'Conversation'], imageUrl: 'https://source.unsplash.com/400x300/?french' },
  { name: 'Arabic', emoji: '🕌', description: 'Arabic language study.', details: ['Reading', 'Grammar'], imageUrl: 'https://source.unsplash.com/400x300/?arabic' },
  { name: 'Yoruba', emoji: '🗣️', description: 'Yoruba language and literature.', details: ['Grammar', 'Literature'], imageUrl: 'https://source.unsplash.com/400x300/?yoruba' },
  { name: 'Hausa', emoji: '🗣️', description: 'Hausa language and literature.', details: ['Grammar', 'Literature'], imageUrl: 'https://source.unsplash.com/400x300/?hausa' },
  { name: 'Igbo', emoji: '�️', description: 'Igbo language and literature.', details: ['Grammar', 'Literature'], imageUrl: 'https://source.unsplash.com/400x300/?igbo' },
  { name: 'Theatre Arts / Dramatic Arts', emoji: '🎭', description: 'Performing arts and drama studies.', details: ['Performance', 'Scriptwriting'], imageUrl: 'https://source.unsplash.com/400x300/?theatre' },
  { name: 'Tourism', emoji: '🏝️', description: 'Tourism industry awareness and skills.', details: ['Tourism Management'], imageUrl: 'https://source.unsplash.com/400x300/?tourism' },
    { name: 'Visual Art / Fine Art', emoji: '🎨', description: 'Art theory and practical art skills.', details: ['Drawing', 'Painting'], imageUrl: 'https://source.unsplash.com/400x300/?art', category: 'Arts' },
    { name: 'Music', emoji: '🎵', description: 'Music theory and practice.', details: ['Instruments', 'Theory'], imageUrl: 'https://source.unsplash.com/400x300/?music', category: 'Arts' },
    { name: 'French', emoji: '🇫🇷', description: 'French language study.', details: ['Grammar', 'Conversation'], imageUrl: 'https://source.unsplash.com/400x300/?french', category: 'Languages' },
    { name: 'Arabic', emoji: '🕌', description: 'Arabic language study.', details: ['Reading', 'Grammar'], imageUrl: 'https://source.unsplash.com/400x300/?arabic', category: 'Languages' },
    { name: 'Yoruba', emoji: '🗣️', description: 'Yoruba language and literature.', details: ['Grammar', 'Literature'], imageUrl: 'https://source.unsplash.com/400x300/?yoruba', category: 'Languages' },
    { name: 'Hausa', emoji: '🗣️', description: 'Hausa language and literature.', details: ['Grammar', 'Literature'], imageUrl: 'https://source.unsplash.com/400x300/?hausa', category: 'Languages' },
    { name: 'Igbo', emoji: '�️', description: 'Igbo language and literature.', details: ['Grammar', 'Literature'], imageUrl: 'https://source.unsplash.com/400x300/?igbo', category: 'Languages' },
    { name: 'Theatre Arts / Dramatic Arts', emoji: '🎭', description: 'Performing arts and drama studies.', details: ['Performance', 'Scriptwriting'], imageUrl: 'https://source.unsplash.com/400x300/?theatre', category: 'Arts' },
    { name: 'Tourism', emoji: '🏝️', description: 'Tourism industry awareness and skills.', details: ['Tourism Management'], imageUrl: 'https://source.unsplash.com/400x300/?tourism', category: 'Commercial' },

  // Vocational & Technical Subjects
  { name: 'Welding and Fabrication', emoji: '⚙️', description: 'Metal joining and fabrication skills.', details: ['Welding Basics'], imageUrl: 'https://source.unsplash.com/400x300/?welding' },
  { name: 'Garment Making', emoji: '🧵', description: 'Clothing construction and tailoring.', details: ['Pattern Cutting', 'Sewing'], imageUrl: 'https://source.unsplash.com/400x300/?sewing' },
  { name: 'Catering Craft Practice', emoji: '🍳', description: 'Culinary skills and catering practice.', details: ['Food Prep', 'Service'], imageUrl: 'https://source.unsplash.com/400x300/?catering' },
  { name: 'Dyeing and Bleaching', emoji: '🎨', description: 'Textile dyeing and finishing.', details: ['Dyeing Techniques'], imageUrl: 'https://source.unsplash.com/400x300/?dyeing' },
  { name: 'Leatherwork', emoji: '👜', description: 'Working with leather materials.', details: ['Leather Crafting'], imageUrl: 'https://source.unsplash.com/400x300/?leather' },
  { name: 'Plumbing and Pipe Fitting', emoji: '🚿', description: 'Plumbing systems and fittings.', details: ['Pipework', 'Fittings'], imageUrl: 'https://source.unsplash.com/400x300/?plumbing' },
  { name: 'Printing Craft Practice', emoji: '🖨️', description: 'Printing and graphic reproduction.', details: ['Printing Techniques'], imageUrl: 'https://source.unsplash.com/400x300/?printing' },
  { name: 'Cosmetology', emoji: '💄', description: 'Beauty therapy and cosmetology skills.', details: ['Makeup', 'Hair Care'], imageUrl: 'https://source.unsplash.com/400x300/?cosmetology' },
  { name: 'Painting and Decorating', emoji: '�️', description: 'Decorative painting skills.', details: ['Decorating Techniques'], imageUrl: 'https://source.unsplash.com/400x300/?painting' },
  { name: 'Block Laying, Bricklaying & Concreting', emoji: '🧱', description: 'Masonry and concrete work.', details: ['Bricklaying'], imageUrl: 'https://source.unsplash.com/400x300/?masonry' },
    { name: 'Welding and Fabrication', emoji: '⚙️', description: 'Metal joining and fabrication skills.', details: ['Welding Basics'], imageUrl: 'https://source.unsplash.com/400x300/?welding', category: 'Vocational' },
    { name: 'Garment Making', emoji: '🧵', description: 'Clothing construction and tailoring.', details: ['Pattern Cutting', 'Sewing'], imageUrl: 'https://source.unsplash.com/400x300/?sewing', category: 'Vocational' },
    { name: 'Catering Craft Practice', emoji: '🍳', description: 'Culinary skills and catering practice.', details: ['Food Prep', 'Service'], imageUrl: 'https://source.unsplash.com/400x300/?catering', category: 'Vocational' },
    { name: 'Dyeing and Bleaching', emoji: '🎨', description: 'Textile dyeing and finishing.', details: ['Dyeing Techniques'], imageUrl: 'https://source.unsplash.com/400x300/?dyeing', category: 'Vocational' },
    { name: 'Leatherwork', emoji: '👜', description: 'Working with leather materials.', details: ['Leather Crafting'], imageUrl: 'https://source.unsplash.com/400x300/?leather', category: 'Vocational' },
    { name: 'Plumbing and Pipe Fitting', emoji: '🚿', description: 'Plumbing systems and fittings.', details: ['Pipework', 'Fittings'], imageUrl: 'https://source.unsplash.com/400x300/?plumbing', category: 'Vocational' },
    { name: 'Printing Craft Practice', emoji: '🖨️', description: 'Printing and graphic reproduction.', details: ['Printing Techniques'], imageUrl: 'https://source.unsplash.com/400x300/?printing', category: 'Vocational' },
    { name: 'Cosmetology', emoji: '💄', description: 'Beauty therapy and cosmetology skills.', details: ['Makeup', 'Hair Care'], imageUrl: 'https://source.unsplash.com/400x300/?cosmetology', category: 'Vocational' },
    { name: 'Painting and Decorating', emoji: '�️', description: 'Decorative painting skills.', details: ['Decorating Techniques'], imageUrl: 'https://source.unsplash.com/400x300/?painting', category: 'Vocational' },
    { name: 'Block Laying, Bricklaying & Concreting', emoji: '🧱', description: 'Masonry and concrete work.', details: ['Bricklaying'], imageUrl: 'https://source.unsplash.com/400x300/?masonry', category: 'Vocational' },

  // Language & Communication (additional regional languages)
  { name: 'Efik / Ibibio', emoji: '🗣️', description: 'Efik / Ibibio language study (regional).', details: ['Grammar', 'Conversation'], imageUrl: 'https://source.unsplash.com/400x300/?efik' },
  { name: 'Tiv', emoji: '🗣️', description: 'Tiv language study (regional).', details: ['Grammar', 'Conversation'], imageUrl: 'https://source.unsplash.com/400x300/?tiv' },
  { name: 'Sign Language', emoji: '🤟', description: 'Sign language basics (NECO pilot).', details: ['Basic Signs'], imageUrl: 'https://source.unsplash.com/400x300/?sign-language' },
    { name: 'Efik / Ibibio', emoji: '🗣️', description: 'Efik / Ibibio language study (regional).', details: ['Grammar', 'Conversation'], imageUrl: 'https://source.unsplash.com/400x300/?efik', category: 'Languages' },
    { name: 'Tiv', emoji: '🗣️', description: 'Tiv language study (regional).', details: ['Grammar', 'Conversation'], imageUrl: 'https://source.unsplash.com/400x300/?tiv', category: 'Languages' },
    { name: 'Sign Language', emoji: '🤟', description: 'Sign language basics (NECO pilot).', details: ['Basic Signs'], imageUrl: 'https://source.unsplash.com/400x300/?sign-language', category: 'Languages' },

  // JAMB-related / common subject combinations (additions)
  { name: 'Computer Science', emoji: '🖥️', description: 'Computing and algorithms.', details: ['Programming', 'Systems'], imageUrl: 'https://source.unsplash.com/400x300/?computer-science' },
  { name: 'Architecture / Technical Drawing', emoji: '🏛️', description: 'Architecture and technical drawing skills.', details: ['Drawing', 'Design'], imageUrl: 'https://source.unsplash.com/400x300/?architecture' },
  { name: 'Mass Communication', emoji: '🎤', description: 'Media and communication studies.', details: ['Journalism', 'Broadcasting'], imageUrl: 'https://source.unsplash.com/400x300/?media' },
  { name: 'Law (preparatory)', emoji: '⚖️', description: 'Foundational legal studies topics.', details: ['Legal Reasoning'], imageUrl: 'https://source.unsplash.com/400x300/?law' },
  { name: 'Accounting', emoji: '🧾', description: 'Accounting principles and practice.', details: ['Financial Accounting'], imageUrl: 'https://source.unsplash.com/400x300/?accounting' },
  { name: 'Agriculture (Advanced)', emoji: '🌿', description: 'Advanced agricultural topics.', details: ['Crop Science', 'Animal Production'], imageUrl: 'https://source.unsplash.com/400x300/?agriculture' },
];

export const LANGUAGES: Language[] = [
    { code: 'en', name: 'English', emoji: '🇬🇧' },
    { code: 'pcm', name: 'Pidgin', emoji: '🇳🇬' },
    { code: 'yo', name: 'Yoruba', emoji: '🇳🇬' },
    { code: 'ha', name: 'Hausa', emoji: '🇳🇬' },
    { code: 'ig', name: 'Igbo', emoji: '🇳🇬' },
];

export const BADGES: Omit<Badge, 'dateEarned'>[] = [
    { name: "First Steps", emoji: "👣", description: "Started your first lesson." },
    { name: "Curious Mind", emoji: "🤔", description: "Asked your first question." },
    { name: "Quiz Whiz", emoji: "🏆", description: "Completed your first quiz." },
    { name: "Perfect Score", emoji: "🎯", description: "Scored 100% on a quiz." },
    { name: "Subject Starter", emoji: "🌱", description: "Started a new subject." },
    { name: "Brainiac", emoji: "🧠", description: "Completed quizzes in 3 different subjects." },
    { name: "Tutor's Pet", emoji: "🍎", description: "Had a long conversation with the AI Tutor." },
];

export const CRITICAL_THINKING_GAMES: GameType[] = [
    {
        id: 'logic-puzzles',
        title: 'Logic Puzzles',
        description: 'Solve grid-based logic puzzles that challenge your deductive reasoning skills.',
        emoji: '🧩'
    },
    {
        id: 'sudoku',
        title: 'Sudoku',
        description: 'A classic number puzzle that tests your logic and pattern recognition.',
        emoji: '🔢'
    },
    {
        id: 'brain-teasers',
        title: 'Brain Teasers',
        description: 'A series of riddles and short problems to get your mental gears turning.',
        emoji: '💡'
    }
];

export const IQ_TESTS: GameType[] = [
    {
        id: 'pattern-recognition',
        title: 'Pattern Recognition',
        description: 'Identify the next shape or number in a complex sequence. A key component of IQ tests.',
        emoji: '🔄'
    },
    {
        id: 'verbal-reasoning',
        title: 'Verbal Reasoning',
        description: 'Test your ability to understand and reason with word-based problems and analogies.',
        emoji: '🗣️'
    }
];