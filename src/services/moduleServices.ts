import { fetchWithAuth } from "./fetchWithAuth";

const ID_SCHOOL_PLACEHOLDER = 1;

export interface ModuleAPI {
  id_module: number;
  day: string;
  start_time: string;
  end_time: string;
  id_school: number;
  name: string;
}

export interface Modulo {
  id: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  name: string;
}

const DAY_MAP: Record<string, string> = {
  MONDAY: 'lunes',
  TUESDAY: 'martes',
  WEDNESDAY: 'miércoles',
  THURSDAY: 'jueves',
  FRIDAY: 'viernes',
};

export const DAY_MAP_REVERSE: Record<string, string> = {
  lunes: 'MONDAY',
  martes: 'TUESDAY',
  'miércoles': 'WEDNESDAY',
  jueves: 'THURSDAY',
  viernes: 'FRIDAY',
};

const formatTime = (time: string): string => time.slice(0, 5);

export const mapModule = (m: ModuleAPI): Modulo => ({
  id: String(m.id_module),
  dia: DAY_MAP[m.day] ?? m.day.toLowerCase(),
  horaInicio: formatTime(m.start_time),
  horaFin: formatTime(m.end_time),
  name: `${m.name}`,
});

export const getModulesService = async (): Promise<Modulo[]> => {
  const response = await fetchWithAuth(
    `/myschool/module/?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    { method: "GET" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al obtener los módulos");
  }
  const data: ModuleAPI[] = await response.json();
  return data.map(mapModule);
};

export const createModuleService = async (data: {
  start_time: string;
  end_time: string;
  day: string;
  name?: string;
}): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/module/?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    {
      method: "POST",
      body: JSON.stringify({
        start_time: `${data.start_time}:00`,
        end_time: `${data.end_time}:00`,
        day: DAY_MAP_REVERSE[data.day] ?? data.day.toUpperCase(),
        id_school: ID_SCHOOL_PLACEHOLDER,
        name: data.name ?? `${data.start_time} - ${data.end_time}`,
      }),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al crear el módulo");
  }
};

export const updateModuleService = async (module_id: string, data: {
  start_time: string;
  end_time: string;
  day: string;
  name?: string;
}): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/module/${module_id}?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    {
      method: "PUT",
      body: JSON.stringify({
        start_time: `${data.start_time}:00`,
        end_time: `${data.end_time}:00`,
        day: DAY_MAP_REVERSE[data.day] ?? data.day.toUpperCase(),
        name: data.name,
      }),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al actualizar el módulo");
  }
};

export const deleteModuleService = async (module_id: string): Promise<void> => {
  const response = await fetchWithAuth(
    `/myschool/module/${module_id}?id_school=${ID_SCHOOL_PLACEHOLDER}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al eliminar el módulo");
  }
};