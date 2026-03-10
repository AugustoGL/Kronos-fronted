import { useEffect, useState } from "react";
import { getScheduleService, type ScheduleResponse } from "../services/scheduleService";

interface UseScheduleReturn {
  schedule: ScheduleResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSchedule = (): UseScheduleReturn => {
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getScheduleService();
        setSchedule(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  return { schedule, loading, error, refetch };
};