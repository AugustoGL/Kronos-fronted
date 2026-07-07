import { Box, Text, ScrollArea, Flex, Avatar, ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash, IconInfoCircle } from '@tabler/icons-react';
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
  selectedSchool?: string; // 'todos' o String(id_school)
}

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS: Record<string, string> = {
  MONDAY: 'Lunes', TUESDAY: 'Martes', WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves', FRIDAY: 'Viernes',
};

const DIAGONAL_PATTERN = 'repeating-linear-gradient(45deg, rgba(229,53,53,0.35) 0px, rgba(229,53,53,0.35) 4px, transparent 4px, transparent 12px)';

const minutosEntre = (inicio: string, fin: string): number =>
  dayjs(`2000-01-01T${fin}`).diff(dayjs(`2000-01-01T${inicio}`), 'minute');

const groupKey = (idSubject?: number, idSchool?: number) => `${idSubject}-${idSchool}`;

// --- Bloque de clase ya "fusionado": une los pedazos que el back separa
// en type 'overlapping' + type 'class' para un mismo id_module en un solo bloque real.
interface ClassBlock {
  id_module: number;
  start_time: string;
  end_time: string;
  id_school?: number;
  color_school?: string;
  id_subject?: number;
  name_subject?: string;
  abbreviation_subject?: string;
  color_subject?: string;
  course?: string;
}

interface AvailabilitySegment {
  start_time: string;
  end_time: string;
  hasClass: boolean;
}

interface AvailabilityOverlay {
  id_avaibility: number;
  start_time: string;
  end_time: string;
  segments: AvailabilitySegment[];
  isOverlapping: boolean;
}

