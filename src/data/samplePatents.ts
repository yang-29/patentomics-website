// Sample patent data for demo purposes
// Replace with actual patent data later

export interface Patent {
  id: string;
  title: string;
  abstract: string;
  applicationNumber: string;
  filingDate: string;
  technologyClass: string;
  assignee: string;
  qualityScore: number;
  writingQuality: number;
  technologyQuality: number;
  acceptanceProbability: number;
  citationCount: number;
  economicValue: number;
  isAIGenerated?: boolean;
  aiConfidence?: number;
  improvedVersion?: {
    abstract: string;
    qualityScore: number;
    writingQuality: number;
    technologyQuality: number;
    improvements: string[];
  };
}

export const samplePatents: Patent[] = [
  {
    id: "1",
    title: "Advanced Search Algorithm with Machine Learning Integration",
    abstract: "A method and system for improving search results using machine learning algorithms that analyze user behavior patterns and contextual signals. The system employs neural networks to predict user intent and dynamically adjusts ranking algorithms based on real-time feedback loops. The invention includes novel feature extraction techniques that capture semantic relationships between queries and documents, enabling more accurate and personalized search experiences.",
    applicationNumber: "US20230123456",
    filingDate: "2023-03-15",
    technologyClass: "G06F",
    assignee: "Tech Giant Corp",
    qualityScore: 89,
    writingQuality: 91,
    technologyQuality: 87,
    acceptanceProbability: 0.92,
    citationCount: 145,
    economicValue: 8900000
  },
  {
    id: "2",
    title: "IoT Sensor Network for Environmental Monitoring",
    abstract: "An Internet of Things (IoT) sensor network system for environmental monitoring comprising a plurality of sensor nodes, a gateway device, and a cloud-based analytics platform. Each sensor node includes temperature, humidity, and air quality sensors. The gateway aggregates data from multiple nodes and transmits it to the cloud platform for analysis and visualization.",
    applicationNumber: "US20230234567",
    filingDate: "2023-02-20",
    technologyClass: "H04L",
    assignee: "Environmental Tech LLC",
    qualityScore: 67,
    writingQuality: 65,
    technologyQuality: 69,
    acceptanceProbability: 0.71,
    citationCount: 42,
    economicValue: 2300000
  },
  {
    id: "3",
    title: "Basic Software Interface System",
    abstract: "A software interface for connecting different applications. The interface allows data transfer between programs. It uses standard protocols for communication. The system includes a user interface for configuration.",
    applicationNumber: "US20230345678",
    filingDate: "2023-01-10",
    technologyClass: "G06F",
    assignee: "Small Software Inc",
    qualityScore: 23,
    writingQuality: 18,
    technologyQuality: 28,
    acceptanceProbability: 0.21,
    citationCount: 3,
    economicValue: 125000,
    improvedVersion: {
      abstract: "A comprehensive software interface system enabling seamless integration between heterogeneous applications through an adaptive middleware architecture. The system employs intelligent protocol negotiation mechanisms to automatically detect and translate between different data formats and communication standards. Key innovations include dynamic schema mapping, real-time data transformation pipelines, and a self-configuring user interface that adapts to specific integration requirements. The interface supports both synchronous and asynchronous communication patterns, ensuring optimal performance across diverse application ecosystems.",
      qualityScore: 71,
      writingQuality: 74,
      technologyQuality: 68,
      improvements: [
        "Added specific technical details about middleware architecture",
        "Clarified the innovation with dynamic schema mapping",
        "Improved technical terminology and precision",
        "Enhanced description of system capabilities",
        "Added performance considerations"
      ]
    }
  },
  {
    id: "4",
    title: "Blockchain-Based Supply Chain Authentication System",
    abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A distributed ledger system for supply chain management that ensures product authenticity through cryptographic verification. The system implements smart contracts for automated compliance checking and uses zero-knowledge proofs for privacy-preserving authentication.",
    applicationNumber: "US20230456789",
    filingDate: "2023-04-01",
    technologyClass: "G06Q",
    assignee: "Blockchain Innovations Corp",
    qualityScore: 78,
    writingQuality: 76,
    technologyQuality: 80,
    acceptanceProbability: 0.83,
    citationCount: 67,
    economicValue: 4500000,
    isAIGenerated: false,
    aiConfidence: 0.12
  },
  {
    id: "5",
    title: "Medical Device Control System Using AI",
    abstract: "An artificial intelligence-powered control system for medical devices that optimizes treatment parameters based on patient-specific data. The system utilizes deep learning models trained on large datasets of patient outcomes to predict optimal device settings. Real-time monitoring and adaptive algorithms ensure continuous optimization of treatment efficacy while maintaining safety protocols. The invention includes novel feature engineering techniques for medical time-series data and interpretable AI modules for clinical decision support.",
    applicationNumber: "US20230567890",
    filingDate: "2023-03-25",
    technologyClass: "A61B",
    assignee: "MedTech Innovations Inc",
    qualityScore: 85,
    writingQuality: 88,
    technologyQuality: 82,
    acceptanceProbability: 0.89,
    citationCount: 98,
    economicValue: 6700000,
    isAIGenerated: true,
    aiConfidence: 0.94
  },
  {
    id: "6",
    title: "Quantum Computing Error Correction Method",
    abstract: "Lorem ipsum dolor sit amet. A novel quantum error correction protocol that achieves fault-tolerant quantum computation with reduced qubit overhead. The method employs topological codes combined with machine learning-based error prediction to minimize decoherence effects.",
    applicationNumber: "US20230678901",
    filingDate: "2023-05-10",
    technologyClass: "G06N",
    assignee: "Quantum Research Lab",
    qualityScore: 93,
    writingQuality: 90,
    technologyQuality: 96,
    acceptanceProbability: 0.95,
    citationCount: 178,
    economicValue: 12000000
  },
  {
    id: "7",
    title: "Automated Agricultural Monitoring Drone System",
    abstract: "A system of autonomous drones for monitoring crops. Drones fly over fields and take pictures. Software analyzes the images to find problems. Farmers get alerts on their phones.",
    applicationNumber: "US20230789012",
    filingDate: "2023-02-05",
    technologyClass: "A01B",
    assignee: "AgTech Solutions",
    qualityScore: 34,
    writingQuality: 29,
    technologyQuality: 39,
    acceptanceProbability: 0.35,
    citationCount: 12,
    economicValue: 450000,
    improvedVersion: {
      abstract: "An autonomous agricultural monitoring system comprising a fleet of coordinated unmanned aerial vehicles (UAVs) equipped with multispectral imaging sensors and edge computing capabilities. The system employs advanced computer vision algorithms and deep learning models to detect crop diseases, pest infestations, and irrigation anomalies with 95% accuracy. Real-time data fusion from multiple drones enables comprehensive field mapping with centimeter-level precision. The platform includes a cloud-based analytics engine that provides predictive insights and automated alert generation through mobile and web interfaces, enabling proactive farm management decisions.",
      qualityScore: 76,
      writingQuality: 79,
      technologyQuality: 73,
      improvements: [
        "Specified technical components (multispectral sensors, edge computing)",
        "Added quantitative performance metrics (95% accuracy)",
        "Detailed the AI/ML capabilities",
        "Clarified system architecture and data flow",
        "Enhanced technical precision and completeness"
      ]
    }
  },
  {
    id: "8",
    title: "Renewable Energy Grid Integration Platform",
    abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. An intelligent platform for integrating renewable energy sources into existing power grids using predictive analytics and real-time load balancing. The system employs reinforcement learning algorithms to optimize energy distribution and storage decisions.",
    applicationNumber: "US20230890123",
    filingDate: "2023-04-20",
    technologyClass: "H02J",
    assignee: "Green Energy Systems",
    qualityScore: 81,
    writingQuality: 83,
    technologyQuality: 79,
    acceptanceProbability: 0.86,
    citationCount: 89,
    economicValue: 7200000
  }
];

