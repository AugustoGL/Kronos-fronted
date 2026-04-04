import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  getMyScheduleService,
  getMyStaffService,
  type MyScheduleResponse,
  type ScheduleItem,
  type School,
  type StaffColor,
} from '../../services/user/mySchoolsServices';
import { getMyRoles } from '../../utils/schoolStorage';

export function useMyHours() {
  const [selectedSchool, setSelectedSchool] = useState<string>('todos');
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [availabilityOpened, setAvailabilityOpened] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<MyScheduleResponse>({});
  const [staffColors, setStaffColors] = useState<StaffColor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = useCallback(async () => {
    try {
      const data = await getMyScheduleService();
      setSchedule(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [scheduleData, staffData] = await Promise.all([
          getMyScheduleService(),
          getMyStaffService(),
        ]);
        setSchedule(scheduleData);
        setStaffColors(staffData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const schools: School[] = useMemo(() => {
    let profesorIds: number[] = [];
    try {
      const roles = getMyRoles();
      profesorIds = roles['Profesor'] ?? [];
    } catch (_) {}

    const schoolMap = new Map<number, School>();
    staffColors
      .filter((s) => profesorIds.includes(s.id_school))
      .forEach((s) => {
        if (!schoolMap.has(s.id_school)) {
          schoolMap.set(s.id_school, {
            id_school: s.id_school,
            school: s.school_name,
            abbreviation: s.school_abbreviation,
            image: '',
            color: s.color_school,
          });
        }
      });
    Object.values(schedule).flat().forEach((item: ScheduleItem) => {
      if (item.type === 'class' && item.id_school && !schoolMap.has(item.id_school)) {
        schoolMap.set(item.id_school, {
          id_school: item.id_school,
          school: `Colegio ${item.id_school}`,
          abbreviation: String(item.id_school),
          image: '',
          color: item.color_school ?? '#888',
        });
      }
    });
    return Array.from(schoolMap.values());
  }, [schedule, staffColors]);

  const filteredSchedule = useMemo(() => {
    if (selectedSchool === 'todos') return schedule;
    const id = Number(selectedSchool);
    const result: MyScheduleResponse = {};
    Object.entries(schedule).forEach(([day, items]) => {
      result[day] = items.filter(
        (item) => item.type === 'unavailable' || item.id_school === id
      );
    });
    return result;
  }, [schedule, selectedSchool]);

  const refetchStaff = async () => {
    try {
      const staffData = await getMyStaffService();
      setStaffColors(staffData);
    } catch (_) {}
  };

  return {
    selectedSchool,
    changeSchool: (id: string) => setSelectedSchool(id),
    modalOpened,
    openModal: () => setModalOpened(true),
    closeModal: () => setModalOpened(false),
    availabilityOpened,
    openAvailability: () => setAvailabilityOpened(true),
    closeAvailability: () => setAvailabilityOpened(false),
    schools,
    staffColors,
    schedule: filteredSchedule,
    loading,
    error,
    refetchStaff,
    refetchSchedule: fetchSchedule,
  };
}