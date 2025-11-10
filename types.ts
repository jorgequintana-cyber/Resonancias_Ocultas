
export interface TuningSystem {
  id: string;
  name: string;
  description: string;
  baseFrequency: number;
  scale: {
    name: string;
    ratios: number[];
  };
  chords: {
    name: string;
    intervals: number[];
  }[];
  piece: {
    name: string;
    noteSequence?: { note: number; duration: number }[];
    audioUrl?: string;
  };
}
