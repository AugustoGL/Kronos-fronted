import { Modal, Button, Flex, TextInput } from '@mantine/core';

import { useForm } from '@mantine/form';


function CreateStaffModal({ opened, close, id }: { opened: boolean; close: () => void; id?: string }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            dni: '',
        },
        validate: {
            firstName: (value) => value.trim().length === 0 ? 'El nombre es requerido' : null,
            lastName: (value) => value.trim().length === 0 ? 'El apellido es requerido' : null,
            email: (value) => {
                if (!value) return 'El email es requerido';
                if (!/^\S+@\S+$/.test(value)) return 'Email inválido';
                return null;
            },
            dni: (value) => {
                if (!value) return 'El DNI es requerido';
                if (!/^\d{7,8}$/.test(value)) return 'El DNI debe tener 7 u 8 dígitos';
                return null;
            },
        }
    });


    return (
        <Modal
            opened={opened}
            onClose={close}
            title={id ? "Editar usuario" : "Crear nuevo usuario"}
            yOffset='15vh'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }} >

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Flex direction="column" gap="md">
                    <TextInput
                        placeholder="Ingrese el nombre"
                        key={form.key('firstName')}
                        {...form.getInputProps('firstName')}
                        withAsterisk
                    />
                    <TextInput
                        placeholder="Ingrese el apellido"
                        key={form.key('lastName')}
                        {...form.getInputProps('lastName')}
                        withAsterisk
                    />
                    <TextInput
                        placeholder="Ingrese el email"
                        type="email"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                        withAsterisk
                    />
                    <TextInput
                        placeholder="Ingrese el DNI"
                        maxLength={8}
                        key={form.key('dni')}
                        {...form.getInputProps('dni')}
                        withAsterisk
                    />
                    <Button
                        type="submit"
                        style={{ marginTop: '15px' }}>{id ? "Editar usuario" : "Crear usuario"}</Button>
                </Flex>
            </form>
        </Modal >
    );
}

export default CreateStaffModal;