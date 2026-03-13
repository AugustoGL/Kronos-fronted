import { fetchWithAuth } from "./fetchWithAuth";

export interface StaffAPI {
  id_user: number;
  id_staff: number;
  dni: number;
  email: string;
  first_name: string;
  last_name: string;
  url_picture: string | null;
  roles: string[];
  hours_teaching: number;
}

// Shape que usa la tabla en el frontend
export interface Staff {
  id_user: number;
  first_name: string;
  last_name: string;
  document: number;
  phone: string;
  email: string;
  rol: string;
  hoursTeaching: number;
}

const mapStaff = (s: StaffAPI): Staff => ({
  id_user: s.id_user,
  first_name: s.first_name,
  last_name: s.last_name,
  document: s.dni,
  phone: "",  // el endpoint no devuelve teléfono, dejamos vacío por ahora
  email: s.email,
  rol: s.roles.join(", "),
  hoursTeaching: s.hours_teaching,
});

export const getStaffService = async (id_school: number): Promise<Staff[]> => {
  const response = await fetchWithAuth(
    `/myschool/pages/staffs?id_school=${id_school}`,
    { method: "GET" }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener el personal");
  }

  const data: StaffAPI[] = await response.json();
  return data.map(mapStaff);
};