import { Modal, Button, Flex, Select, TextInput, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function CreateCourseModal({ opened, onClose, onCreate }: {
    opened: boolean;
    onClose: () => void;
    onCreate: (course: { year: string; course: string }) => void;
}) {
    const [year, setYear] = useState<string | null>(null);
    const [division, setDivision] = useState<string>('');

    useEffect(() => {
        if (!opened) {
            setYear(null);
            setDivision('');
        }
    }, [opened]);

    const yearOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
    ];

    const handleCreate = () => {
        if (year && division) {
            onCreate({ year, course: division });
            onClose();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Crear curso"
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
                    onClick={handleCreate}
                >
                    Crear
                </Button>
            </Flex>
        </Modal>
    );
}

export default CreateCourseModal;