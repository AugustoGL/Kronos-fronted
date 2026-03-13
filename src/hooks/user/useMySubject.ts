import { useEffect, useState } from "react";
import { getMySubjectsService, type MySubject } from "../../services/user/mySubjectsService.ts";

interface UseMySubjectsReturn {
  subjects: MySubject[];
  loading: boolean;
  error: string | null;
}

export const useMySubjects = (): UseMySubjectsReturn => {
  const [subjects, setSubjects] = useState<MySubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMySubjectsService();
        setSubjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { subjects, loading, error };
};