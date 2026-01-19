import { Modal, Button, Flex, Select, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function CreateYearModal({ opened, onClose, onDelete }: {
    opened: boolean;
    onClose: () => void;
    onDelete: (year: string) => void;
}) {


    const [year, setYear] = useState<string | null>(null);

    useEffect(() => {
        if (!opened) {
            setYear(null);
        }
    }, [opened]);

    const handleDelete = () => {
        if (year) {
            onDelete(year);
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
                        placeholder="Seleccione el año"
                        data={[
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                            { value: '4', label: '4' },
                            { value: '5', label: '5' },
                            { value: '6', label: '6' },
                        ]}
                        value={year}
                        onChange={setYear}
                        withAsterisk
  classNames={{
    input: 'year-input',
  }}

                    />

                    <Button
                        color="red"
                        disabled={!year}
                        onClick={handleDelete}
                    >
                        Eliminar
                    </Button>
                </Group>

            </Flex>
        </Modal>
    );
}

export default CreateYearModal;