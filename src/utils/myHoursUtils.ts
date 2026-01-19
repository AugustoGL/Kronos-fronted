import { type School } from '../services/mySchoolsServices';

export interface Module {
  id_colegio: number;
  [key: string]: any; // Ajusta si tienes tipos más estrictos
}

/**
 * Obtiene el colegio desde su abreviatura
 */
export function getSchoolByAbbreviation(
  abbreviation: string,
  schools: School[]
): School | undefined {
  return schools.find((school) => school.abbreviation === abbreviation);
}

/**
 * Filtra los módulos según el colegio seleccionado
 */
export function filterModulesBySchool(
  modules: Module[],
  selectedAbbreviation: string,
  schools: School[]
): Module[] {
  if (selectedAbbreviation === 'todos') return modules;

  const selectedSchool = getSchoolByAbbreviation(selectedAbbreviation, schools);

  if (!selectedSchool) return modules;

  return modules.filter((module) => module.id_colegio === selectedSchool.id_school);
}
