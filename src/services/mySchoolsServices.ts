import { fetchWithAuth } from "./fetchWithAuth";

export interface School {
  id_school: number;
  school: string;
  abbreviation: string;
  image: string;
  color: string;
}

export interface ScheduleItem {
  type: "class" | "occupied";
  id_module: number;
  name: string;
  day: string;
  start_time: string;
  end_time: string;
  // campos de class
  id_school?: number;
  color_school?: string;
  id_subject?: number;
  name_subject?: string;
  abbreviation_subject?: string;
  color_subject?: string;
  course?: string;
  id_schedule_version?: number;
}

export type MyScheduleResponse = Record<string, ScheduleItem[]>;

export const getMyScheduleService = async (): Promise<MyScheduleResponse> => {
  const response = await fetchWithAuth("/me/myschools/pages/schedule", { method: "GET" });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener el horario");
  }
  return response.json();
};