// Sample AI detection pairs
export interface AIDetectionExample {
  id: string;
  title: string;
  humanVersion: string;
  aiVersion: string;
  aiModel: string;
  humanConfidence: number;
  aiConfidence: number;
  highlightedPhrases: {
    text: string;
    isAICharacteristic: boolean;
    explanation: string;
  }[];
}

export const aiDetectionExamples: AIDetectionExample[] = [
  {
    id: "1",
    title: "Blockchain Security Patent",
    humanVersion: "A blockchain security system that prevents double-spending attacks through a novel consensus mechanism. The system uses a combination of proof-of-stake and Byzantine fault tolerance to achieve consensus among distributed nodes. Transaction validation occurs through a multi-layer verification process.",
    aiVersion: "A comprehensive blockchain security framework leveraging an innovative hybrid consensus mechanism that seamlessly integrates proof-of-stake protocols with Byzantine fault tolerance algorithms. This cutting-edge system employs sophisticated multi-layered verification processes to ensure transaction integrity while preventing double-spending attacks through advanced cryptographic techniques.",
    aiModel: "GPT-3.5",
    humanConfidence: 0.89,
    aiConfidence: 0.91,
    highlightedPhrases: [
      { text: "comprehensive", isAICharacteristic: true, explanation: "AI often uses broad descriptors" },
      { text: "leveraging", isAICharacteristic: true, explanation: "Common AI business jargon" },
      { text: "cutting-edge", isAICharacteristic: true, explanation: "AI tends to use superlatives" },
      { text: "seamlessly integrates", isAICharacteristic: true, explanation: "AI favors smooth transition phrases" }
    ]
  },
  {
    id: "2",
    title: "Medical Device Patent",
    humanVersion: "A catheter insertion device with tactile feedback for blind placement. The device measures resistance during insertion and provides haptic signals to the operator. Clinical trials showed 85% success rate in first-attempt placements.",
    aiVersion: "An advanced medical catheter insertion system featuring state-of-the-art tactile feedback mechanisms designed to revolutionize blind placement procedures. This innovative device utilizes cutting-edge sensors to precisely measure insertion resistance while delivering real-time haptic feedback to healthcare practitioners, significantly enhancing procedural accuracy and patient safety.",
    aiModel: "GPT-4",
    humanConfidence: 0.92,
    aiConfidence: 0.88,
    highlightedPhrases: [
      { text: "state-of-the-art", isAICharacteristic: true, explanation: "AI overuses trendy descriptors" },
      { text: "revolutionize", isAICharacteristic: true, explanation: "AI tends toward hyperbole" },
      { text: "significantly enhancing", isAICharacteristic: true, explanation: "AI favors impact amplifiers" }
    ]
  },
  {
    id: "3",
    title: "Borderline Case - Partial AI Assistance",
    humanVersion: "A neural network architecture for image classification that reduces training time by 40%. The architecture uses skip connections and batch normalization to improve gradient flow. We tested it on ImageNet with competitive results.",
    aiVersion: "A neural network architecture for image classification that reduces training time by 40%. The innovative design incorporates skip connections and batch normalization techniques to optimize gradient flow throughout the network. Comprehensive testing on the ImageNet dataset demonstrates highly competitive performance metrics.",
    aiModel: "Human with GPT-4 editing",
    humanConfidence: 0.67,
    aiConfidence: 0.71,
    highlightedPhrases: [
      { text: "innovative design", isAICharacteristic: true, explanation: "Added AI flourish" },
      { text: "optimize", isAICharacteristic: true, explanation: "AI prefers 'optimize' over 'improve'" },
      { text: "Comprehensive testing", isAICharacteristic: true, explanation: "AI amplifies simple statements" }
    ]
  }
];

