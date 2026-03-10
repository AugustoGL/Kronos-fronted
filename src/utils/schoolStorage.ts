const ROLES_KEY = "my_roles";

export type MyRoles = Record<string, number[]>;

// Guarda el objeto completo de roles
export const setMyRoles = (roles: MyRoles): void => {
  localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
};

// Devuelve el objeto completo de roles
export const getMyRoles = (): MyRoles => {
  const val = localStorage.getItem(ROLES_KEY);
  if (!val) throw new Error("Roles no disponibles. Iniciá sesión nuevamente.");
  return JSON.parse(val);
};

// Devuelve los id_school de un rol específico (ej: "Directivo", "Profesor")
export const getIdSchoolsByRole = (role: string): number[] => {
  const roles = getMyRoles();
  return roles[role] ?? [];
};

// Devuelve el primer id_school disponible en cualquier rol
export const getIdSchool = (): number => {
  const roles = getMyRoles();
  const allIds = Object.values(roles).flat();
  if (allIds.length === 0) throw new Error("El usuario no tiene escuelas asignadas.");
  return allIds[0];
};

// Borra todo al logout
export const clearMyRoles = (): void => {
  localStorage.removeItem(ROLES_KEY);
};