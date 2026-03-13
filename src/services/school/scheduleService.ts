import { fetchWithAuth } from "../fetchWithAuth";
import { getIdSchool } from "../../utils/schoolStorage";

export interface ScheduleCell {
  id_schedule: number;
  id_module: number;
  id_staff: number;
  id_subject: number;
  day: string;
  name_module: string;
  start_time: string;
  end_time: string;
  id_course: number;
  name_course: string;
  color_subject: string;
  id_base_subject: number;
  abbreviation_base_subject: string;
  name_subject: string;
  id_user: number;
  full_name_user: string;
  url_picture_user: string | null;
}

export interface ScheduleDay {
  schedules: ScheduleCell[];
  length_modules: number;
}

export type ScheduleResponse = Record<string, ScheduleDay>;

export const getScheduleService = async (): Promise<ScheduleResponse> => {
  const response = await fetchWithAuth(
    `/myschool/pages/schedule?id_school=${getIdSchool()}`,
    { method: "GET" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener el horario");
  }
  return response.json();
};