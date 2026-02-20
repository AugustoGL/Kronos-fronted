import { fetchWithAuth } from "./fetchWithAuth";

export interface CreateBaseSubjectData {
  name: string;
  abbreviation: string;
  description?: string | null;
}

export const createBaseSubjectService = async (
  data: CreateBaseSubjectData,
  id_school: number
): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/base-subject/?id_school=${id_school}`,
    {
      method: "POST",
      body: JSON.stringify({ ...data, id_school }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al crear la materia");
  }
};