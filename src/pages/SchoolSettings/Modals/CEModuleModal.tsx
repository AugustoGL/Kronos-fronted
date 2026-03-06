import { Modal, Button, Flex, Select, Group, Text, Alert, TextInput } from '@mantine/core';
import { TimePicker } from '@mantine/dates';
import { IconAlertCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useModules } from '../../../hooks/useModules';

function CreateModuleModal({ opened, close, id }: { opened: boolean; close: () => void; id?: string }) {
    const { modulos, createModule, updateModule, deleteModule, error } = useModules();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            dia: '',
            horaInicio: '',
            horaFin: '',
            name: '',
        },
        validate: {
            dia: (value) => !value ? 'Debe seleccionar un día' : null,
            name: (value) => !value ? 'Debe ingresar un número' : null,
            horaInicio: (value) => !value ? 'Debe ingresar una hora de inicio' : null,
            horaFin: (value, values) => {
                if (!value) return 'Debe ingresar una hora de fin';
                if (values.horaInicio && value <= values.horaInicio)
                    return 'La hora de finalización debe ser posterior a la hora de inicio';
                return null;
            },
        }
    });

    useEffect(() => {
        if (!opened) {
            form.reset();
            form.clearErrors();
        } else if (id) {
            const modulo = modulos.find(m => m.id === id);
            if (modulo) {
                form.setValues({
                    dia: modulo.dia,
                    horaInicio: modulo.horaInicio,
                    horaFin: modulo.horaFin,
                    name: modulo.name,
                });
            }
        } else {
            form.reset();
        }
    }, [opened, id]);

    const diasOptions = [
        { value: 'lunes', label: 'Lunes' },
        { value: 'martes', label: 'Martes' },
        { value: 'miércoles', label: 'Miércoles' },
        { value: 'jueves', label: 'Jueves' },
        { value: 'viernes', label: 'Viernes' },
    ];

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        const data = { start_time: values.horaInicio, end_time: values.horaFin, day: values.dia, name: values.name };
        const ok = id ? await updateModule(id, data) : await createModule(data);
        setLoading(false);
        if (ok) {
            form.reset();
            form.clearErrors();
            close();
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        setLoading(true);
        const ok = await deleteModule(id);
        setLoading(false);
        if (ok) {
            form.reset();
            form.clearErrors();
            close();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={id ? "Editar módulo" : "Crear nuevo módulo"}
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
                    <Group gap="md" grow>
                        <Select
                            placeholder="Selecciona el día"
                            data={diasOptions}
                            value={form.values.dia}
                            onChange={(value) => form.setFieldValue('dia', value || '')}
                            error={form.errors.dia}
                            searchable
                            withAsterisk
                        />
                        <TextInput
                            placeholder="Número de módulo"
                            value={form.values.name}
                            onChange={(e) => form.setFieldValue('name', e.currentTarget.value)}
                            error={form.errors.name}
                            withAsterisk
                        />
                    </Group>
                    <div>
                        <Text size="sm" fw={500} mb={5}>
                            Horario de inicio y fin <Text span c="red">*</Text>
                        </Text>
                        <Group gap="xs" align="flex-end">
                            <TimePicker
                                format="24h"
                                value={form.values.horaInicio}
                                onChange={(value) => form.setFieldValue('horaInicio', value || '')}
                                error={form.errors.horaInicio}
                                style={{ flex: 1 }}
                                withDropdown
                            />
                            <TimePicker
                                format="24h"
                                value={form.values.horaFin}
                                onChange={(value) => form.setFieldValue('horaFin', value || '')}
                                error={form.errors.horaFin}
                                style={{ flex: 1 }}
                                withDropdown
                            />
                        </Group>
                    </div>

                    {id ? (
                        <Group gap="md" mt="md">
                            <Button type="submit" loading={loading} style={{ flex: 1 }}>
                                Guardar cambios
                            </Button>
                            <Button
                                color="red"
                                variant="outline"
                                loading={loading}
                                onClick={handleDelete}
                                style={{ flex: 1 }}
                            >
                                Eliminar
                            </Button>
                        </Group>
                    ) : (
                        <Button type="submit" loading={loading} style={{ marginTop: '15px' }}>
                            Crear módulo
                        </Button>
                    )}
                </Flex>
            </form>
        </Modal>
    );
}

export default CreateModuleModal;