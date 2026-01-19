import { Modal, Button, Flex, Select, NumberInput } from '@mantine/core';

import { useForm } from '@mantine/form';

function AsignSubjectModal({ opened, close, id }: { opened: boolean; close: () => void; id?: string }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            subject: '',
            course: '',
            teacher: '',
            hours: undefined,
        },
        validate: {
            subject: (value) => !value ? 'Debe seleccionar una materia' : null,
            course: (value) => !value ? 'Debe seleccionar un curso' : null,
            teacher: (value) => !value ? 'Debe seleccionar un profesor' : null,
            hours: (value) => value === undefined || value === null || value <= 0 ? 'Debe ingresar un número de horas válido' : null,
        }
    });

    const handleClose = () => {
        form.reset(); // resetea los valores
        close();       // cierra el modal
    };

    // Mock data
    const subjects = [
        { value: 'math', label: 'Matemáticas' },
        { value: 'physics', label: 'Física' },
        { value: 'chemistry', label: 'Química' },
        { value: 'history', label: 'Historia' },
        { value: 'literature', label: 'Literatura' },
    ];

    const courses = [
        { value: '1a', label: '1° A' },
        { value: '1b', label: '1° B' },
        { value: '2a', label: '2° A' },
        { value: '2b', label: '2° B' },
        { value: '3a', label: '3° A' },
    ];

    const teachers = [
        { value: 'teacher1', label: 'Prof. García' },
        { value: 'teacher2', label: 'Prof. Martínez' },
        { value: 'teacher3', label: 'Prof. López' },
        { value: 'teacher4', label: 'Prof. Rodríguez' },
        { value: 'teacher5', label: 'Prof. González' },
    ];

    return (
        <Modal
            opened={opened}
            onClose={handleClose} // <-- usamos la función que resetea
            title="Asignar materia"
            yOffset='15vh'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }} 
        >
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Flex direction="column" gap="md">
                    <Select
                        placeholder="Selecciona la materia"
                        data={subjects}
                        key={form.key('subject')}
                        {...form.getInputProps('subject')}
                        searchable
                    />
                    <Select
                        placeholder="Selecciona el curso"
                        data={courses}
                        key={form.key('course')}
                        {...form.getInputProps('course')}
                        searchable
                    />
                    <Select
                        placeholder="Selecciona el profesor"
                        data={teachers}
                        key={form.key('teacher')}
                        {...form.getInputProps('teacher')}
                        searchable
                    />
                    <NumberInput
                        placeholder="Número de horas catedra"
                        min={1}
                        max={40}
                        key={form.key('hours')}
                        {...form.getInputProps('hours')}
                    />
                    <Button type="submit" style={{ marginTop: '15px' }}>
                        {id ? `Editar ${id}` : "Crear"}
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}

export default AsignSubjectModal;
