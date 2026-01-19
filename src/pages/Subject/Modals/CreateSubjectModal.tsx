import { Modal, Button, Flex, TextInput, ColorInput } from '@mantine/core';

import { useForm } from '@mantine/form';


function CreateSubjectModal({ opened, close }: { opened: boolean; close: () => void }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            subject: '',
            abreviation: '',
            color: '#FFFFFF',
        },
                validate: {
            subject: (value) => value.trim().length === 0 ? 'El nombre de la materia es requerido' : null,
            abreviation: (value) => value.trim().length === 0 ? 'La abreviación es requerida' : null,
            color: (value) => !value ? 'Debe seleccionar un color' : null,
        }
    });


    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Crear nueva materia"
            yOffset='15vh'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }} >

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Flex direction="column" gap="md">
                    <TextInput
                        placeholder="Nombre de la materia"
                        key={form.key('subject')}
                        {...form.getInputProps('subject')}
                    />
                    <TextInput
                        placeholder="Abreviación de la materia"
                        maxLength={5}
                        key={form.key('abreviation')}
                        {...form.getInputProps('abreviation')}
                    />
                    <ColorInput
                        placeholder="Color de la materia"
                        key={form.key('color')}
                        {...form.getInputProps('color')}
                        swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                    />
                    <Button
                        type="submit"
                        style={{ marginTop: '15px' }}>Asignar materia</Button>
                </Flex>
            </form>
        </Modal >
    );
}

export default CreateSubjectModal;