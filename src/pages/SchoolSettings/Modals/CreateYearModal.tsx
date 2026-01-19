import { Modal, Button, Flex, TextInput, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function CreateYearModal({ opened, onClose, onCreate }: {
    opened: boolean;
    onClose: () => void;
    onCreate: (year: { year: string }) => void;
}) {
    const [year, setYear] = useState<string>('');

    useEffect(() => {
        if (!opened) {
            setYear('');
        }
    }, [opened]);

    const handleCreate = () => {
        if (year) {
            onCreate({ year });
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
                    <TextInput
                        placeholder="Ingrese el año"
                        value={year}
                        onChange={e => setYear(e.currentTarget.value)}
                        withAsterisk
                    />
                    <Button
                        color="blue"
                        disabled={!year}
                        onClick={handleCreate}
                    >
                        Crear
                    </Button>
                </Group>

            </Flex>
        </Modal>
    );
}

export default CreateYearModal;