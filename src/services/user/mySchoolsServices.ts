import { fetchWithAuth } from "../fetchWithAuth";

export interface School {
  id_school: number;
  school: string;
  abbreviation: string;
  image: string;
  color: string;
}

export interface StaffColor {
  id_staff: number;
  id_user: number;
  id_school: number;
  color_school: string;
  school_name: string;
  school_abbreviation: string;
  ids_roles: number[];
}

export interface ScheduleItem {
  type: "class" | "unavailable" | "overlapping" | "full_unavailable";
  id_module: number;
  name: string;
  day: string;
  start_time: string;
  end_time: string;
  id_school?: number;
  color_school?: string;
  id_subject?: number;
  name_subject?: string;
  abbreviation_subject?: string;
  color_subject?: string;
  course?: string;
  id_schedule_version?: number;
  id_avaibility?: number; // Solo para type "unavailable"
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

export const getMyStaffService = async (): Promise<StaffColor[]> => {
  const response = await fetchWithAuth("/me/myschools/staff/all", { method: "GET" });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener los colegios");
  }
  return response.json();
};

export const updateMyStaffColorsService = async (
  data: { id_staff: number; color: string }[]
): Promise<void> => {
  const response = await fetchWithAuth("/me/myschools/staff/all", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al actualizar los colores");
  }
};