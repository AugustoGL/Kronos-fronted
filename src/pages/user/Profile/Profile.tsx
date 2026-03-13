import { Text, Flex, Stack, Card, Group, Avatar } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

function MyHours() {

    return (
        <Stack gap={30} align="center" className='contenedor-simple'>

            <Text style={{ paddingTop: '30px' }} size="xl">Información personal</Text>

            <Card shadow="sm" style={{ width: '90%', maxWidth: '500px', padding: 0, overflow: 'visible' }}>
                <Text size="xl" style={{ paddingBlock: '15px', paddingInline: 'var(--mantine-spacing-md)' }}>Información básica</Text>
                <div className='division_carta'>
                    <Group justify="space-between" wrap="wrap">
                        <Text size="md" c={'dimmed'}>Foto de perfil </Text>
                        <Avatar size={50} name={'Juan Perez'} color="initials" />
                    </Group>
                </div>
                <div className='division_carta'>
                    <Flex direction="column" gap="sm">
                        <Flex justify="space-between" align="center" wrap="wrap">
                            <Text size="md" c={'dimmed'} style={{ minWidth: '120px' }}>Nombre</Text>
                            <Text size="md" tt='capitalize' truncate="end" style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                                Augusto
                            </Text>
                        </Flex>
                        <Flex justify="space-between" align="center" wrap="wrap">
                            <Text size="md" c={'dimmed'} style={{ minWidth: '120px' }}>Apellido</Text>
                            <Text size="md" tt='capitalize' truncate="end" style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                                Ga asdasdasdasasdasdasdasdasdasddasdsa
                            </Text>
                        </Flex>
                        <Flex justify="space-between" align="center" wrap="wrap">
                            <Text size="md" c={'dimmed'} style={{ minWidth: '120px' }}>Documento</Text>
                            <Text size="md" truncate="end" style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                                46311796
                            </Text>
                        </Flex>
                    </Flex>
                </div>
            </Card>

            <Card shadow="sm" style={{ width: '90%', maxWidth: '500px', padding: 0, overflow: 'visible' }}>
                <Text size="xl" style={{ paddingBlock: '15px', paddingInline: 'var(--mantine-spacing-md)' }}>Información de contacto</Text>
                <div className='division_carta'>
                    <Flex justify="space-between" align="center" wrap="wrap">
                        <Text size="md" c={'dimmed'} style={{ minWidth: '120px' }}>Email</Text>
                        <Text size="sm" truncate="end" style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                            augustoguasdasdadasdasdasdaschealezama@example.com
                        </Text>
                    </Flex>
                </div>
                <div className='division_carta'>
                    <Flex justify="space-between" align="center" wrap="wrap">
                        <Text size="md" c={'dimmed'} style={{ minWidth: '120px' }}>Teléfono</Text>
                        <Text size="md" truncate="end" style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                            +54 3512291968
                        </Text>
                    </Flex>
                </div>
            </Card>

            <Card shadow="sm" style={{ width: '90%', maxWidth: '500px', padding: 0, overflow: 'visible' }}>
                <Text size="xl" style={{ paddingBlock: '15px', paddingInline: 'var(--mantine-spacing-md)' }}>Acciones</Text>
                <div className='division_carta'>
                    <Flex justify="space-between" align="center" wrap="wrap">
                        <Text size="md" c={'dimmed'} style={{ minWidth: '120px' }}>Cambiar contraseña</Text>
                        <IconChevronRight size={20} />
                    </Flex>
                </div>
            </Card>
        </Stack>
    );
}

export default MyHours;