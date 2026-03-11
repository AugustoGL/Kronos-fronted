const ROLES_KEY = "my_roles";
const ACTIVE_SCHOOL_KEY = "active_school";

export type MyRoles = Record<string, number[]>;

export const setMyRoles = (roles: MyRoles): void => {
  localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  // Al guardar roles, setear el primer colegio directivo como activo por defecto
  const directivoIds = roles['Directivo'] ?? [];
  if (directivoIds.length > 0) {
    setActiveSchool(directivoIds[0]);
  }
};

export const getMyRoles = (): MyRoles => {
  const val = localStorage.getItem(ROLES_KEY);
  if (!val) throw new Error("Roles no disponibles. Iniciá sesión nuevamente.");
  return JSON.parse(val);
};

export const getIdSchoolsByRole = (role: string): number[] => {
  const roles = getMyRoles();
  return roles[role] ?? [];
};

// Colegio actualmente seleccionado
export const setActiveSchool = (id_school: number): void => {
  localStorage.setItem(ACTIVE_SCHOOL_KEY, String(id_school));
};

export const getActiveSchool = (): number | null => {
  const val = localStorage.getItem(ACTIVE_SCHOOL_KEY);
  return val ? Number(val) : null;
};

// getIdSchool ahora devuelve el colegio activo
export const getIdSchool = (): number => {
  const active = getActiveSchool();
  if (active !== null) return active;
  // fallback al primero disponible
  const roles = getMyRoles();
  const allIds = Object.values(roles).flat();
  if (allIds.length === 0) throw new Error("El usuario no tiene escuelas asignadas.");
  return allIds[0];
};

export const clearMyRoles = (): void => {
  localStorage.removeItem(ROLES_KEY);
  localStorage.removeItem(ACTIVE_SCHOOL_KEY);
};