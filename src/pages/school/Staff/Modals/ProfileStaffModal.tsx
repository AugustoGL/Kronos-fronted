import { Modal, Avatar, Text, Stack, Group, Paper, Divider, Button } from '@mantine/core';
import { IconMail, IconPhone, IconIdBadge2 } from '@tabler/icons-react';


function ProfileStaffModal({ opened, close }: { opened: boolean; close: () => void }) {
    // Mock data - replace with actual user data
    const userData = {
        firstName: 'Juan',
        lastName: 'Pérez',
        dni: '12345678',
        phone: '+54 9 11 1234-5678',
        email: 'juan.perez@example.com',
        avatar: null // URL to user's photo or null for initials
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Crear nuevo usuario"
            yOffset='15vh'
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Paper p="lg" radius="md">
                <Stack align="center" gap="lg">
                    {/* Avatar */}
                    <Avatar
                        src={userData.avatar}
                        size={120}
                        radius="50%"
                        color="blue"
                    >
                        {!userData.avatar && `${userData.firstName[0]}${userData.lastName[0]}`}
                    </Avatar>

                    {/* Name */}
                    <Text size="xl" fw={600} ta="center">
                        {userData.firstName} {userData.lastName}
                    </Text>

                    <Divider w="100%" />

                    {/* Contact Information */}
                    <Stack gap="md" w="100%">
                        <Group gap="sm">
                            <IconIdBadge2 size={20} color="gray" />
                            <Text size="sm" c="dimmed">DNI:</Text>
                            <Text size="sm" fw={500}>{userData.dni}</Text>
                        </Group>

                        <Group gap="sm">
                            <IconPhone size={20} color="gray" />
                            <Text size="sm" c="dimmed">Teléfono:</Text>
                            <Text size="sm" fw={500}>{userData.phone}</Text>
                        </Group>

                        <Group gap="sm">
                            <IconMail size={20} color="gray" />
                            <Text size="sm" c="dimmed">Email:</Text>
                            <Text size="sm" fw={500}>{userData.email}</Text>
                        </Group>
                    </Stack>

                </Stack>
                    <Group justify="space-between" style={{ marginTop: '25px' }}>
                        <Button>Editar</Button><Button>Eliminar</Button><Button>Cancelar</Button>
                    </Group>
            </Paper>
        </Modal>
    );
}

export default ProfileStaffModal;