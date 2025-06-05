// Type definitions for demo features

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface AnimationConfig {
  duration: number;
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  delay?: number;
}

export interface DemoSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

export interface TimeSeriesData {
  year: number;
  value: number;
  label?: string;
}

export interface ComparisonData {
  category: string;
  before: number;
  after: number;
  improvement: number;
}