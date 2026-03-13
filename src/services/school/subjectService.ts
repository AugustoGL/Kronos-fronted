import { fetchWithAuth } from "../fetchWithAuth";

export interface SubjectAPI {
  id_subject: number;
  name: string;
  abbreviation: string;
  color: string;
  week_hours: number;
  year_course: string;
  name_profesor: string;
}

// Shape que usa la tabla en el frontend
export interface Subject {
  id_subject: number;
  subject: string;
  abbreviation: string;
  color: string;
  hoursWeek: number;
  course: string;
  teacher: string;
}

const mapSubject = (s: SubjectAPI): Subject => ({
  id_subject: s.id_subject,
  subject: s.name,
  abbreviation: s.abbreviation,
  color: s.color,
  hoursWeek: s.week_hours,
  course: s.year_course,
  teacher: s.name_profesor,
});

export const getSubjectsService = async (id_school: number): Promise<Subject[]> => {
  const response = await fetchWithAuth(
    `/myschool/pages/subjects?id_school=${id_school}`,
    { method: "GET" }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener las materias");
  }

  const data: SubjectAPI[] = await response.json();
  return data.map(mapSubject);
};