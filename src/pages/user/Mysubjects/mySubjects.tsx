import { useMemo, useState } from 'react';
import { Table, Text, Loader, Alert, Badge, Group, Input, Button } from '@mantine/core';
import { useMySubjects } from '../../../hooks/user/useMySubject';

function MySubjects() {
  const { subjects, loading, error } = useMySubjects();

  const [subjectFilter, setSubjectFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<number | null>(null);

  // Escuelas únicas
  const schools = useMemo(() => {
    const map = new Map<number, string>();
    subjects.forEach((s) => map.set(s.id_school, s.name_school));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [subjects]);

  const filtered = useMemo(() => {
    return subjects.filter((s) => {
      const matchSubject = s.name.toLowerCase().includes(subjectFilter.toLowerCase());
      const matchCourse = s.year_course.toLowerCase().includes(courseFilter.toLowerCase());
      const matchSchool = selectedSchool === null || s.id_school === selectedSchool;
      return matchSubject && matchCourse && matchSchool;
    });
  }, [subjects, subjectFilter, courseFilter, selectedSchool]);

  if (loading) return <Loader color="yellow" />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <div className="contenedor-tabla">

      <div className="contenedor-tabla-filtros">
        <Input
          style={{ width: 220 }}
          placeholder="Filtrar materia..."
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.currentTarget.value)}
        />
        <Input
          style={{ width: 180 }}
          placeholder="Filtrar curso..."
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.currentTarget.value)}
        />
        <Button.Group>
          <Button
            variant={selectedSchool === null ? 'filled' : 'default'}
            onClick={() => setSelectedSchool(null)}
          >
            Todos
          </Button>
          {schools.map((s) => (
            <Button
              key={s.id}
              variant={selectedSchool === s.id ? 'filled' : 'default'}
              onClick={() => setSelectedSchool(s.id)}
            >
              {s.name}
            </Button>
          ))}
        </Button.Group>
      </div>

      <Table.ScrollContainer minWidth={500}>
        <Table withTableBorder verticalSpacing="lg">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Materia</Table.Th>
              <Table.Th>Curso</Table.Th>
              <Table.Th>Hs/Semana</Table.Th>
              <Table.Th>Colegio</Table.Th>
              <Table.Th>Color</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((s) => (
              <Table.Tr key={s.id_subject}>
                <Table.Td>
                  <Group gap={8}>
                    <Badge
                      variant="filled"
                      style={{ backgroundColor: s.color, color: '#000', fontWeight: 600 }}
                    >
                      {s.abbreviation}
                    </Badge>
                    <Text size="sm">{s.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="sm">{s.year_course}</Text></Table.Td>
                <Table.Td><Text size="sm">{s.week_hours}</Text></Table.Td>
                <Table.Td><Text size="sm">{s.name_school}</Text></Table.Td>
                <Table.Td>
                  <div style={{
                    width: 20,
                    height: 20,
                    backgroundColor: s.color,
                    borderRadius: 4,
                    border: '1px solid #ffffff22'
                  }} />
                </Table.Td>
              </Table.Tr>
            ))}
            {filtered.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text c="dimmed" ta="center" size="sm">Sin resultados</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

    </div>
  );
}

export default MySubjects;