import { useState, useEffect } from "react";
import {
  getYearsService,
  createYearService,
  deleteYearService,
  type Year,
} from "../services/yearServices";

interface UseYearReturn {
  years: Year[];
  loading: boolean;
  error: string | null;
  createYear: (name: number, description?: string) => Promise<boolean>;
  deleteYear: (year_id: number) => Promise<boolean>;
  refetch: () => void;
}

export const useYear = (): UseYearReturn => {
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getYearsService();
        setYears(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  const createYear = async (name: number, description?: string): Promise<boolean> => {
    try {
      await createYearService({ name, description });
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  };

  const deleteYear = async (year_id: number): Promise<boolean> => {
    try {
      await deleteYearService(year_id);
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  };

  return { years, loading, error, createYear, deleteYear, refetch };
};