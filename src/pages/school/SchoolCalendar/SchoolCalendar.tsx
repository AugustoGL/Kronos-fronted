import { Center, Loader, Alert, Switch, Group, Button, Text } from '@mantine/core';
import { IconAlertCircle, IconEdit, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { CursoModuloGrid } from '../../../components/Calendar/Calendar';
import { useSchedule } from '../../../hooks/school/useSchedule';
import { useCourse } from '../../../hooks/school/useCourse';
import EditScheduleCellModal from './Modals/Editschedulecellmodal';
import type { ScheduleCell } from '../../../services/school/scheduleService';

const DAY_LABEL: Record<string, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
};

const ALL_DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

export default function SchoolCalendar() {
  const { schedule, loading: loadingSchedule, error: errorSchedule, refetch } = useSchedule();
  const { courses, loading: loadingCourses, error: errorCourses } = useCourse();

  const [editMode, setEditMode] = useState(false);
  const [activeDays, setActiveDays] = useState<Set<string>>(new Set(ALL_DAYS));
  const [selectedCell, setSelectedCell] = useState<ScheduleCell | null>(null);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);

  const toggleDay = (day: string) => {
    setActiveDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        if (next.size === 1) return prev;
        next.delete(day);
      } else {
        next.add(day);
      }
      return next;
    });
  };

  const handleCellClick = (cell: ScheduleCell) => {
    setSelectedCell(cell);
    openEdit();
  };

  const handleCancel = () => {
    setEditMode(false);
    refetch();
  };

  const handleSave = async (_cell: ScheduleCell, _newSubjectId: number, _newStaffId: number) => {
    // TODO: llamar al endpoint real cuando esté disponible
    refetch();
  };

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

  const cursos = courses.map((c) => ({
    id_course: c.id_course,
    name_course: c.full_name,
  }));

  const dias = ALL_DAYS.filter((day) => schedule[day] && activeDays.has(day));

  return (
    <div className='contenedor-grilla-padre'>

      <EditScheduleCellModal
        opened={editOpened}
        onClose={closeEdit}
        cell={selectedCell}
        onSave={handleSave}
      />

      <Group justify="space-between" mb="md">
        {/* Switch + botones a la derecha */}
        <Group>
          <IconEye size={24} style={{ opacity: editMode ? 0.4 : 1 }} />
          <Switch
          size="md"
            checked={editMode}
            onChange={(e) => setEditMode(e.currentTarget.checked)}
            color="blue"
          />
          <IconEdit size={24} style={{ opacity: editMode ? 1 : 0.4 }} />
          <Text size="md" c={editMode ? 'blue' : 'dimmed'}>
            {editMode ? 'Modo edición' : 'Modo vista'}
          </Text>
          {editMode && (
            <>
              <Button variant="default" onClick={handleCancel}>Cancelar</Button>
              <Button onClick={() => { /* TODO: guardar global */ }}>Guardar</Button>
            </>
          )}
        </Group>

                {/* Filtro de días */}
        <Button.Group>
          {ALL_DAYS.map((day) => (
            <Button
              key={day}
              variant={activeDays.has(day) ? 'filled' : 'default'}
              onClick={() => toggleDay(day)}
            >
              {DAY_LABEL[day].slice(0, 2)}
            </Button>
          ))}
        </Button.Group>
      </Group>

      <div className='contenedor-grilla-hijo'>

      {dias.map((day) => (
        <CursoModuloGrid
          key={day}
          dia={DAY_LABEL[day]}
          cursos={cursos}
          modulos={schedule[day].length_modules}
          data={schedule[day].schedules}
          editMode={editMode}
          onCellClick={handleCellClick}
        />
      ))}
    </div>
    </div>
  );
}