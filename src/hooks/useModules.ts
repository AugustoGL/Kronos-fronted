import { useEffect, useState } from "react";
import {
  getModulesService,
  createModuleService,
  updateModuleService,
  deleteModuleService,
  type Modulo,
} from "../services/moduleService";

interface UseModulesReturn {
  modulos: Modulo[];
  loading: boolean;
  error: string | null;
  createModule: (data: { start_time: string; end_time: string; day: string; name?: string }) => Promise<boolean>;
  updateModule: (id: string, data: { start_time: string; end_time: string; day: string; name?: string }) => Promise<boolean>;
  deleteModule: (id: string) => Promise<boolean>;
  refetch: () => void;
}

export const useModules = (): UseModulesReturn => {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getModulesService();
        setModulos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  const createModule = async (data: { start_time: string; end_time: string; day: string; name?: string }): Promise<boolean> => {
    try {
      await createModuleService(data);
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  };

  const updateModule = async (id: string, data: { start_time: string; end_time: string; day: string; name?: string }): Promise<boolean> => {
    try {
      await updateModuleService(id, data);
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  };

  const deleteModule = async (id: string): Promise<boolean> => {
    try {
      await deleteModuleService(id);
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  };

  return { modulos, loading, error, createModule, updateModule, deleteModule, refetch };
};