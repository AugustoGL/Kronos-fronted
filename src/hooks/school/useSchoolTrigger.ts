import { useEffect, useState } from "react";

/**
 * Devuelve un trigger que se incrementa cada vez que cambia el colegio activo.
 * Usarlo como dependencia en useEffect para refetchear automáticamente.
 */
export const useSchoolTrigger = (): number => {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const handler = () => setTrigger((t) => t + 1);
    window.addEventListener("school-changed", handler);
    return () => window.removeEventListener("school-changed", handler);
  }, []);

  return trigger;
};