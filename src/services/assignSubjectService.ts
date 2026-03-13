import { getIdSchool } from "../utils/schoolStorage";
import { fetchWithAuth } from "./fetchWithAuth";

export interface BaseSubject {
  id_base_subject: number;
  name: string;
  abbreviation: string;
  description: string;
}

export interface Course {
  id_course: number;
  name: string;
  description: string;
  id_year: number;
  full_name: string;
}

export interface Professor {
  id_staff: number;
  name_profesor: string;
}

export interface Subject {
  id_subject: number;
  week_hours: number;
  id_staff: number;
  id_course: number;
  id_base_subject: number;
}

export interface CreateSubjectData {
  week_hours: number;
  id_staff: number | null;
  id_course: number;
  id_base_subject: number;
}

export const getBaseSubjectsService = async (): Promise<BaseSubject[]> => {
  const response = await fetchWithAuth(
    `/myschool/base-subject/?id_school=${getIdSchool()}`,
    { method: "GET" }
  );
  if (!response.ok) throw new Error("Error al obtener las materias base");
  return response.json();
};

export const getCoursesService = async (): Promise<Course[]> => {
  const response = await fetchWithAuth(
    `/myschool/course/?id_school=${getIdSchool()}`,
    { method: "GET" }
  );
  if (!response.ok) throw new Error("Error al obtener los cursos");
  return response.json();
};

export const getProfessorsService = async (): Promise<Professor[]> => {
  const response = await fetchWithAuth(
    `/myschool/staff/profesors?id_school=${getIdSchool()}`,
    { method: "GET" }
  );
  if (!response.ok) throw new Error("Error al obtener los profesores");
  return response.json();
};

export const getSubjectByIdService = async (subject_id: number): Promise<Subject> => {
  const response = await fetchWithAuth(
    `/myschool/subject/${subject_id}?id_school=${getIdSchool()}`,
    { method: "GET" }
  );
  if (!response.ok) throw new Error("Error al obtener la materia");
  return response.json();
};

export const createSubjectService = async (data: CreateSubjectData): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/subject/?id_school=${getIdSchool()}`,
    { method: "POST", body: JSON.stringify(data) }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al crear la materia");
  }
};

export const updateSubjectService = async (subject_id: number, data: CreateSubjectData): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/subject/${subject_id}?id_school=${getIdSchool()}`,
    { method: "PUT", body: JSON.stringify(data) }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al actualizar la materia");
  }
};