// Technology landscape data
export interface TechnologyArea {
  code: string;
  name: string;
  description: string;
  acceptanceRate: number;
  averageQualityScore: number;
  trendDirection: 'up' | 'down' | 'stable';
  keyTerms: string[];
  patentCount: number;
}

export const technologyAreas: TechnologyArea[] = [
  {
    code: "A",
    name: "Human Necessities",
    description: "Agriculture, foodstuffs, personal articles, health, amusement",
    acceptanceRate: 0.42,
    averageQualityScore: 58,
    trendDirection: 'stable',
    keyTerms: ["medical", "pharmaceutical", "agricultural", "food", "cosmetic"],
    patentCount: 234567
  },
  {
    code: "B",
    name: "Operations and Transport",
    description: "Separating, mixing, shaping, printing, transporting",
    acceptanceRate: 0.38,
    averageQualityScore: 54,
    trendDirection: 'down',
    keyTerms: ["manufacturing", "transport", "packaging", "printing", "vehicles"],
    patentCount: 198234
  },
  {
    code: "C",
    name: "Chemistry and Metallurgy",
    description: "Chemistry, metallurgy, combinatorial technology",
    acceptanceRate: 0.45,
    averageQualityScore: 62,
    trendDirection: 'up',
    keyTerms: ["chemical", "polymer", "pharmaceutical", "metallurgy", "materials"],
    patentCount: 167890
  },
  {
    code: "G",
    name: "Physics",
    description: "Instruments, nucleonics, computing, information storage",
    acceptanceRate: 0.51,
    averageQualityScore: 71,
    trendDirection: 'up',
    keyTerms: ["computing", "software", "electronics", "optics", "measurement"],
    patentCount: 456789
  },
  {
    code: "H",
    name: "Electricity",
    description: "Electric elements, electric communication, electric power",
    acceptanceRate: 0.48,
    averageQualityScore: 68,
    trendDirection: 'stable',
    keyTerms: ["semiconductor", "communication", "circuit", "wireless", "battery"],
    patentCount: 345678
  }
];

