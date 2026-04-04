import { fetchWithAuth } from "../fetchWithAuth";
import { getMyRoles } from "../../utils/schoolStorage";

const getFirstProfesorSchool = (): number => {
  const roles = getMyRoles();
  const ids = roles['Profesor'] ?? [];
  if (ids.length === 0) throw new Error("No tenés colegios asignados como profesor");
  return ids[0];
};

export interface CreateAvailabilityData {
  day: string;
  start_time: string;
  end_time: string;
}

export const createAvailabilityService = async (data: CreateAvailabilityData): Promise<void> => {
  const id_school = getFirstProfesorSchool();
  const response = await fetchWithAuth(`/me/avaibility/?id_school=${id_school}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al crear el bloqueo");
  }
};

export const deleteAvailabilityService = async (id_avaibility: number): Promise<void> => {
  const id_school = getFirstProfesorSchool();
  const response = await fetchWithAuth(`/me/avaibility/${id_avaibility}?id_school=${id_school}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al eliminar el bloqueo");
  }
};