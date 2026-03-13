import { Center, Loader, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { CursoModuloGrid } from '../../../components/Calendar/Calendar';
import { useSchedule } from '../../../hooks/school/useSchedule';
import { useCourse } from '../../../hooks/school/useCourse';

const DAY_LABEL: Record<string, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
};

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

export default function SchoolCalendar() {
  const { schedule, loading: loadingSchedule, error: errorSchedule } = useSchedule();
  const { courses, loading: loadingCourses, error: errorCourses } = useCourse();

  if (loadingSchedule || loadingCourses) {
    return <Center h={300}><Loader /></Center>;
  }

  if (errorSchedule || errorCourses) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" m="md">
        {errorSchedule || errorCourses}
      </Alert>
    );
  }

  if (!schedule) return null;

  // Cursos únicos en formato { id_course, name_course } usando el endpoint de cursos
  const cursos = courses.map((c) => ({
    id_course: c.id_course,
    name_course: c.full_name,
  }));

  // Días presentes en la respuesta, ordenados
  const dias = DAY_ORDER.filter((day) => schedule[day]);

  return (
    <div className='contenedor-grilla'>
      {dias.map((day) => (
        <CursoModuloGrid
          key={day}
          dia={DAY_LABEL[day]}
          cursos={cursos}
          modulos={schedule[day].length_modules}
          data={schedule[day].schedules}
        />
      ))}
    </div>
  );
}