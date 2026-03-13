import { Modal, Button, Flex, TextInput, Group, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useYear } from '../../../../hooks/school/useYear';

function CreateYearModal({ opened, onClose }: {
    opened: boolean;
    onClose: () => void;
}) {
    const { createYear, error } = useYear();
    const [year, setYear] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!opened) setYear('');
    }, [opened]);

    const handleCreate = async () => {
        const name = Number(year);
        if (!name) return;
        setLoading(true);
        const ok = await createYear(name);
        setLoading(false);
        if (ok) onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Crear año"
            yOffset='15vh'
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Flex direction="column" gap="md">
                {error && (
                    <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                        {error}
                    </Alert>
                )}
                <Group gap="md" grow>
                    <TextInput
                        placeholder="Ingrese el año"
                        value={year}
                        onChange={e => setYear(e.currentTarget.value)}
                        withAsterisk
                        type="number"
                    />
                    <Button
                        color="blue"
                        disabled={!year}
                        loading={loading}
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