import { fetchWithAuth } from "../fetchWithAuth";

export interface MySubject {
  id_subject: number;
  name: string;
  abbreviation: string;
  color: string;
  week_hours: number;
  year_course: string;
  name_profesor: string;
  id_school: number;
  name_school: string;
}

export const getMySubjectsService = async (): Promise<MySubject[]> => {
  const response = await fetchWithAuth("/me/myschools/pages/subjects", { method: "GET" });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener las materias");
  }
  return response.json();
};