import { useEffect, useState } from "react";
import {
  getBaseSubjectsService,
  getCoursesService,
  getProfessorsService,
  createSubjectService,
  type CreateSubjectData,
  type BaseSubject,
  type Course,
  type Professor,
} from "../services/assignSubjectService";

interface SelectOption {
  value: string;
  label: string;
}

interface UseAssignSubjectReturn {
  subjectOptions: SelectOption[];
  courseOptions: SelectOption[];
  professorOptions: SelectOption[];
  loadingOptions: boolean;
  loadOptions: () => Promise<void>;
  createSubject: (data: CreateSubjectData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useAssignSubject = (): UseAssignSubjectReturn => {
  const [subjectOptions, setSubjectOptions] = useState<SelectOption[]>([]);
  const [courseOptions, setCourseOptions] = useState<SelectOption[]>([]);
  const [professorOptions, setProfessorOptions] = useState<SelectOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOptions = async () => {
    setLoadingOptions(true);
    try {
      const [subjects, courses, professors] = await Promise.all([
        getBaseSubjectsService(),
        getCoursesService(),
        getProfessorsService(),
      ]);

      setSubjectOptions(
        subjects.map((s: BaseSubject) => ({
          value: String(s.id_base_subject),
          label: s.name,
        }))
      );
      setCourseOptions(
        courses.map((c: Course) => ({
          value: String(c.id_course),
          label: c.name,
        }))
      );
      setProfessorOptions(
        professors.map((p: Professor) => ({
          value: String(p.id_staff),
          label: p.name_profesor,
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar opciones");
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const createSubject = async (data: CreateSubjectData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await createSubjectService(data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    subjectOptions,
    courseOptions,
    professorOptions,
    loadingOptions,
    loadOptions,
    createSubject,
    loading,
    error,
  };
};