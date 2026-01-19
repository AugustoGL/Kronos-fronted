import { Modal, Button, Group, Text } from '@mantine/core';

function DeleteStaffModal({
    opened,
    close,
    staff,
    onDelete,
}: {
    opened: boolean;
    close: () => void;
    staff: { first_name: string; last_name: string } | null;
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
                ¿Estás seguro que quieres eliminar a{' '}
                <b>
                    {staff ? `${staff.first_name} ${staff.last_name}` : ''}
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

export default DeleteStaffModal;

