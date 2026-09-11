export interface TelemetryData {
  speed: number;
  rpm: number;
  gear: number | 'N' | 'R';
  throttle: number;
  brake: number;
  drsActive: boolean;
  ersHarvesting: boolean;
  ersDeploying: boolean;
  gForceLat: number;
  gForceLong: number;
  tireTemps: {
    fl: number;
    fr: number;
    rl: number;
    rr: number;
  };
  lapTime: string;
  lapSeconds: number;
  lapProgress: number;
  trackSection: string;
  sector: 1 | 2 | 3;
  deltaToFastest: string;
  timestamp: number;
}

export interface CareerOverview {
  worldChampionships: number;
  grandPrixEntries: number;
  raceWins: number;
  polePositions: number;
  podiums: number;
  careerPoints: number;
  fastestLaps: number;
  winPercentage: number;
  polePercentage: number;
}

export interface EraInfo {
  id: string;
  name: string;
  team: string;
  years: string;
  primaryColor: string;
  carModel: string;
  engine: string;
  championshipWins: number[];
  description: string;
  highlights: string[];
}

export interface ChampionshipTrophy {
  year: number;
  team: string;
  car: string;
  points: number;
  wins: number;
  poles: number;
  rival: string;
  decidingRace: string;
  quote: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Hoodies' | 'Outerwear' | 'Headwear' | 'Accessories' | 'Collections';
  price: number;
  currency: string;
  tag: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stockCount: number;
  featured: boolean;
  image: string;
}

export interface CartItem {
  product: ProductItem;
  size: string;
  color: string;
  quantity: number;
}

export interface MissionInitiative {
  id: string;
  title: string;
  category: string;
  grantAmount: string;
  impactMetrics: string;
  summary: string;
  partner: string;
}

export interface FanMessage {
  id: string;
  author: string;
  handle: string;
  country: string;
  flag: string;
  message: string;
  timestamp: string;
  likes: number;
}

export interface TeamRadioClip {
  id: string;
  title: string;
  quote: string;
  speaker: string;
  context: string;
  circuit: string;
  year: number;
  audioTone: 'aggressive' | 'celebration' | 'tactical' | 'legendary';
}

export interface TrackZone {
  startPct: number;
  endPct: number;
  name: string;
  sector: 1 | 2 | 3;
  targetSpeed: number;
  gear: number;
  throttle: number;
  brake: number;
  drs: boolean;
  latG: number;
  longG: number;
}

export interface CircuitInfo {
  id: string;
  name: string;
  country: string;
  flag: string;
  lengthKm: number;
  turns: number;
  lapRecord: string;
  recordHolder: string;
  recordYear: number;
  hamiltonWins: number;
  description: string;
  zones: TrackZone[];
  pathD: string;
}

export interface HelmetItem {
  id: string;
  year: number;
  name: string;
  category: 'Championship' | 'Tribute' | 'Special Edition' | 'Ferrari Era';
  team: string;
  baseColor: string;
  visorType: string;
  shellSpec: string;
  accentColors: string[];
  occasion: string;
  backstory: string;
  quote: string;
  features: string[];
  image: string;
  featured: boolean;
}

