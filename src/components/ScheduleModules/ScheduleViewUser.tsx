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
  MONDAY: 'Lunes', TUESDAY: 'Martes', WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves', FRIDAY: 'Viernes',
};

const MIN_HEIGHT = 56;
const DIAGONAL_PATTERN = 'repeating-linear-gradient(45deg, rgba(229,53,53,0.15) 0px, rgba(229,53,53,0.15) 4px, transparent 4px, transparent 12px)';

const minutosEntre = (inicio: string, fin: string): number =>
  dayjs(`2000-01-01T${fin}`).diff(dayjs(`2000-01-01T${inicio}`), 'minute');

const groupKey = (item: ScheduleItem) => `${item.id_subject}-${item.id_school}`;

export function ScheduleView({ schedule, schools = [], altoPorMinuto = 5, onAvailabilityDeleted }: ScheduleProps) {
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

  // color/imagen del colegio — fallback a color_school del item si no está en schools
  const getSchool = (item: ScheduleItem) => {
    const found = schools.find((s) => s.id_school === item.id_school);
    return {
      color: found?.color ?? item.color_school ?? '#888',
      image: found?.image ?? '',
      abbreviation: found?.abbreviation ?? item.abbreviation_subject ?? '',
      name: found?.school ?? item.id_school ?? '',
    };
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await deleteAvailabilityService(deleteTarget.id);
    closeDelete();
    setDeleteTarget(null);
    onAvailabilityDeleted?.();
  };

  const renderItem = (
    item: ScheduleItem,
    key: string,
    isFirstUnavailable: boolean,
    isPartialOverlap: boolean,
    avRange: { start: string; end: string } | undefined,
    partialModuleIds: Set<number>,
    moduleRealStart: Map<number, string>,
  ) => {
    const height = minutosEntre(item.start_time, item.end_time) * altoPorMinuto;
    const innerHeight = Math.max(height, MIN_HEIGHT);

    // --- UNAVAILABLE ---
    if (item.type === 'unavailable') {
      return (
        <Table.Tr key={key}>
          <Table.Td style={{
            height, border: 'none', padding: 0, verticalAlign: 'top',
            backgroundColor: '#e5353520',
            boxShadow: 'inset 0 0 0 2px #e53535',
            textAlign: 'center', userSelect: 'none',
          }}>
            {isFirstUnavailable && (
              <div style={{ minHeight: innerHeight, padding: '6px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Text size="xs" c="red" fw={600} style={{ lineHeight: 1.3 }}>Tiempo no disponible</Text>
                <Text size="xs" c="red" style={{ opacity: 0.8 }}>
                  {avRange ? `${avRange.start} - ${avRange.end}` : `${item.start_time} - ${item.end_time}`}
                </Text>
                {item.id_avaibility && (
                  <ActionIcon size="sm" color="red" variant="subtle" mt={4}
                    onClick={() => {
                      setDeleteTarget({
                        id: item.id_avaibility!,
                        label: `el bloqueo del ${DAY_LABELS[item.day] ?? item.day} de ${avRange?.start ?? item.start_time} a ${avRange?.end ?? item.end_time}`,
                      });
                      openDelete();
                    }}
                  >
                    <IconTrash size={13} />
                  </ActionIcon>
                )}
              </div>
            )}
          </Table.Td>
        </Table.Tr>
      );
    }

    // --- OVERLAPPING parcial: solo warning, sin borde inferior ---
    if (item.type === 'overlapping' && isPartialOverlap) {
      const { color } = getSchool(item);
      return (
        <Table.Tr key={key}>
          <Table.Td style={{
            height, border: 'none', padding: 0, verticalAlign: 'middle',
            backgroundColor: `${color}55`,
            backgroundImage: DIAGONAL_PATTERN,
            boxShadow: 'inset 2px 2px 0 #e53535, inset -2px 0 0 #e53535',
            textAlign: 'center', userSelect: 'none',
          }}>
            <Text size="xs" c="red" fw={600} style={{ lineHeight: 1.2 }}>⚠ Solapado</Text>
          </Table.Td>
        </Table.Tr>
      );
    }

    // --- CLASS / OVERLAPPING total ---
    const isOverlapping = item.type === 'overlapping';
    const isPartialClass = item.type === 'class' && item.id_module != null && partialModuleIds.has(item.id_module);
    const gKey = groupKey(item);
    const isActive = activeGroup === gKey;
    const { color: schoolColor, image, abbreviation, name } = getSchool(item);
    const subjectColor = item.color_subject ?? schoolColor;
    const bgColor = isActive ? `${subjectColor}AA` : `${schoolColor}55`;
    const shadowColor = isOverlapping ? '#e53535' : (isActive ? subjectColor : `${schoolColor}AA`);
    const displayStart = isPartialClass && item.id_module != null
      ? (moduleRealStart.get(item.id_module) ?? item.start_time)
      : item.start_time;

    return (
      <Table.Tr key={key}>
        <Table.Td
          onClick={() => setActiveGroup(prev => prev === gKey ? null : gKey)}
          style={{
            height, border: 'none', padding: 0, verticalAlign: 'top', cursor: 'pointer',
            backgroundColor: bgColor,
            backgroundImage: isOverlapping ? DIAGONAL_PATTERN : undefined,
            boxShadow: isPartialClass
              ? `inset 2px 0 0 ${shadowColor}, inset -2px 0 0 ${shadowColor}, inset 0 -2px 0 ${shadowColor}`
              : `inset 0 0 0 2px ${shadowColor}`,
            textAlign: 'center', userSelect: 'none',
            transition: 'background-color 150ms ease, box-shadow 150ms ease',
          }}
        >
          <div style={{ minHeight: innerHeight, padding: '4px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar src={image || null} size={22} radius="xl" color="initials" name={abbreviation} style={{ margin: '0 auto 2px' }} />
            <Text size="xs" fw={600} style={{ color: 'white', lineHeight: 1.2 }}>{item.abbreviation_subject}</Text>
            <Text size="xs" style={{ color: 'white', opacity: 0.85, lineHeight: 1.2 }}>{item.course}</Text>
            <Text size="xs" style={{ color: 'white', opacity: 0.65, lineHeight: 1.2 }}>{displayStart} - {item.end_time}</Text>
            {isOverlapping && <Text size="xs" c="red" fw={600} style={{ lineHeight: 1.2, marginTop: 2 }}>⚠ Solapado</Text>}
          </div>
        </Table.Td>
      </Table.Tr>
    );
  };

  const renderDia = (day: string) => {
    const items = (schedule[day] ?? []).slice().sort((a, b) => a.start_time.localeCompare(b.start_time));

    // Calcular todos los mapas en una sola pasada
    const partialModuleIds = new Set<number>();
    const avaibilityRange = new Map<number, { start: string; end: string }>();
    const moduleRealStart = new Map<number, string>();
    const overlappingModuleIds = new Set<number>();
    const classModuleIds = new Set<number>();

    items.forEach((i) => {
      if (i.type === 'overlapping' && i.id_module != null) {
        overlappingModuleIds.add(i.id_module);
        moduleRealStart.set(i.id_module, i.start_time);
      }
      if (i.type === 'class' && i.id_module != null) classModuleIds.add(i.id_module);
      if (i.id_avaibility != null) {
        const cur = avaibilityRange.get(i.id_avaibility);
        avaibilityRange.set(i.id_avaibility, {
          start: !cur || i.start_time < cur.start ? i.start_time : cur.start,
          end: !cur || i.end_time > cur.end ? i.end_time : cur.end,
        });
      }
    });
    overlappingModuleIds.forEach((id) => { if (classModuleIds.has(id)) partialModuleIds.add(id); });

    const shownAvaibility = new Set<number>();
    const rows: React.ReactNode[] = [];
    let cursor = horaInicioMin;

    items.forEach((item, idx) => {
      if (item.start_time > cursor) {
        const espacio = minutosEntre(cursor, item.start_time);
        rows.push(<Table.Tr key={`gap-${day}-${cursor}`}><Table.Td style={{ height: espacio * altoPorMinuto }} /></Table.Tr>);
      }

      let isFirstUnavailable = false;
      if (item.type === 'unavailable' && item.id_avaibility != null && !shownAvaibility.has(item.id_avaibility)) {
        isFirstUnavailable = true;
        shownAvaibility.add(item.id_avaibility);
      }

      const isPartialOverlap = item.type === 'overlapping' && item.id_module != null && partialModuleIds.has(item.id_module);
      const avRange = item.id_avaibility != null ? avaibilityRange.get(item.id_avaibility) : undefined;

      rows.push(renderItem(item, `${day}-${idx}`, isFirstUnavailable, isPartialOverlap, avRange, partialModuleIds, moduleRealStart));
      cursor = item.end_time;
    });

    if (cursor < horaFinMax) {
      rows.push(<Table.Tr key={`end-${day}`}><Table.Td style={{ height: minutosEntre(cursor, horaFinMax) * altoPorMinuto }} /></Table.Tr>);
    }

    return (
      <Box key={day} style={{ minWidth: 100, flex: 1, marginRight: 8 }}>
        <Table style={{ height: totalMinutos * altoPorMinuto, borderCollapse: 'collapse' }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ textAlign: 'center', userSelect: 'none', border: '1px solid var(--mantine-color-dark-4)' }}>
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
      <DeleteModal opened={deleteOpened} close={closeDelete} msg={deleteTarget?.label} onDelete={handleDeleteConfirm} />
      <ScrollArea>
        <Flex align="start">
          {DAY_ORDER.filter((d) => schedule[d]?.length > 0).map(renderDia)}
        </Flex>
      </ScrollArea>
    </>
  );
}