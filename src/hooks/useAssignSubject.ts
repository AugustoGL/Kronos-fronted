import { useState } from "react";
import {
  getBaseSubjectsService,
  getCoursesService,
  getProfessorsService,
  getSubjectByIdService,
  createSubjectService,
  updateSubjectService,
  type CreateSubjectData,
  type BaseSubject,
  type Course,
  type Professor,
  type Subject,
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
  loadSubject: (id: number) => Promise<Subject | null>;
  createSubject: (data: CreateSubjectData) => Promise<boolean>;
  updateSubject: (id: number, data: CreateSubjectData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useAssignSubject = (): UseAssignSubjectReturn => {
  const [subjectOptions, setSubjectOptions] = useState<SelectOption[]>([]);
  const [courseOptions, setCourseOptions] = useState<SelectOption[]>([]);
  const [professorOptions, setProfessorOptions] = useState<SelectOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
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
      setSubjectOptions(subjects.map((s: BaseSubject) => ({ value: String(s.id_base_subject), label: s.name })));
      setCourseOptions(courses.map((c: Course) => ({ value: String(c.id_course), label: c.full_name })));
      setProfessorOptions(professors.map((p: Professor) => ({ value: String(p.id_staff), label: p.name_profesor })));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar opciones");
    } finally {
      setLoadingOptions(false);
    }
  };

  const loadSubject = async (id: number): Promise<Subject | null> => {
    try {
      return await getSubjectByIdService(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar la materia");
      return null;
    }
  };

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

  const updateSubject = async (id: number, data: CreateSubjectData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await updateSubjectService(id, data);
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
    loadSubject,
    createSubject,
    updateSubject,
    loading,
    error,
  };
};