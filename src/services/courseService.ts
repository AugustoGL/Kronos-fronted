import { fetchWithAuth } from "./fetchWithAuth";

const ID_SCHOOL_PLACEHOLDER = 1;

export interface Course {
  id_course: number;
  name: string;
  description: string;
  id_year: number;
}

export interface CourseData {
  name: string;
  description?: string;
  id_year: number;
}

export const getCoursesService = async (): Promise<Course[]> => {
  const response = await fetchWithAuth(
    `/myschool/course/?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    { method: "GET" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener los cursos");
  }
  return response.json();
};

export const createCourseService = async (data: CourseData): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/course/?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al crear el curso");
  }
};

export const updateCourseService = async (course_id: number, data: CourseData): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/course/${course_id}?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al actualizar el curso");
  }
};

export const deleteCourseService = async (course_id: number): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/course/${course_id}?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al eliminar el curso");
  }
};