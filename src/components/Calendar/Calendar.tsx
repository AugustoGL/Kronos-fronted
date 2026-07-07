import { Box, Table, ScrollArea, Text, Avatar, Tooltip, Flex, Badge } from '@mantine/core';
import type { ScheduleCell } from '../../services/school/scheduleService';

interface CursoModuloGridProps {
  dia: string;
  cursos: { id_course: number; name_course: string }[];
  modulos?: number;
  data?: ScheduleCell[];
  editMode?: boolean;
  onCellClick?: (cell: ScheduleCell) => void;
}

export function CursoModuloGrid({
  dia,
  cursos,
  modulos = 11,
  data = [],
  editMode = false,
  onCellClick,
}: CursoModuloGridProps) {
  const numerosModulo = Array.from({ length: modulos }, (_, i) => i + 1);

  const cellMap = new Map<string, ScheduleCell>();
  for (const cell of data) {
    cellMap.set(`${cell.name_module}-${cell.id_course}`, cell);
  }

  return (
    <div>
      <Text fw={700} style={{ marginBottom: 10 }}>
        {dia.charAt(0).toUpperCase() + dia.slice(1)}
      </Text>
      <Box style={{
        flexGrow: 1,
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: 4,
        position: 'relative',
      }}>
        <ScrollArea
          scrollbars="x"
          style={{ width: '100%', borderRadius: 4 }}
          scrollbarSize={12}
          offsetScrollbars={false}
        >
          <Table withColumnBorders withTableBorder style={{ marginBottom: 12 }}>
            <Table.Thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <Table.Tr style={{ width: 10 }} />
              <Table.Tr>
                <Table.Th style={{
                  textAlign: 'center',
                  minWidth: 80,
                  position: 'sticky',
                  left: -1,
                  userSelect: 'none',
                  backgroundColor: 'var(--mantine-color-body)',
                  zIndex: 11,
                }}>
                  Módulo
                </Table.Th>
                {cursos.map((curso) => (
                  <Table.Th
                    key={curso.id_course}
                    style={{
                      textAlign: 'center',
                      minWidth: 100,
                      userSelect: 'none',
                      backgroundColor: 'var(--mantine-color-body)',
                    }}
                  >
                    {curso.name_course}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {numerosModulo.map((numeroModulo) => (
                <Table.Tr key={numeroModulo}>
                  <Table.Td style={{
                    textAlign: 'center',
                    minWidth: 80,
                    position: 'sticky',
                    left: -1,
                    backgroundColor: 'var(--mantine-color-body)',
                    userSelect: 'none',
                    zIndex: 11,
                  }}>
                    {numeroModulo}
                  </Table.Td>

                  {cursos.map((curso) => {
                    const cell = cellMap.get(`${numeroModulo}-${curso.id_course}`);
                    const color = cell?.color_subject;

                    const tooltipContent = cell ? (
                      <Flex direction="column" gap={4} style={{ padding: '8px 4px', minWidth: 180 }}>
                        <Flex align="center" gap={8}>
                          <Avatar size={32} radius="xl" src={cell.url_picture_user} />
                          <div>
                            <Text size="sm" fw={700} style={{ lineHeight: 1.2 }}>{cell.name_subject}</Text>
                            <Text size="xs" c="dimmed" style={{ lineHeight: 1.2 }}>{cell.full_name_user}</Text>
                          </div>
                        </Flex>
                        <Flex gap={6} wrap="wrap" mt={2}>
                          <Badge size="xs" variant="light" color="blue">{cell.name_course}</Badge>
                          <Badge size="xs" variant="light" color="gray">Módulo {cell.name_module}</Badge>
                          <Badge size="xs" variant="light" color="teal">
                            {cell.start_time.slice(0, 5)} - {cell.end_time.slice(0, 5)}
                          </Badge>
                        </Flex>
                      </Flex>
                    ) : '';

                    return (
                      <Tooltip
                        key={curso.id_course}
                        disabled={!cell || editMode}
                        label={tooltipContent}
                        transitionProps={{ transition: 'pop', duration: 200 }}
                        openDelay={200}
                        arrowSize={8}
                        withArrow
                        color="dark"
                        styles={{
                          tooltip: {
                            border: color ? `1px solid ${color}66` : '1px solid var(--mantine-color-dark-4)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                          }
                        }}
                      >
                        <Table.Td
                          onClick={() => editMode && cell && onCellClick?.(cell)}
                          style={{
                            height: 40,
                            cursor: editMode && cell ? 'pointer' : cell ? 'default' : 'default',
                            minWidth: 100,
                            textAlign: 'center',
                            backgroundColor: color ? `${color}77` : undefined,
                            boxShadow: editMode && color
                              ? `inset 0 0 0 3px ${color}`
                              : color ? `inset 0 0 0 3px ${color}99` : undefined,
                            transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
                            outline: editMode && cell ? `2px dashed ${color ?? 'var(--mantine-color-blue-5)'}44` : undefined,
                          }}
                          onMouseEnter={(e) => {
                            if (color) (e.currentTarget as HTMLElement).style.backgroundColor = `${color}99`;
                          }}
                          onMouseLeave={(e) => {
                            if (color) (e.currentTarget as HTMLElement).style.backgroundColor = `${color}77`;
                          }}
                        >
                          {cell ? (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 8,
                              padding: '2.5px 0',
                              userSelect: 'none',
                            }}>
                              <Avatar size={25} radius="xl" src={cell.url_picture_user} />
                              <Text size="sm" style={{ color: color, fontWeight: 600 }}>
                                {cell.abbreviation_base_subject}
                              </Text>
                            </div>
                          ) : null}
                        </Table.Td>
                      </Tooltip>
                    );
                  })}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
    </div>
  );
}