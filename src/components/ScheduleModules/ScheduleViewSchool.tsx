import { Box, Table, Text, ScrollArea, Flex } from '@mantine/core';
import dayjs from 'dayjs';

interface Modulo {
  id: string;
  dia: string;
  horaInicio: string; // "HH:mm"
  horaFin: string;    // "HH:mm"
}

interface ScheduleProps {
  modulos: Modulo[];
  altoPorMinuto?: number;
  onModuleClick?: (id: string) => void;
}

const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

const minutosEntre = (inicio: string, fin: string) => {
  return dayjs(`2000-01-01T${fin}`).diff(dayjs(`2000-01-01T${inicio}`), 'minute');
};


export function ScheduleView({ modulos, altoPorMinuto = 2, onModuleClick }: ScheduleProps) {
  const horasInicio = modulos.map((m) => m.horaInicio);
  const horasFin = modulos.map((m) => m.horaFin);
  const horaInicioMin = horasInicio.sort()[0];
  const horaFinMax = horasFin.sort().reverse()[0];
  const totalMinutos = minutosEntre(horaInicioMin, horaFinMax);

  return (
    <ScrollArea>
      <Flex align="start">
        {/* Una tabla por cada día */}
        {dias.map((dia) => {
          const modulosDia = modulos
            .filter((m) => m.dia === dia)
            .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

          let contenidoFilas: React.ReactNode[] = [];
          let horaCursor = horaInicioMin;

          modulosDia.forEach((modulo) => {
            if (modulo.horaInicio > horaCursor) {
              const espacio = minutosEntre(horaCursor, modulo.horaInicio);
              contenidoFilas.push(
                <Table.Tr key={`espacio-${horaCursor}`}>
                  <Table.Td
                    style={{
                      height: espacio * altoPorMinuto,
                    }}
                  />
                </Table.Tr>
              );
            }

            const duracion = minutosEntre(modulo.horaInicio, modulo.horaFin);
            contenidoFilas.push(
              <Table.Tr key={modulo.id}>
                <Table.Td
                  className="espacioFinalHover"
                  style={{
                    height: duracion * altoPorMinuto,
                    textAlign: 'center',
                    userSelect: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    console.log("Módulo clickeado:", modulo.id);
                    onModuleClick?.(modulo.id);
                  }}
                >
                  <Text size='sm'>
                  1*
                  </Text>
                  <Text size='sm'>
                    {modulo.horaInicio} - {modulo.horaFin}
                  </Text>
                </Table.Td>
              </Table.Tr>
            );

            horaCursor = modulo.horaFin;
          });

          if (horaCursor < horaFinMax) {
            const espacioFinal = minutosEntre(horaCursor, horaFinMax);
            contenidoFilas.push(
              <Table.Tr key={`final-${dia}`}>

                <Table.Td
                  style={{
                    height: espacioFinal * altoPorMinuto,
                  }}
                />
              </Table.Tr>
            );
          }

          return (
            <Box
              key={dia}
              style={{
                minWidth: 75,
                flex: 1,
                marginRight: 8,
              }}
            >
              <Table
                withColumnBorders
                withTableBorder
                style={{ height: totalMinutos * altoPorMinuto }}
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{
                      textAlign: 'center', userSelect: 'none',
                    }}>
                      {dia.charAt(0).toUpperCase() + dia.slice(1)}
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{contenidoFilas}</Table.Tbody>
              </Table>
            </Box>
          );
        })}
      </Flex>
    </ScrollArea>
  );
}
