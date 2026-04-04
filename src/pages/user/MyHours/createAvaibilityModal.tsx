import { Modal, Button, Select, Group, Alert, Stack } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useState } from 'react';
import { createAvailabilityService } from '../../../services/user/aviabilityServices';

const DAYS = [
  { value: 'MONDAY',    label: 'Lunes' },
  { value: 'TUESDAY',   label: 'Martes' },
  { value: 'WEDNESDAY', label: 'Miércoles' },
  { value: 'THURSDAY',  label: 'Jueves' },
  { value: 'FRIDAY',    label: 'Viernes' },
];

function CreateAvailabilityModal({
  opened,
  onClose,
  onSuccess,
}: {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [day, setDay] = useState<string | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setDay(null);
    setStartTime('');
    setEndTime('');
    setError(null);
    onClose();
  };

  const handleCreate = async () => {
    if (!day || !startTime || !endTime) {
      setError('Completá todos los campos');
      return;
    }
    if (startTime >= endTime) {
      setError('La hora de inicio debe ser menor a la hora de fin');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await createAvailabilityService({ day, start_time: startTime, end_time: endTime });
      onSuccess();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Bloquear tiempo"
      yOffset="15vh"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      <Stack>
        {error && <Alert color="red">{error}</Alert>}
        <Select
          label="Día"
          placeholder="Seleccioná un día"
          data={DAYS}
          value={day}
          onChange={setDay}
        />
        <Group grow>
          <TimeInput
            label="Hora inicio"
            value={startTime}
            onChange={(e) => setStartTime(e.currentTarget.value)}
          />
          <TimeInput
            label="Hora fin"
            value={endTime}
            onChange={(e) => setEndTime(e.currentTarget.value)}
          />
        </Group>
        <Button onClick={handleCreate} loading={loading} color="red" mt="sm">
          Bloquear
        </Button>
      </Stack>
    </Modal>
  );
}

export default CreateAvailabilityModal;