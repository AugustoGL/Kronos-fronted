import { fetchWithAuth } from "./fetchWithAuth";

// TODO: reemplazar por el id_school real cuando esté el endpoint de perfil
const ID_SCHOOL_PLACEHOLDER = 1;

export interface Year {
  id_year: number;
  name: number;
  description: string;
  id_school: number;
}

export interface CreateYearData {
  name: number;
  description?: string;
}

export const getYearsService = async (): Promise<Year[]> => {
  const response = await fetchWithAuth(
    `/myschool/year/?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    { method: "GET" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener los años");
  }
  return response.json();
};

export const createYearService = async (data: CreateYearData): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/year/?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    {
      method: "POST",
      body: JSON.stringify({ ...data, id_school: ID_SCHOOL_PLACEHOLDER }),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al crear el año");
  }
};

export const deleteYearService = async (year_id: number): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/year/${year_id}?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al eliminar el año");
  }
};