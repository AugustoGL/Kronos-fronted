import { Modal, Button, Select, Alert, Stack, Text, Group, Avatar, Box } from '@mantine/core';
import { useState, useEffect } from 'react';
import type { ScheduleCell } from '../../../../services/school/scheduleService';

interface SubjectOption {
  value: string;
  label: string;
  color: string;
}

// TODO: reemplazar con fetch real al endpoint de materias asignadas
const HARDCODED_OPTIONS: SubjectOption[] = [
  { value: '1', label: 'Matemática · Gómez Ana · 1° A', color: '#FFB3BA' },
  { value: '2', label: 'Lengua · Pérez Juan · 2° B', color: '#B5EAD7' },
  { value: '3', label: 'Historia · López María · 3° A', color: '#C7CEEA' },
  { value: '4', label: 'Geografía · Martínez Luis · 1° B', color: '#FFDAC1' },
  { value: '5', label: 'Inglés · García Laura · 2° A', color: '#D4B8FF' },
];

interface EditScheduleCellModalProps {
  opened: boolean;
  onClose: () => void;
  cell: ScheduleCell | null;
  onSave: (cell: ScheduleCell, newSubjectId: number, newStaffId: number) => Promise<void>;
}

function EditScheduleCellModal({ opened, onClose, cell, onSave }: EditScheduleCellModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (opened && cell) {
      setSelectedOption(String(cell.id_subject));
      setError(null);
    }
  }, [opened, cell]);

  const handleSave = async () => {
    if (!cell || !selectedOption) return;
    setLoading(true);
    setError(null);
    try {
      await onSave(cell, Number(selectedOption), cell.id_staff);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => setSelectedOption(null);

  const selectedSubject = HARDCODED_OPTIONS.find((o) => o.value === selectedOption);
  const accentColor = selectedSubject?.color ?? cell?.color_subject;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar celda"
      yOffset="15vh"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      {cell && (
        <Stack>
          <Text size="sm" fw={500} c="gray" >Materia actual</Text>

          {/* Info actual con color de materia */}
          <Box style={{
            borderRadius: 8,
            padding: '10px 12px',
            backgroundColor: accentColor ? `${accentColor}22` : 'var(--mantine-color-dark-6)',
            borderLeft: accentColor ? `4px solid ${accentColor}` : undefined,
          }}>
            <Group gap={10}>
              <Avatar size={36} radius="xl" src={cell.url_picture_user} />
              <div>
                <Text size="sm" fw={600} style={{ color: accentColor }}>{cell.name_subject}</Text>
                <Text size="xs" c="dimmed">{cell.full_name_user} · {cell.name_course} · Módulo {cell.name_module}</Text>
                <Text size="xs" c="dimmed">{cell.start_time.slice(0, 5)} - {cell.end_time.slice(0, 5)}</Text>
              </div>
            </Group>
          </Box>

          {error && <Alert color="red">{error}</Alert>}

          {/* Select con color indicativo */}
          <Select
            label="Nueva materia asignada"
            placeholder="Seleccioná materia + profesor + curso"
            value={selectedOption}
            onChange={setSelectedOption}
            searchable
            data={HARDCODED_OPTIONS.map((o) => ({
              value: o.value,
              label: o.label,
            }))}
            renderOption={({ option }) => {
              const opt = HARDCODED_OPTIONS.find((o) => o.value === option.value);
              return (
                <Group gap={8}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    backgroundColor: opt?.color ?? '#888',
                    flexShrink: 0,
                  }} />
                  <Text size="sm">{option.label}</Text>
                </Group>
              );
            }}
          />

          <Group justify="space-between" mt="sm">
            <Button
              variant="filled"
              color="red"
              size="sm"
              onClick={handleClear}
            >
              Vaciar celda
            </Button>
            <Group>
              <Button variant="default" onClick={onClose}>Cancelar</Button>
              <Button onClick={handleSave} loading={loading}>
                Guardar
              </Button>
            </Group>
          </Group>
        </Stack>
      )}
    </Modal>
  );
}

export default EditScheduleCellModal;