import { Box, Table, Text, ScrollArea, Flex } from '@mantine/core';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import type { MyScheduleResponse, ScheduleItem } from '../../services/user/mySchoolsServices';

interface ScheduleProps {
  schedule: MyScheduleResponse;
  altoPorMinuto?: number;
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

// Key única para identificar grupo de materia+colegio
const groupKey = (item: ScheduleItem) => `${item.id_subject}-${item.id_school}`;

export function ScheduleView({ schedule, altoPorMinuto = 3 }: ScheduleProps) {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const allItems = useMemo(() => Object.values(schedule).flat(), [schedule]);

  const { horaInicioMin, horaFinMax, totalMinutos } = useMemo(() => {
    if (allItems.length === 0) return { horaInicioMin: '08:00', horaFinMax: '15:00', totalMinutos: 420 };
    const starts = allItems.map((m) => m.start_time).sort();
    const ends = allItems.map((m) => m.end_time).sort().reverse();
    const horaInicioMin = starts[0];
    const horaFinMax = ends[0];
    const totalMinutos = minutosEntre(horaInicioMin, horaFinMax);
    return { horaInicioMin, horaFinMax, totalMinutos };
  }, [allItems]);

  const renderItem = (item: ScheduleItem, key: string) => {
    const duracion = minutosEntre(item.start_time, item.end_time);
    const height = duracion * altoPorMinuto;

    if (item.type === 'unavailable') {
      return (
        <Table.Tr key={key}>
          <Table.Td
            style={{
              height,
              backgroundColor: '#e5353544',
              border: '2px solid #e53535',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            <Text size="xs" c="red" fw={600}>Tiempo ocupado</Text>
            <Text size="xs" c="red">{item.start_time} - {item.end_time}</Text>
          </Table.Td>
        </Table.Tr>
      );
    }

    const gKey = groupKey(item);
    const isHovered = hoveredGroup === gKey;
    const schoolColor = item.color_school ?? '#888';
    const subjectColor = item.color_subject ?? schoolColor;

    // En hover: fondo y borde del color de la materia. Normal: color del colegio
    const bgColor = isHovered ? `${subjectColor}AA` : `${schoolColor}55`;
    const borderColor = isHovered ? subjectColor : `${schoolColor}AA`;

    return (
      <Table.Tr key={key}>
        <Table.Td
onClick={() =>
  setHoveredGroup(prev => (prev === gKey ? null : gKey))
}
          style={{
            height,
            backgroundColor: bgColor,
            border: `2px solid ${borderColor}`,
            textAlign: 'center',
            userSelect: 'none',
            padding: '4px 2px',
            cursor: 'default',
            transition: 'background-color 150ms ease, border-color 150ms ease',
          }}
        >
          <Text size="sm" style={{ color: 'white', padding: '2.5px 0' }}>
            {item.name_subject} - {item.course}
          </Text>
          <Text size="sm" style={{ color: 'white', padding: '2.5px 0' }}>
            {item.start_time} - {item.end_time}
          </Text>
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
        <Table
          withColumnBorders
          withTableBorder
          style={{ height: totalMinutos * altoPorMinuto }}
        >
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

  if (allItems.length === 0) {
    return <Text c="dimmed">No hay horarios disponibles.</Text>;
  }

  return (
    <ScrollArea>
      <Flex align="start">
        {DAY_ORDER.filter((d) => schedule[d]?.length > 0).map(renderDia)}
      </Flex>
    </ScrollArea>
  );
}