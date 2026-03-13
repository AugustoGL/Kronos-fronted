import { Modal, Button, Flex, Select, Group, Alert, Loader, Center } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useYear } from '../../../../hooks/school/useYear';

function DeleteYearModal({ opened, onClose }: {
    opened: boolean;
    onClose: () => void;
}) {
    const { years, loading: loadingYears, error, deleteYear, refetch } = useYear();
    const [selectedYearId, setSelectedYearId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!opened) {
            setSelectedYearId(null);
        } else {
            refetch();
        }
    }, [opened]);

    const handleDelete = async () => {
        if (!selectedYearId) return;
        setLoading(true);
        const ok = await deleteYear(Number(selectedYearId));
        setLoading(false);
        if (ok) onClose();
    };

    const yearOptions = years.map(y => ({
        value: String(y.id_year),
        label: String(y.name),
    }));

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Eliminar año"
            yOffset='15vh'
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            {loadingYears ? (
                <Center h={100}><Loader /></Center>
            ) : (
                <Flex direction="column" gap="md">
                    {error && (
                        <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                            {error}
                        </Alert>
                    )}
                    <Group gap="md" grow>
                        <Select
                            placeholder="Seleccione el año"
                            data={yearOptions}
                            value={selectedYearId}
                            onChange={setSelectedYearId}
                            withAsterisk
                        />
                        <Button
                            color="red"
                            disabled={!selectedYearId}
                            loading={loading}
                            onClick={handleDelete}
                        >
                            Eliminar
                        </Button>
                    </Group>
                </Flex>
            )}
        </Modal>
    );
}

export default DeleteYearModal;