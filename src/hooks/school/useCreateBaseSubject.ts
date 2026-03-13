import { useState } from "react";
import { createBaseSubjectService, type CreateBaseSubjectData } from "../../services/school/baseSubjectService";

interface UseCreateBaseSubjectReturn {
  createBaseSubject: (data: CreateBaseSubjectData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useCreateBaseSubject = (): UseCreateBaseSubjectReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBaseSubject = async (data: CreateBaseSubjectData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await createBaseSubjectService(data); 
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createBaseSubject, loading, error };
};