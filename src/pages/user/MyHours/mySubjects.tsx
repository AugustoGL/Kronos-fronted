import { useMemo } from 'react';
import { Table, Text, Loader, Alert, Badge, Group } from '@mantine/core';
import { useMySubjects } from "../../../hooks/user/useMySubject";

function MySubjects() {
  const { subjects, loading, error } = useMySubjects();

  // Agrupar por colegio
  const grouped = useMemo(() => {
    const map = new Map<number, { name_school: string; subjects: typeof subjects }>();
    subjects.forEach((s) => {
      if (!map.has(s.id_school)) {
        map.set(s.id_school, { name_school: s.name_school, subjects: [] });
      }
      map.get(s.id_school)!.subjects.push(s);
    });
    return Array.from(map.values());
  }, [subjects]);

  if (loading) return <Loader color="yellow" />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <div className="contenedor-tabla">
      {grouped.map((group) => (
        <div key={group.name_school} style={{ marginBottom: 32 }}>
          <Text size="lg" fw={700} mb="sm">{group.name_school}</Text>
          <Table.ScrollContainer minWidth={400}>
            <Table withTableBorder verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Materia</Table.Th>
                  <Table.Th>Curso</Table.Th>
                  <Table.Th>Hs/Semana</Table.Th>
                  <Table.Th>Color</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {group.subjects.map((s) => (
                  <Table.Tr key={s.id_subject}>
                    <Table.Td>
                      <Group gap={8}>
                        <Badge
                          color={s.color}
                          variant="filled"
                          style={{ backgroundColor: s.color, color: '#000', fontWeight: 600 }}
                        >
                          {s.abbreviation}
                        </Badge>
                        {s.name}
                      </Group>
                    </Table.Td>
                    <Table.Td>{s.year_course}</Table.Td>
                    <Table.Td>{s.week_hours}</Table.Td>
                    <Table.Td>
                      <div style={{
                        width: 20,
                        height: 20,
                        backgroundColor: s.color,
                        borderRadius: 4,
                        border: '1px solid #ccc'
                      }} />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </div>
      ))}
    </div>
  );
}

export default MySubjects;