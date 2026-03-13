import { useEffect, useState } from "react";
import { getStaffService, type Staff } from "../../services/school/staffService";
import { getIdSchool } from "../../utils/schoolStorage";

// TODO: reemplazar por el id_school real cuando esté el endpoint de perfil

interface UseStaffReturn {
  staff: Staff[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useStaff = (): UseStaffReturn => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStaffService(getIdSchool());
        setStaff(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  return { staff, loading, error, refetch };
};