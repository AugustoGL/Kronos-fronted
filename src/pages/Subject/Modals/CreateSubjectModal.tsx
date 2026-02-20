import { Modal, Button, Flex, TextInput, Alert, Textarea } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useCreateBaseSubject } from '../../../hooks/useCreateBaseSubject';

interface CreateSubjectModalProps {
  opened: boolean;
  close: () => void;
  onSuccess?: () => void; // para refetch de la tabla
}

function CreateSubjectModal({ opened, close, onSuccess }: CreateSubjectModalProps) {
  const { createBaseSubject, loading, error } = useCreateBaseSubject();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      subject: '',
      abbreviation: '',
      description: '',
    },
    validate: {
      subject: (value) => value.trim().length === 0 ? 'El nombre de la materia es requerido' : null,
      abbreviation: (value) => value.trim().length === 0 ? 'La abreviación es requerida' : null,
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    const ok = await createBaseSubject({
      name: values.subject,
      abbreviation: values.abbreviation,
      description: values.description || null,
    });

    if (ok) {
      form.reset();
      onSuccess?.();
      close();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Crear nueva materia"
      yOffset='15vh'
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md">
          {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
              {error}
            </Alert>
          )}

          <TextInput
            placeholder="Nombre de la materia"
            key={form.key('subject')}
            {...form.getInputProps('subject')}
          />
          <TextInput
            placeholder="Abreviación de la materia"
            maxLength={5}
            key={form.key('abbreviation')}
            {...form.getInputProps('abbreviation')}
          />
          <Textarea
            placeholder="Descripción (opcional)"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />
          <Button
            type="submit"
            loading={loading}
            style={{ marginTop: '15px' }}
          >
            Crear materia
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}

export default CreateSubjectModal;