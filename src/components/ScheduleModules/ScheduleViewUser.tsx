import { Box, Table, Text, ScrollArea, Flex, Avatar } from '@mantine/core';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { type Module } from '../../utils/myHoursUtils';
//import BloqueNoDisponible from '../Elementauxiliar'

interface School {
  id_school: number;
  abbreviation: string;
  image: string;
  color: string;
}

interface ScheduleProps {
  modulos: Module[];
  listSchools: School[];
  altoPorMinuto?: number;
}

const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

const minutosEntre = (inicio: string, fin: string): number =>
  dayjs(`2000-01-01T${fin}`).diff(dayjs(`2000-01-01T${inicio}`), 'minute');

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Devuelve el color del colegio dado su ID.
 */
const getSchoolColor = (id_colegio: number, schools: School[]): string => {
  return schools.find((s) => s.id_school === id_colegio)?.color ?? '#888';
};

/**
 * Devuelve la abreviatura del colegio.
 */
const getSchoolAbbreviation = (id_colegio: number, schools: School[]): string => {
  return schools.find((s) => s.id_school === id_colegio)?.abbreviation ?? '??';
};

export function ScheduleView({ modulos, listSchools, altoPorMinuto = 3 }: ScheduleProps) {
  const horas = useMemo(() => {
    const horasInicio = modulos.map((m) => m.horaInicio);
    const horasFin = modulos.map((m) => m.horaFin);
    const horaInicioMin = horasInicio.sort()[0];
    const horaFinMax = horasFin.sort().reverse()[0];
    const totalMinutos = minutosEntre(horaInicioMin, horaFinMax);
    return { horaInicioMin, horaFinMax, totalMinutos };
  }, [modulos]);

  /**
   * Renderiza las filas de un día específico.
   */
  const renderDia = (dia: string) => {
    const modulosDia = useMemo(() => {
      return modulos
        .filter((m) => m.dia === dia)
        .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    }, [modulos, dia]);

    let contenidoFilas: React.ReactNode[] = [];
    let horaCursor = horas.horaInicioMin;

    modulosDia.forEach((modulo) => {
      // Espacio vacío entre módulos
      if (modulo.horaInicio > horaCursor) {
        const espacio = minutosEntre(horaCursor, modulo.horaInicio);
        contenidoFilas.push(
          <Table.Tr key={`espacio-${horaCursor}`}>
            <Table.Td style={{ height: espacio * altoPorMinuto }} />
          </Table.Tr>
        );
      }

      // Módulo actual
      const duracion = minutosEntre(modulo.horaInicio, modulo.horaFin);
      const color = getSchoolColor(modulo.id_colegio, listSchools);
      const abbreviation = getSchoolAbbreviation(modulo.id_colegio, listSchools);

      contenidoFilas.push(
        <Table.Tr key={modulo.id}>

          <Table.Td
            className="espacioFinalHover"
            style={{
              height: duracion * altoPorMinuto,
              textAlign: 'center',
              userSelect: 'none',
              backgroundColor: `${color}55`,
              border: `2px solid ${color}`,
            }}
          >
            <Text
              size="sm"
              style={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 15,
                padding: '2.5px 0',
              }}
            >
              <Avatar
                size={30}
                radius="xl"
                src="https://imgs.search.brave.com/WD6xEN75c5j99NK9l0NdI-H3FfSv2thYZDv6dsQnwDY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3QtbG9n/by1mbGFtZS1zaGFw/ZV8xMDQzLTQ0Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
              />
              {abbreviation}
            </Text>

            <Text size="xs" style={{ color: 'white', padding: '2.5px 0' }}>
              Matemática 5C
            </Text>

            <Text size="sm" style={{ color: 'white', padding: '2.5px 0' }}>
              {modulo.horaInicio} - {modulo.horaFin}
            </Text>
          </Table.Td>
        </Table.Tr>
      );

      horaCursor = modulo.horaFin;
    });

    // Espacio al final del día
    if (horaCursor < horas.horaFinMax) {
      const espacioFinal = minutosEntre(horaCursor, horas.horaFinMax);
      contenidoFilas.push(
        <Table.Tr key={`final-${dia}`}>
          <Table.Td style={{ height: espacioFinal * altoPorMinuto }} />
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
          style={{ height: horas.totalMinutos * altoPorMinuto }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ textAlign: 'center', userSelect: 'none' }}>
                {capitalize(dia)}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{contenidoFilas}</Table.Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <ScrollArea>
      <Flex align="start">
        {dias.map((dia) => renderDia(dia))}
      </Flex>
    </ScrollArea>
  );
}
