import { fetchWithAuth } from "../fetchWithAuth";
import { getIdSchool } from "../../utils/schoolStorage";

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
  const id_school = getIdSchool();
  const response = await fetchWithAuth(
    `/myschool/year/?id_school=${id_school}`,
    { method: "GET" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener los años");
  }
  return response.json();
};

export const createYearService = async (data: CreateYearData): Promise<void> => {
  const id_school = getIdSchool();
  const response = await fetchWithAuth(
    `/myschool/year/?id_school=${id_school}`,
    {
      method: "POST",
      body: JSON.stringify({ ...data, id_school }),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al crear el año");
  }
};

export const deleteYearService = async (year_id: number): Promise<void> => {
  const id_school = getIdSchool();
  const response = await fetchWithAuth(
    `/myschool/year/${year_id}?id_school=${id_school}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al eliminar el año");
  }
};