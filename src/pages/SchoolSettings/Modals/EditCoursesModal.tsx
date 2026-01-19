import { Modal, Button, Flex, Select, TextInput, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function ModalModifyCourses({ opened, close, onSave, initialYear, initialCourse }: {
    opened: boolean;
    close: () => void;
    onSave: (course: { year: string; course: string }) => void;
    initialYear?: string;
    initialCourse?: string;
}) {
    const [year, setYear] = useState<string | null>(initialYear ?? null);
    const [division, setDivision] = useState<string>(initialCourse ?? '');

    useEffect(() => {
        if (opened) {
            setYear(initialYear ?? null);
            setDivision(initialCourse ?? '');
        }
    }, [opened, initialYear, initialCourse]);

    const yearOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
    ];

    const handleSave = () => {
        if (year && division) {
            onSave({ year, course: division });
            close();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Editar curso"
            yOffset='15vh'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Flex direction="column" gap="md">
                <Group gap="md" grow>
                    <Select
                        placeholder="Año"
                        data={yearOptions}
                        searchable
                        value={year}
                        onChange={setYear}
                        withAsterisk
                    />
                    <TextInput
                        placeholder="División (A, B, C...)"
                        value={division}
                        onChange={e => setDivision(e.currentTarget.value)}
                        withAsterisk
                    />
                </Group>
                <Button
                    color="blue"
                    disabled={!year || !division}
                    onClick={handleSave}
                >
                    Guardar
                </Button>
            </Flex>
        </Modal>
    );
}

export default ModalModifyCourses;