// Portfolio data
export interface Portfolio {
  id: string;
  name: string;
  description: string;
  technologyMix: { area: string; percentage: number }[];
  averageQualityScore: number;
  projectedReturns: number;
  risk: number;
  diversificationScore: number;
  topHoldings: { patentId: string; weight: number }[];
}

export const samplePortfolios: Portfolio[] = [
  {
    id: "1",
    name: "High-Tech Growth Portfolio",
    description: "Focus on computing, AI, and semiconductor technologies",
    technologyMix: [
      { area: "G", percentage: 45 },
      { area: "H", percentage: 35 },
      { area: "C", percentage: 20 }
    ],
    averageQualityScore: 76,
    projectedReturns: 6.6,
    risk: 18.5,
    diversificationScore: 0.72,
    topHoldings: [
      { patentId: "1", weight: 0.15 },
      { patentId: "6", weight: 0.12 },
      { patentId: "5", weight: 0.10 }
    ]
  },
  {
    id: "2",
    name: "Biotech Innovation Portfolio",
    description: "Medical devices, pharmaceuticals, and biotech",
    technologyMix: [
      { area: "A", percentage: 60 },
      { area: "C", percentage: 30 },
      { area: "G", percentage: 10 }
    ],
    averageQualityScore: 68,
    projectedReturns: 5.2,
    risk: 22.3,
    diversificationScore: 0.65,
    topHoldings: [
      { patentId: "5", weight: 0.18 },
      { patentId: "2", weight: 0.14 },
      { patentId: "7", weight: 0.09 }
    ]
  },
  {
    id: "3",
    name: "Diversified Technology Portfolio",
    description: "Balanced exposure across all technology sectors",
    technologyMix: [
      { area: "G", percentage: 25 },
      { area: "H", percentage: 20 },
      { area: "C", percentage: 20 },
      { area: "A", percentage: 20 },
      { area: "B", percentage: 15 }
    ],
    averageQualityScore: 71,
    projectedReturns: 5.8,
    risk: 16.2,
    diversificationScore: 0.89,
    topHoldings: [
      { patentId: "1", weight: 0.08 },
      { patentId: "4", weight: 0.08 },
      { patentId: "5", weight: 0.07 },
      { patentId: "8", weight: 0.07 }
    ]
  }
];

// Research metrics
export const researchMetrics = {
  modelPerformance: {
    rSquared: 0.42,
    accuracy: 0.87,
    precision: 0.89,
    recall: 0.85
  },
  economicImpact: {
    abnormalReturns: 6.6,
    sharpeRatio: 1.24,
    alphaGeneration: 0.066
  },
  dataScale: {
    totalPatents: 2345678,
    trainingSize: 1234567,
    timeRange: "2004-2023",
    embeddingDimension: 1536
  },
  aiDetection: {
    gpt35Accuracy: 0.92,
    gpt4Accuracy: 0.88,
    humanBaselineAccuracy: 0.76
  }
};

