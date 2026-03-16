import { useMemo, useState } from 'react';
import { Table, Text, Loader, Alert, Group, Tabs, Badge, Stack } from '@mantine/core';
import { IconBook, IconSchool, IconClock } from '@tabler/icons-react';
import { useMySubjects } from '../../../hooks/user/useMySubject';

function MySubjects() {
  const { subjects, loading, error } = useMySubjects();

  const grouped = useMemo(() => {
    const map = new Map<number, { name_school: string; subjects: typeof subjects }>();
    subjects.forEach((s) => {
      if (!map.has(s.id_school)) {
        map.set(s.id_school, { name_school: s.name_school, subjects: [] });
      }
      map.get(s.id_school)!.subjects.push(s);
    });
    return Array.from(map.entries()).map(([id, val]) => ({ id_school: id, ...val }));
  }, [subjects]);

  const [activeTab, setActiveTab] = useState<string | null>(
    grouped[0] ? String(grouped[0].id_school) : null
  );

  // Total horas por colegio activo
  const activeGroup = grouped.find((g) => String(g.id_school) === activeTab);
  const totalHours = activeGroup?.subjects.reduce((acc, s) => acc + s.week_hours, 0) ?? 0;

  if (loading) return <Loader color="yellow" />;
  if (error) return <Alert color="red">{error}</Alert>;
  if (grouped.length === 0) return <Text c="dimmed">No tenés materias asignadas.</Text>;

  return (
    <div className="contenedor-tabla">

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="pills"
        mb="lg"
      >
        <Group justify="space-between" align="center" mb="md">
          <Tabs.List>
            {grouped.map((g) => (
              <Tabs.Tab
                key={g.id_school}
                value={String(g.id_school)}
                leftSection={<IconSchool size={14} />}
              >
                {g.name_school}
                <Badge size="xs" variant="light" ml={6} color="gray">
                  {g.subjects.length}
                </Badge>
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {activeGroup && (
            <Group gap={6} c="dimmed">
              <IconClock size={14} />
              <Text size="sm">{totalHours} hs/semana en total</Text>
            </Group>
          )}
        </Group>

        {grouped.map((g) => (
          <Tabs.Panel key={g.id_school} value={String(g.id_school)}>
            <Table.ScrollContainer minWidth={400}>
              <Table verticalSpacing="sm" withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Materia</Table.Th>
                    <Table.Th>Curso</Table.Th>
                    <Table.Th>Hs/Semana</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {g.subjects.map((s) => (
                    <Table.Tr key={s.id_subject}>
                      <Table.Td>
                        <Group gap={10}>
                          {/* Barra de color lateral */}
                          <div style={{
                            width: 4,
                            height: 36,
                            borderRadius: 2,
                            backgroundColor: s.color,
                            flexShrink: 0,
                          }} />
                          <Stack gap={0}>
                            <Text size="sm" fw={500}>{s.name}</Text>
                            <Text size="xs" c="dimmed">{s.abbreviation}</Text>
                          </Stack>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{s.year_course}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap={4}>
                          <IconBook size={14} color="gray" />
                          <Text size="sm">{s.week_hours}</Text>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}

export default MySubjects;