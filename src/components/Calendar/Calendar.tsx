import { Box, Table, ScrollArea, Text, Avatar, Tooltip, Flex } from '@mantine/core';

interface CursoModuloGridProps {
  dia: string;
  cursos: string[];
  modulos?: number;
}

export function CursoModuloGrid({
  dia,
  cursos,
  modulos = 11
}: CursoModuloGridProps) {

  // Generar array de números de módulo
  const numerosModulo = Array.from({ length: modulos }, (_, i) => i + 1);
  console.log("Putooooo");

  return (
    <div>
      <Text fw={700} style={{ marginBottom: 10 }}>
        {dia.charAt(0).toUpperCase() + dia.slice(1)}
      </Text>
      <Box style={{
        flexGrow: 1,
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: 4,
        position: 'relative'
      }}>
        <ScrollArea
          scrollbars="x"
          style={{ width: '100%', borderRadius: 4 }}
          scrollbarSize={12}
          offsetScrollbars={false}
        >
          <Table withColumnBorders withTableBorder style={{ marginBottom: 12 }}>
            {/* Encabezado principal */}
            <Table.Thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <Table.Tr
                style={{
                  width: 10,     // un nivel más alto que el resto
                }}>
              </Table.Tr>

              {/* Fila de cursos */}
              <Table.Tr>
                <Table.Th
                  style={{
                    textAlign: 'center',
                    minWidth: 80,
                    position: 'sticky',
                    left: -1,
                    userSelect: 'none',
                    backgroundColor: 'var(--mantine-color-body)',
                    zIndex: 11,
                  }}
                >
                  Módulo
                </Table.Th>

                {cursos.map((curso, index) => (
                  <Table.Th
                    key={`${curso}-${index}`}
                    style={{
                      textAlign: 'center',
                      minWidth: 100,
                      userSelect: 'none',
                      backgroundColor: 'var(--mantine-color-body)',
                    }}
                  >
                    {curso}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>

            {/* Cuerpo de la tabla */}
            <Table.Tbody>
              {numerosModulo.map((numeroModulo) => (
                <Table.Tr key={numeroModulo}>
                  {/* Columna de número de módulo */}
                  <Table.Td
                    style={{
                      textAlign: 'center',
                      minWidth: 80,
                      position: 'sticky',
                      left: -1,
                      backgroundColor: 'var(--mantine-color-body)',
                      userSelect: 'none',
                      zIndex: 11,
                    }}
                  >
                    {numeroModulo}
                  </Table.Td>

                  {/* Casilleros para cada curso */}
                  {cursos.map((curso, index) => (

                    <Tooltip
                      label={
                        <Flex
                          direction="column"
                          style={{ padding: '5px', minWidth: "150px" }}>
                          <Text size="sm">Profesor</Text>
                          <Text size="sm"></Text>
                          <Text size="sm">Materia</Text>
                          <Text size="sm">Curso - Modulo</Text>
                        </Flex>
                      }
                      color="blue"
                      transitionProps={{ transition: 'pop', duration: 300 }}
                      openDelay={300}
                      arrowSize={7}
                      withArrow
                    >
                      <Table.Td
                        key={`${numeroModulo}-${curso}-${index}`}
                        style={{
                          height: 40,
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          minWidth: 100,
                          textAlign: 'center',
                          backgroundColor: `#${'aa0088'}55`,
                        }}
                        className="espacioFinalHover"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15, padding: '2.5px 0', color: 'white', userSelect: 'none' }}>
                          <Avatar
                            className='no-drag'
                            size={25}
                            radius="xl"
                            src="https://imgs.search.brave.com/WD6xEN75c5j99NK9l0NdI-H3FfSv2thYZDv6dsQnwDY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3QtbG9n/by1mbGFtZS1zaGFw/ZV8xMDQzLTQ0Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
                          />
                          <Text size='sm' style={{ color: 'white' }}>EFID2</Text>
                        </div>

                      </Table.Td>
                    </Tooltip>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
    </div>
  );
}