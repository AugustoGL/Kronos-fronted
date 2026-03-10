import { Modal, Button, Flex, Select, NumberInput, Alert, Loader, Center } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useAssignSubject } from '../../../hooks/useAssignSubject';

interface AsignSubjectModalProps {
  opened: boolean;
  close: () => void;
  id?: number | null;
  onSuccess?: () => void;
}

function AsignSubjectModal({ opened, close, id, onSuccess }: AsignSubjectModalProps) {
  const {
    subjectOptions,
    courseOptions,
    professorOptions,
    loadingOptions,
    loadOptions,
    createSubject,
    loading,
    error,
  } = useAssignSubject();

  useEffect(() => {
    if (opened) loadOptions();
  }, [opened]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      subject: '',
      course: '',
      teacher: '',
      hours: undefined as number | undefined,
    },
    validate: {
      subject: (value) => !value ? 'Debe seleccionar una materia' : null,
      course: (value) => !value ? 'Debe seleccionar un curso' : null,
      teacher: (value) => !value ? 'Debe seleccionar un profesor' : null,
      hours: (value) => !value || value <= 0 ? 'Debe ingresar un número de horas válido' : null,
    }
  });

  const handleClose = () => {
    form.reset();
    close();
  };

  const handleSubmit = async (values: typeof form.values) => {
    const ok = await createSubject({
      week_hours: values.hours!,
      id_staff: Number(values.teacher),
      id_course: Number(values.course),
      id_base_subject: Number(values.subject),
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
      title={id ? "Editar materia" : "Asignar materia"}
      yOffset='15vh'
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      {loadingOptions ? (
        <Center h={200}><Loader /></Center>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex direction="column" gap="md">
            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                {error}
              </Alert>
            )}
            <Select
              placeholder="Selecciona la materia"
              data={subjectOptions}
              key={form.key('subject')}
              {...form.getInputProps('subject')}
              searchable
            />
            <Select
              placeholder="Selecciona el curso"
              data={courseOptions}
              key={form.key('course')}
              {...form.getInputProps('course')}
              searchable
            />
            <Select
              placeholder="Selecciona el profesor"
              data={professorOptions}
              key={form.key('teacher')}
              {...form.getInputProps('teacher')}
              searchable
            />
            <NumberInput
              placeholder="Número de horas cátedra"
              min={1}
              max={40}
              key={form.key('hours')}
              {...form.getInputProps('hours')}
            />
            <Button type="submit" loading={loading} style={{ marginTop: '15px' }}>
              {id ? "Guardar cambios" : "Asignar materia"}
            </Button>
          </Flex>
        </form>
      )}
    </Modal>
  );
}

export default AsignSubjectModal;