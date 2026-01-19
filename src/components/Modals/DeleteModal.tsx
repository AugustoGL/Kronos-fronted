import { Modal, Button, Group, Text } from '@mantine/core';

function DeleteCourseModal({
    opened,
    close,
    msg,
    onDelete,
}: {
    opened: boolean;
    close: () => void;
    msg?: string | null;
    onDelete: () => void;
}) {

    return (    
        <Modal
            opened={opened}
            onClose={close}
            title="Confirmar eliminación"
            yOffset='15vh'
        >
            <Text size="md" mb="md">
                ¿Estás seguro que quieres eliminar{' '}
                <b>
                    {msg}
                </b>
                ?
            </Text>
            <Group justify="flex-end">
                <Button variant="default" onClick={close}>
                    Cancelar
                </Button>
                <Button color="red" onClick={onDelete}>
                    Eliminar
                </Button>
            </Group>
        </Modal>
    );
}

export default DeleteCourseModal;