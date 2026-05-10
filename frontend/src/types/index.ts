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

export interface Therapy {
  id: number;
  name: string;
  description: string;
}

export interface Appointment {
  id: number;
  agent_id: number;
  therapist_name: string;
  datetime: string;
  status: string;
}

export interface DashboardSummary {
  agents: number;
  ailments: number;
  appointments: number;
}
