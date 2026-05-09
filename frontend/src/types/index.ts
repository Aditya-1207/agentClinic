export interface Ailment {
  id: number;
  name: string;
  description: string;
}

export interface Agent {
  id: number;
  name: string;
  model_type: string;
  status: string;
  presenting_complaints: string | null;
  ailments?: Ailment[];
}
