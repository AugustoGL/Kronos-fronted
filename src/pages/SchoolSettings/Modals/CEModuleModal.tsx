import { Modal, Button, Flex, Select, Group, Text } from '@mantine/core';
import { TimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { elementsModules } from '../elementsModules';

function CreateModuleModal({ opened, close, id }: { opened: boolean; close: () => void; id?: string }) {
    const form = useForm({
        initialValues: {
            dia: '',
            horaInicio: '',
            horaFin: '',
        },
        validate: {
            dia: (value) => !value ? 'Debe seleccionar un día' : null,
            horaInicio: (value) => !value ? 'Debe ingresar una hora de inicio' : null,
            horaFin: (value, values) => {
                if (!value) return 'Debe ingresar una hora de fin';
                if (values.horaInicio && value <= values.horaInicio) {
                    return 'La hora de finalización debe ser posterior a la hora de inicio';
                }
                return null;
            },
        }
    });

    useEffect(() => {
        if (!opened) {
            form.reset();
            form.clearErrors();
        } else if (id) {
            // Si hay id, cargar los datos del módulo
            const modulo = elementsModules.find(m => m.id === id);
            if (modulo) {
                form.setValues({
                    dia: modulo.dia,
                    horaInicio: modulo.horaInicio,
                    horaFin: modulo.horaFin,
                });
            }
        } else {
            // Si no hay id, resetear a valores vacíos
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

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={id ? "Editar módulo" : "Crear nuevo módulo"}
            yOffset='15vh'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <form onSubmit={form.onSubmit((values) => {
                console.log(values);
                form.reset();
                form.clearErrors();
                close();
            })}>
                <Flex direction="column" gap="md">
                    <Select
                        placeholder="Selecciona el día"
                        data={diasOptions}
                        value={form.values.dia}
                        onChange={(value) => form.setFieldValue('dia', value || '')}
                        error={form.errors.dia}
                        searchable
                        withAsterisk
                    />
                    <div>
                        <Text size="sm" fw={500} mb={5}>
                            Horario de inicio y fin   <Text span c="red">*</Text>
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
                            <Text size="lg" fw={600} style={{ marginBottom: 4 }}>
                            </Text>
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
                            <Button
                                type="submit"
                                style={{ flex: 1 }}
                            >
                                Guardar cambios
                            </Button>
                            <Button
                                color="red"
                                variant="outline"
                                onClick={(e) => {
                                    close();
                                    e.preventDefault();
                                    console.log("Eliminar módulo:", id);
                                    form.reset();
                                    form.clearErrors();
                                }}
                                style={{ flex: 1 }}
                            >
                                Eliminar
                            </Button>
                        </Group>
                    ) : (
                        <Button
                            type="submit"
                            style={{ marginTop: '15px' }}
                        >
                            Crear módulo
                        </Button>
                    )}
                </Flex>
            </form>
        </Modal>
    );
}

export default CreateModuleModal;

