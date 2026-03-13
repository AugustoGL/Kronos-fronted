import { useEffect, useState } from "react";
import { getSubjectsService, type Subject } from "../../services/school/subjectService";
import { getIdSchool } from "../../utils/schoolStorage";
// TODO: reemplazar por el id_school real cuando esté el endpoint de perfil

interface UseSubjectsReturn {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSubjects = (): UseSubjectsReturn => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSubjectsService(getIdSchool());
        setSubjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  return { subjects, loading, error, refetch };
};