// Technology landscape data for visualization
export const technologyNodes = [
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    x: 300,
    y: 200,
    size: 45,
    patents: 15234,
    growth: 0.42,
    connections: ['data-analytics', 'nlp', 'computer-vision']
  },
  {
    id: 'data-analytics',
    label: 'Data Analytics',
    x: 500,
    y: 150,
    size: 35,
    patents: 8932,
    growth: 0.28,
    connections: ['ai-ml', 'cloud-computing']
  },
  {
    id: 'nlp',
    label: 'Natural Language Processing',
    x: 250,
    y: 350,
    size: 30,
    patents: 6789,
    growth: 0.65,
    connections: ['ai-ml', 'speech-recognition']
  },
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    x: 450,
    y: 300,
    size: 38,
    patents: 11234,
    growth: 0.38,
    connections: ['ai-ml', 'ar-vr']
  },
  {
    id: 'cloud-computing',
    label: 'Cloud Computing',
    x: 600,
    y: 250,
    size: 40,
    patents: 12567,
    growth: 0.22,
    connections: ['data-analytics', 'edge-computing']
  },
  {
    id: 'edge-computing',
    label: 'Edge Computing',
    x: 700,
    y: 180,
    size: 25,
    patents: 4567,
    growth: 0.82,
    connections: ['cloud-computing', 'iot']
  },
  {
    id: 'iot',
    label: 'Internet of Things',
    x: 650,
    y: 350,
    size: 32,
    patents: 7890,
    growth: 0.35,
    connections: ['edge-computing', 'smart-devices']
  },
  {
    id: 'speech-recognition',
    label: 'Speech Recognition',
    x: 150,
    y: 280,
    size: 28,
    patents: 5678,
    growth: 0.48,
    connections: ['nlp']
  },
  {
    id: 'ar-vr',
    label: 'AR/VR Technologies',
    x: 550,
    y: 380,
    size: 33,
    patents: 8901,
    growth: 0.55,
    connections: ['computer-vision', 'smart-devices']
  },
  {
    id: 'smart-devices',
    label: 'Smart Devices',
    x: 750,
    y: 280,
    size: 30,
    patents: 6543,
    growth: 0.31,
    connections: ['iot', 'ar-vr']
  }
];

// Extended portfolio data with time series
export const portfolioTimeSeries = [
  { date: '2021-01', value: 100, benchmark: 100 },
  { date: '2021-02', value: 102.3, benchmark: 101.1 },
  { date: '2021-03', value: 105.1, benchmark: 102.0 },
  { date: '2021-04', value: 103.8, benchmark: 101.5 },
  { date: '2021-05', value: 107.2, benchmark: 103.2 },
  { date: '2021-06', value: 109.5, benchmark: 104.1 },
  { date: '2021-07', value: 111.8, benchmark: 105.0 },
  { date: '2021-08', value: 110.2, benchmark: 104.5 },
  { date: '2021-09', value: 113.6, benchmark: 106.2 },
  { date: '2021-10', value: 116.9, benchmark: 107.8 },
  { date: '2021-11', value: 115.4, benchmark: 107.0 },
  { date: '2021-12', value: 118.7, benchmark: 108.9 },
  { date: '2022-01', value: 117.2, benchmark: 107.5 },
  { date: '2022-02', value: 119.8, benchmark: 108.8 },
  { date: '2022-03', value: 122.5, benchmark: 110.2 },
  { date: '2022-04', value: 121.0, benchmark: 109.5 },
  { date: '2022-05', value: 124.3, benchmark: 111.1 },
  { date: '2022-06', value: 126.8, benchmark: 112.5 },
  { date: '2022-07', value: 129.2, benchmark: 114.0 },
  { date: '2022-08', value: 127.6, benchmark: 113.2 },
  { date: '2022-09', value: 131.1, benchmark: 115.5 },
  { date: '2022-10', value: 134.5, benchmark: 117.2 },
  { date: '2022-11', value: 133.0, benchmark: 116.4 },
  { date: '2022-12', value: 136.8, benchmark: 118.3 }
];

// Sector performance data
export const sectorPerformance = [
  { sector: 'Information Technology', avgQuality: 82, patentCount: 45678, growth: 0.35 },
  { sector: 'Healthcare & Biotech', avgQuality: 78, patentCount: 38901, growth: 0.28 },
  { sector: 'Clean Energy', avgQuality: 75, patentCount: 23456, growth: 0.62 },
  { sector: 'Advanced Materials', avgQuality: 71, patentCount: 19876, growth: 0.18 },
  { sector: 'Telecommunications', avgQuality: 69, patentCount: 31234, growth: 0.22 },
  { sector: 'Automotive', avgQuality: 66, patentCount: 27890, growth: 0.15 }
];

// Innovation trends data
export const innovationTrends = [
  { year: 2018, aiGenerated: 2.3, humanWritten: 97.7, totalApplications: 412567 },
  { year: 2019, aiGenerated: 3.8, humanWritten: 96.2, totalApplications: 428901 },
  { year: 2020, aiGenerated: 5.6, humanWritten: 94.4, totalApplications: 445678 },
  { year: 2021, aiGenerated: 8.9, humanWritten: 91.1, totalApplications: 467890 },
  { year: 2022, aiGenerated: 14.2, humanWritten: 85.8, totalApplications: 489012 },
  { year: 2023, aiGenerated: 23.7, humanWritten: 76.3, totalApplications: 512345 },
  { year: 2024, aiGenerated: 31.5, humanWritten: 68.5, totalApplications: 498765 }
];