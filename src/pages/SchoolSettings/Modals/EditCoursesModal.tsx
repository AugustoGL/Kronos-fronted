import { Modal, Button, Flex, Select, TextInput, Group, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useCourse } from '../../../hooks/useCourse';
import { useYear } from '../../../hooks/useYear';

function ModalModifyCourses({ opened, close, courseId, initialCourse, initialYearId }: {
    opened: boolean;
    close: () => void;
    courseId?: number | null;
    initialCourse?: string;
    initialYearId?: number | null;
}) {
    const { updateCourse, error } = useCourse();
    const { years } = useYear();
    const [yearId, setYearId] = useState<string | null>(null);
    const [division, setDivision] = useState<string>(initialCourse ?? '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (opened) {
            setDivision(initialCourse ?? '');
            setYearId(initialYearId ? String(initialYearId) : null);
        }
    }, [opened, initialCourse, initialYearId]);

    const yearOptions = years.map(y => ({
        value: String(y.id_year),
        label: String(y.name),
    }));

    const handleSave = async () => {
        if (!courseId || !yearId || !division) return;
        setLoading(true);
        const ok = await updateCourse(courseId, {
            name: division,
            id_year: Number(yearId),
        });
        setLoading(false);
        if (ok) close();
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Editar curso"
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
                    onClick={handleSave}
                >
                    Guardar
                </Button>
            </Flex>
        </Modal>
    );
}

export default ModalModifyCourses;