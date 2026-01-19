import { Modal, Avatar, Text, Stack, Group, Paper, TextInput, Textarea, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

function ContactStaffModal({ opened, close }: { opened: boolean; close: () => void }) {
    // Mock data for the recipient - replace with actual user data
    const recipientData = {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        avatar: null // URL to user's photo or null for initials
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            to: recipientData.email,
            subject: '',
            content: '',
        },
        validate: {
            subject: (value) => value.trim().length === 0 ? 'El asunto es requerido' : null,
            content: (value) => value.trim().length === 0 ? 'El contenido es requerido' : null,
        }
    });

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Enviar mensaje"
            yOffset='15vh'
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Paper p="lg" radius="md">
                {/* Recipient Information */}
                <Group gap="md" mb="xl">
                    <Avatar
                        src={recipientData.avatar}
                        size={60}
                        radius="50%"
                        color="blue"
                    >
                        {!recipientData.avatar && `${recipientData.firstName[0]}${recipientData.lastName[0]}`}
                    </Avatar>
                    
                    <Stack gap={4}>
                        <Text size="lg" fw={600}>
                            {recipientData.firstName} {recipientData.lastName}
                        </Text>
                        <Text size="sm" c="dimmed">
                            {recipientData.email}
                        </Text>
                    </Stack>
                </Group>

                {/* Email Form */}
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack gap="md">
                        <TextInput
                            label="Asunto"
                            placeholder="Ingrese el asunto del mensaje"
                            key={form.key('subject')}
                            {...form.getInputProps('subject')}
                        />
                        
                        <Textarea
                            label="Contenido"
                            placeholder="Escriba su mensaje aquí..."
                            rows={6}
                            key={form.key('content')}
                            {...form.getInputProps('content')}
                        />
                        
                        <Group justify="flex-end" mt="md">
                            <Button variant="outline" onClick={close}>
                                Cancelar
                            </Button>
                            <Button type="submit">
                                Enviar mensaje
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </Modal>
    );
}

export default ContactStaffModal;