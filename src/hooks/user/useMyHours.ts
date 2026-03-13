import { useEffect, useState, useMemo } from 'react';
import { getMyScheduleService, type MyScheduleResponse, type ScheduleItem, type School } from '../../services/mySchoolsServices';

export function useMyHours() {
  const [selectedSchool, setSelectedSchool] = useState<string>('todos');
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<MyScheduleResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyScheduleService();
        setSchedule(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Extraer escuelas únicas de los datos del schedule
  const schools: School[] = useMemo(() => {
    const schoolMap = new Map<number, School>();
    Object.values(schedule).flat().forEach((item: ScheduleItem) => {
      if (item.type === 'class' && item.id_school && !schoolMap.has(item.id_school)) {
        schoolMap.set(item.id_school, {
          id_school: item.id_school,
          school: `Colegio ${item.id_school}`, // auxiliar hasta endpoint de nombre
          abbreviation: String(item.id_school),
          image: '',
          color: item.color_school ?? '#888',
        });
      }
    });
    return Array.from(schoolMap.values());
  }, [schedule]);

  // Filtrar el schedule por colegio seleccionado
  const filteredSchedule = useMemo(() => {
    if (selectedSchool === 'todos') return schedule;
    const id = Number(selectedSchool);
    const result: MyScheduleResponse = {};
    Object.entries(schedule).forEach(([day, items]) => {
      result[day] = items.filter(
        (item) => item.type === 'occupied' || item.id_school === id
      );
    });
    return result;
  }, [schedule, selectedSchool]);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);
  const changeSchool = (abbreviation: string) => setSelectedSchool(abbreviation);

  return {
    selectedSchool,
    changeSchool,
    modalOpened,
    openModal,
    closeModal,
    schools,
    schedule: filteredSchedule,
    loading,
    error,
  };
}