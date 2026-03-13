import { Modal, Button, Flex, Select, TextInput, Group, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useCourse } from '../../../../hooks/school/useCourse';
import { useYear } from '../../../../hooks/school/useYear';

function CreateCourseModal({ opened, onClose }: {
    opened: boolean;
    onClose: () => void;
}) {
    const { createCourse, error } = useCourse();
    const { years } = useYear();
    const [yearId, setYearId] = useState<string | null>(null);
    const [division, setDivision] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!opened) {
            setYearId(null);
            setDivision('');
        }
    }, [opened]);

    const yearOptions = years.map(y => ({
        value: String(y.id_year),
        label: String(y.name),
    }));

    const handleCreate = async () => {
        if (!yearId || !division) return;
        setLoading(true);
        const ok = await createCourse({
            name: division,
            id_year: Number(yearId),
        });
        setLoading(false);
        if (ok) onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Crear curso"
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
                    <Select
                        placeholder="Año"
                        data={yearOptions}
                        searchable
                        value={yearId}
                        onChange={setYearId}
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
                    disabled={!yearId || !division}
                    loading={loading}
                    onClick={handleCreate}
                >
                    Crear
                </Button>
            </Flex>
        </Modal>
    );
}

export default CreateCourseModal;