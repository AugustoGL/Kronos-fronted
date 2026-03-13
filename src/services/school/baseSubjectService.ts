import { fetchWithAuth } from "./fetchWithAuth";
import { getIdSchool } from "../utils/schoolStorage";

export interface CreateBaseSubjectData {
  name: string;
  abbreviation: string;
  description?: string | null;
  color: string;
}

export const createBaseSubjectService = async (
  data: CreateBaseSubjectData
): Promise<void> => {
  const id_school = getIdSchool();
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