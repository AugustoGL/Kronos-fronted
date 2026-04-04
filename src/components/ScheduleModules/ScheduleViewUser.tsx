import { Box, Table, Text, ScrollArea, Flex, Avatar, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import type { MyScheduleResponse, ScheduleItem, School } from '../../services/user/mySchoolsServices';
import { deleteAvailabilityService } from '../../services/user/aviabilityServices';
import DeleteModal from '../Modals/DeleteModal';

interface ScheduleProps {
  schedule: MyScheduleResponse;
  schools?: School[];
  altoPorMinuto?: number;
  onAvailabilityDeleted?: () => void;
}

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS: Record<string, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
};

const minutosEntre = (inicio: string, fin: string): number =>
  dayjs(`2000-01-01T${fin}`).diff(dayjs(`2000-01-01T${inicio}`), 'minute');

const groupKey = (item: ScheduleItem) => `${item.id_subject}-${item.id_school}`;

export function ScheduleView({ schedule, schools = [], altoPorMinuto = 3, onAvailabilityDeleted }: ScheduleProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; label: string } | null>(null);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const allItems = useMemo(() => Object.values(schedule).flat(), [schedule]);

  const { horaInicioMin, horaFinMax, totalMinutos } = useMemo(() => {
    if (allItems.length === 0) return { horaInicioMin: '08:00', horaFinMax: '15:00', totalMinutos: 420 };
    const starts = allItems.map((m) => m.start_time).sort();
    const ends = allItems.map((m) => m.end_time).sort().reverse();
    return { horaInicioMin: starts[0], horaFinMax: ends[0], totalMinutos: minutosEntre(starts[0], ends[0]) };
  }, [allItems]);

  const getSchool = (id_school?: number) => schools.find((s) => s.id_school === id_school);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await deleteAvailabilityService(deleteTarget.id);
    closeDelete();
    setDeleteTarget(null);
    onAvailabilityDeleted?.();
  };

  const renderItem = (item: ScheduleItem, key: string) => {
    const duracion = minutosEntre(item.start_time, item.end_time);
    const height = duracion * altoPorMinuto;

    if (item.type === 'unavailable') {
      return (
        <Table.Tr key={key}>
          <Table.Td style={{
            height,
            backgroundColor: '#e5353522',
            border: '2px solid #e53535',
            textAlign: 'center',
            userSelect: 'none',
            padding: '4px 2px',
            position: 'relative',
          }}>
{/*
            <Text size="xs" c="red" fw={600}>Tiempo no disponible</Text>
            <Text size="xs" c="red">{item.start_time} - {item.end_time}</Text>
            {item.id_avaibility && (
              <ActionIcon
                size="lg"
                color="red"
                variant="subtle"
                mt={4}
                onClick={() => {
                  setDeleteTarget({
                    id: item.id_avaibility!,
                    label: `el bloqueo del ${DAY_LABELS[item.day] ?? item.day} de ${item.start_time} a ${item.end_time}`,
                  });
                  openDelete();
                }}
              >
                <IconTrash size={18} />
              </ActionIcon>
            )}
            */}
          </Table.Td>
        </Table.Tr>
      );
    }

    const gKey = groupKey(item);
    const isActive = activeGroup === gKey;
    const school = getSchool(item.id_school);
    const schoolColor = school?.color ?? item.color_school ?? '#888';
const subjectColor = item?.color_subject ?? schoolColor;

const bgColor =
  item?.type === "overlapping"
    ? "#00ff00"
    : isActive
      ? `${subjectColor}AA`
      : `${schoolColor}55`;

const borderColor = isActive ? subjectColor : `${schoolColor}AA`;

    return (
      <Table.Tr key={key}>
        <Table.Td
          onClick={() => setActiveGroup(prev => prev === gKey ? null : gKey)}
          style={{
            height,
            backgroundColor: bgColor,
            border: `2px solid ${borderColor}`,
            textAlign: 'center',
            userSelect: 'none',
            padding: '4px 2px',
            cursor: 'pointer',
            transition: 'background-color 150ms ease, border-color 150ms ease',
          }}
        >{/*
          <Avatar
            src={school?.image || null}
            alt={school?.school}
            size={24}
            radius="xl"
            color="initials"
            name={school?.abbreviation}
            style={{ margin: '0 auto 2px' }}
          />
          <Text size="sm" style={{ color: 'white', padding: '1px 0' }}>
            {item.name_subject}
          </Text>
          <Text size="xs" style={{ color: 'white', opacity: 0.85 }}>
            {item.course}
          </Text>
          <Text size="xs" style={{ color: 'white', opacity: 0.7 }}>
            {item.start_time} - {item.end_time}
          </Text>
          */}
        </Table.Td>
      </Table.Tr>
    );
  };

  const renderDia = (day: string) => {
    const items = (schedule[day] ?? [])
      .slice()
      .sort((a, b) => a.start_time.localeCompare(b.start_time));

    let rows: React.ReactNode[] = [];
    let cursor = horaInicioMin;

    items.forEach((item, idx) => {
      if (item.start_time > cursor) {
        const espacio = minutosEntre(cursor, item.start_time);
        rows.push(
          <Table.Tr key={`gap-${day}-${cursor}`}>
            <Table.Td style={{ height: espacio * altoPorMinuto }} />
          </Table.Tr>
        );
      }
      rows.push(renderItem(item, `${day}-${idx}`));
      cursor = item.end_time;
    });

    if (cursor < horaFinMax) {
      const espacio = minutosEntre(cursor, horaFinMax);
      rows.push(
        <Table.Tr key={`end-${day}`}>
          <Table.Td style={{ height: espacio * altoPorMinuto }} />
        </Table.Tr>
      );
    }

    return (
      <Box key={day} style={{ minWidth: 75, flex: 1, marginRight: 8 }}>
        <Table withColumnBorders withTableBorder style={{ height: totalMinutos * altoPorMinuto }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ textAlign: 'center', userSelect: 'none' }}>
                {DAY_LABELS[day] ?? day}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    );
  };

  if (allItems.length === 0) return <Text c="dimmed">No hay horarios disponibles.</Text>;

  return (
    <>
      <DeleteModal
        opened={deleteOpened}
        close={closeDelete}
        msg={deleteTarget?.label}
        onDelete={handleDeleteConfirm}
      />
      <ScrollArea>
        <Flex align="start">
          {DAY_ORDER.filter((d) => schedule[d]?.length > 0).map(renderDia)}
        </Flex>
      </ScrollArea>
    </>
  );
}