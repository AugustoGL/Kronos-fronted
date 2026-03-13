import { Modal, Button, Flex, TextInput, Textarea, Alert } from '@mantine/core';
import { ColorInput } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useCreateBaseSubject } from '../../../../hooks/school/useCreateBaseSubject';

interface CreateSubjectModalProps {
  opened: boolean;
  close: () => void;
  onSuccess?: () => void;
}

function CreateSubjectModal({ opened, close, onSuccess }: CreateSubjectModalProps) {
  const { createBaseSubject, loading, error } = useCreateBaseSubject();

  const form = useForm({
    initialValues: {
      name: '',
      abbreviation: '',
      description: '',
      color: '#FFFFFF',
    },
    validate: {
      name: (value) => !value ? 'El nombre es requerido' : null,
      abbreviation: (value) => !value ? 'La abreviación es requerida' : null,
      color: (value) => !value ? 'El color es requerido' : null,
    }
  });

  const handleClose = () => {
    form.reset();
    close();
  };

  const handleSubmit = async (values: typeof form.values) => {
    const ok = await createBaseSubject({
      name: values.name,
      abbreviation: values.abbreviation,
      description: values.description || null,
      color: values.color,
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
      onClose={handleClose}
      title="Crear materia base"
      yOffset='15vh'
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
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
            withAsterisk
            {...form.getInputProps('name')}
          />
          <TextInput
            placeholder="Abreviación (ej: MAT, ING)"
            withAsterisk
            {...form.getInputProps('abbreviation')}
          />
          <Textarea
            placeholder="Descripción (opcional)"
            {...form.getInputProps('description')}
          />
            <ColorInput
              placeholder="Color de la materia"
              key={form.key('color')}
              {...form.getInputProps('color')}
              swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
            />
          <Button type="submit" loading={loading} style={{ marginTop: '15px' }}>
            Crear materia
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}

export default CreateSubjectModal;