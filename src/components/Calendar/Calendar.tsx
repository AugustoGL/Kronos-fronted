import { Box, Table, ScrollArea, Text, Avatar, Tooltip, Flex } from '@mantine/core';
import type { ScheduleCell } from '../../services/scheduleService';

interface CursoModuloGridProps {
  dia: string;
  cursos: { id_course: number; name_course: string }[];
  modulos?: number;
  data?: ScheduleCell[];
}

export function CursoModuloGrid({
  dia,
  cursos,
  modulos = 11,
  data = [],
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

                    return (
                      <Tooltip
                        key={curso.id_course}
                        disabled={!cell}
                        label={cell ? (
                          <Flex direction="column" style={{ padding: '5px', minWidth: '150px' }}>
                            <Text size="sm" fw={600}>{cell.name_subject}</Text>
                            <Text size="sm">{cell.full_name_user}</Text>
                            <Text size="sm">{cell.name_course} · Módulo {cell.name_module}</Text>
                            <Text size="sm">{cell.start_time.slice(0, 5)} - {cell.end_time.slice(0, 5)}</Text>
                          </Flex>
                        ) : ''}
                        transitionProps={{ transition: 'pop', duration: 300 }}
                        openDelay={300}
                        arrowSize={7}
                        withArrow
                      >
                        <Table.Td
                          style={{
                            height: 40,
                            cursor: cell ? 'pointer' : 'default',
                            minWidth: 100,
                            textAlign: 'center',
                            backgroundColor: color ? `${color}77` : undefined,
                            boxShadow: color ? `inset 0 0 0 3px ${color}99` : undefined,
                            transition: 'background-color 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (color) (e.currentTarget as HTMLElement).style.backgroundColor = `${color}99`;
                          }}
                          onMouseLeave={(e) => {
                            if (color) (e.currentTarget as HTMLElement).style.backgroundColor = `${color}77`;
                          }}
                          className="espacioFinalHover"
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