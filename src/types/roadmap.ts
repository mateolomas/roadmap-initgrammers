export interface Resource {
  title: string;
  url: string;
}

export interface Step {
  id: string;
  name: string;
  completed: boolean;
  description?: string;
  resources?: Resource[];
}

export interface RoadmapPhase {
  id: number;
  title: string;
  description: string;
  estimated_time: string;
  completed: boolean;
  steps: Step[];
}