export function ScheduleView({
  schedule,
  schools = [],
  altoPorMinuto = 5,
  onAvailabilityDeleted,
  selectedSchool = 'todos',
}: ScheduleProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; label: string } | null>(null);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  // Filtra los items de un día según el colegio seleccionado.
  // Los full_unavailable son globales (no pertenecen a ningún colegio) y
  // siempre se conservan; las clases sí se filtran por id_school.
  const filterBySchool = (items: ScheduleItem[]): ScheduleItem[] => {
    if (selectedSchool === 'todos') return items;
    const idSchool = Number(selectedSchool);
    return items.filter((i) => i.type === 'full_unavailable' || i.id_school === idSchool);
  };

  // Items relevantes para calcular el rango total del día (ignoramos el 'unavailable'
  // parcial: es redundante, el 'full_unavailable' ya trae el rango completo).
  const timeRelevantItems = useMemo(
    () => filterBySchool(Object.values(schedule).flat().filter((i) => i.type !== 'unavailable')),
    [schedule, selectedSchool],
  );

  const { horaInicioMin, horaFinMax, totalMinutos } = useMemo(() => {
    if (timeRelevantItems.length === 0) return { horaInicioMin: '08:00', horaFinMax: '15:00', totalMinutos: 420 };
    const starts = timeRelevantItems.map((m) => m.start_time).sort();
    const ends = timeRelevantItems.map((m) => m.end_time).sort().reverse();
    return { horaInicioMin: starts[0], horaFinMax: ends[0], totalMinutos: minutosEntre(starts[0], ends[0]) };
  }, [timeRelevantItems]);

  const getSchool = (idSchool?: number, fallbackColor?: string, fallbackAbbr?: string) => {
    const found = schools.find((s) => s.id_school === idSchool);
    return {
      color: found?.color ?? fallbackColor ?? '#888',
      image: found?.image ?? '',
      abbreviation: found?.abbreviation ?? fallbackAbbr ?? '',
    };
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await deleteAvailabilityService(deleteTarget.id);
    closeDelete();
    setDeleteTarget(null);
    onAvailabilityDeleted?.();
  };

  // --- CAPA 1: fusiona 'class' + 'overlapping' del mismo id_module en un solo bloque real ---
  const buildClassBlocks = (items: ScheduleItem[]): ClassBlock[] => {
    const groups = new Map<number, ScheduleItem[]>();
    items
      .filter((i) => i.type === 'class' || i.type === 'overlapping')
      .forEach((i) => {
        if (i.id_module == null) return;
        const arr = groups.get(i.id_module) ?? [];
        arr.push(i);
        groups.set(i.id_module, arr);
      });

    return Array.from(groups.entries()).map(([id_module, parts]) => {
      const start_time = parts.reduce((min, p) => (p.start_time < min ? p.start_time : min), parts[0].start_time);
      const end_time = parts.reduce((max, p) => (p.end_time > max ? p.end_time : max), parts[0].end_time);
      const base = parts[0];
      return {
        id_module,
        start_time,
        end_time,
        id_school: base.id_school,
        color_school: base.color_school,
        id_subject: base.id_subject,
        name_subject: base.name_subject,
        abbreviation_subject: base.abbreviation_subject,
        color_subject: base.color_subject,
        course: base.course,
      };
    });
  };

  // --- CAPA 2: por cada full_unavailable, calcula sus segmentos (con o sin clase debajo) ---
  const buildOverlays = (items: ScheduleItem[], classBlocks: ClassBlock[]): AvailabilityOverlay[] => {
    return items
      .filter((i) => i.type === 'full_unavailable' && i.id_avaibility != null)
      .map((av) => {
        const points = new Set<string>([av.start_time, av.end_time]);
        classBlocks.forEach((cb) => {
          if (cb.end_time > av.start_time && cb.start_time < av.end_time) {
            if (cb.start_time > av.start_time) points.add(cb.start_time);
            if (cb.end_time < av.end_time) points.add(cb.end_time);
          }
        });
        const sorted = Array.from(points).sort();
        const segments: AvailabilitySegment[] = [];
        for (let i = 0; i < sorted.length - 1; i++) {
          const segStart = sorted[i];
          const segEnd = sorted[i + 1];
          const hasClass = classBlocks.some((cb) => cb.start_time < segEnd && cb.end_time > segStart);
          segments.push({ start_time: segStart, end_time: segEnd, hasClass });
        }
        return {
          id_avaibility: av.id_avaibility!,
          start_time: av.start_time,
          end_time: av.end_time,
          segments,
          isOverlapping: segments.some((s) => s.hasClass),
        };
      });
  };

  const renderClassBlock = (block: ClassBlock) => {
    const top = minutosEntre(horaInicioMin, block.start_time) * altoPorMinuto;
    const height = minutosEntre(block.start_time, block.end_time) * altoPorMinuto;
    const gKey = groupKey(block.id_subject, block.id_school);
    const isActive = activeGroup === gKey;
    const { color: schoolColor, image, abbreviation } = getSchool(block.id_school, block.color_school, block.abbreviation_subject);
    const subjectColor = block.color_subject ?? schoolColor;
    const bgColor = isActive ? `${subjectColor}AA` : `${schoolColor}55`;
    const shadowColor = isActive ? subjectColor : `${schoolColor}AA`;

    return (
      <div
        key={`class-${block.id_module}`}
        onClick={() => setActiveGroup((prev) => (prev === gKey ? null : gKey))}
        style={{
          position: 'absolute', top, height, left: 0, right: 0, zIndex: 1, cursor: 'pointer',
          backgroundColor: bgColor,
          boxShadow: `inset 0 0 0 2px ${shadowColor}`,
          transition: 'background-color 150ms ease, box-shadow 150ms ease',
        }}
      >
        <div style={{ height: '100%', padding: '4px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Avatar src={image || null} size={22} radius="xl" color="initials" name={abbreviation} style={{ margin: '0 auto 2px' }} />
          <Text size="xs" fw={600} style={{ color: 'white', lineHeight: 1.2 }}>{block.abbreviation_subject}</Text>
          <Text size="xs" style={{ color: 'white', opacity: 0.85, lineHeight: 1.2 }}>{block.course}</Text>
          <Text size="xs" style={{ color: 'white', opacity: 0.65, lineHeight: 1.2 }}>{block.start_time} - {block.end_time}</Text>
        </div>
      </div>
    );
  };

  const renderOverlay = (day: string, overlay: AvailabilityOverlay) => {
    const top = minutosEntre(horaInicioMin, overlay.start_time) * altoPorMinuto;
    const height = minutosEntre(overlay.start_time, overlay.end_time) * altoPorMinuto;

    const openDeleteModal = () => {
      setDeleteTarget({
        id: overlay.id_avaibility,
        label: `el bloqueo del ${DAY_LABELS[day] ?? day} de ${overlay.start_time} a ${overlay.end_time}`,
      });
      openDelete();
    };

    // Info detallada para el tooltip: separa los segmentos "libres" (no disponible puro)
    // de los que se solapan con una clase.
    const soloNoDisponible = overlay.segments.filter((s) => !s.hasClass);
    const solapados = overlay.segments.filter((s) => s.hasClass);

    const tooltipContent = (
      <div style={{ padding: 2 }}>
        <Text size="xs" fw={700} c="white">Tiempo no disponible: {overlay.start_time} - {overlay.end_time}</Text>
        {soloNoDisponible.length > 0 && (
          <div style={{ marginTop: 4 }}>
            <Text size="xs" c="white" style={{ opacity: 0.85 }}>Sin clase:</Text>
            {soloNoDisponible.map((s, i) => (
              <Text key={i} size="xs" c="white" style={{ opacity: 0.85 }}>• {s.start_time} - {s.end_time}</Text>
            ))}
          </div>
        )}
        {solapados.length > 0 && (
          <div style={{ marginTop: 4 }}>
            <Text size="xs" c="red.3" fw={600}>⚠ Solapado con clase:</Text>
            {solapados.map((s, i) => (
              <Text key={i} size="xs" c="red.3">• {s.start_time} - {s.end_time}</Text>
            ))}
          </div>
        )}
      </div>
    );

    return (
      <div
        key={`avail-${overlay.id_avaibility}`}
        style={{
          position: 'absolute', top, height, left: 0, right: 0, zIndex: 2,
          boxShadow: 'inset 0 0 0 2px #e53535', overflow: 'hidden', pointerEvents: 'none',
        }}
      >
        {/* segmentos: sólido (con texto completo) o rejilla (sin texto, ya no tapa info) */}
        {overlay.segments.map((seg, idx) => {
          const segTop = minutosEntre(overlay.start_time, seg.start_time) * altoPorMinuto;
          const segHeight = minutosEntre(seg.start_time, seg.end_time) * altoPorMinuto;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute', top: segTop, height: segHeight, left: 0, right: 0,
                backgroundColor: seg.hasClass ? 'transparent' : '#e5353530',
                backgroundImage: seg.hasClass ? DIAGONAL_PATTERN : undefined,
              }}
            >
              {!seg.hasClass && segHeight >= 30 && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2px' }}>
                  <Text size="xs" c="red" fw={600} style={{ lineHeight: 1.3 }}>Tiempo no disponible</Text>
                  <Text size="xs" c="red" style={{ opacity: 0.8 }}>{seg.start_time} - {seg.end_time}</Text>
                </div>
              )}
            </div>
          );
        })}

        {/* badges tipo "ribbon" en la esquina: info (con tooltip) + borrar */}
        <div style={{
          position: 'absolute', top: 0, right: 0, zIndex: 3, pointerEvents: 'auto',
          display: 'flex', alignItems: 'center', gap: 2,
          backgroundColor: '#e53535', borderRadius: '0 0 0 6px', padding: '2px 4px',
        }}>
          <Tooltip
            label={tooltipContent}
            withArrow
            position="left"
            color="dark"
            multiline
            w={220}
            styles={{
              tooltip: {
                border: '1px solid #e53535',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              },
            }}
          >
            <ActionIcon size="sm" variant="transparent" c="white">
              <IconInfoCircle size={16} />
            </ActionIcon>
          </Tooltip>
          <ActionIcon size="sm" variant="transparent" c="white" onClick={openDeleteModal}>
            <IconTrash size={16} />
          </ActionIcon>
        </div>
      </div>
    );
  };

  const renderDia = (day: string) => {
    const items = filterBySchool(schedule[day] ?? []);
    const classBlocks = buildClassBlocks(items);
    const overlays = buildOverlays(items, classBlocks);
    const dayHeight = totalMinutos * altoPorMinuto;

    return (
      <Box key={day} style={{ minWidth: 100, flex: 1, marginRight: 8 }}>
        <Box style={{ textAlign: 'center', userSelect: 'none', border: '1px solid var(--mantine-color-dark-4)', fontWeight: 600, padding: '4px 0' }}>
          {DAY_LABELS[day] ?? day}
        </Box>
        <div style={{ position: 'relative', height: dayHeight, border: '1px solid var(--mantine-color-dark-4)', borderTop: 'none' }}>
          {classBlocks.map(renderClassBlock)}
          {overlays.map((ov) => renderOverlay(day, ov))}
        </div>
      </Box>
    );
  };

  // Un día "tiene contenido" si, filtrado por colegio, le queda algo para mostrar.
  const diasConContenido = DAY_ORDER.filter((d) => filterBySchool(schedule[d] ?? []).length > 0);

  if (diasConContenido.length === 0) return <Text c="dimmed">No hay horarios disponibles.</Text>;

  return (
    <>
      <DeleteModal opened={deleteOpened} close={closeDelete} msg={deleteTarget?.label} onDelete={handleDeleteConfirm} />
      <ScrollArea>
        <Flex align="start">
          {diasConContenido.map(renderDia)}
        </Flex>
      </ScrollArea>
    </>
  );
}