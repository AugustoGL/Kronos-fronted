import { Modal, Button, Flex, TextInput, FileButton, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState, useRef } from 'react';

function ModalEditSchool({ opened, close, colegio, onSave }: {
    opened: boolean;
    close: () => void;
    colegio: {
        nombre: string;
        abreviacion: string;
        email: string;
        logo: string;
    };
    onSave: (values: { nombre: string; abreviacion: string; email: string; logo: string }) => void;
}) {
    const [file, setFile] = useState<File | null>(colegio.logo ? new File([], colegio.logo) : null);
    const resetRef = useRef<() => void>(null);

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            nombre: colegio.nombre,
            abreviacion: colegio.abreviacion,
            email: colegio.email,
            logo: colegio.logo,
        },
        validate: {
            nombre: (value) => value.trim().length === 0 ? 'El nombre es requerido' : null,
            abreviacion: (value) => value.trim().length === 0 ? 'La abreviación es requerida' : null,
            email: (value) => {
                if (!value) return 'El email es requerido';
                if (!/^\S+@\S+\.\S+$/.test(value)) return 'Email inválido';
                return null;
            },
        }
    });

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Editar información del colegio"
            yOffset='15vh'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
<form onSubmit={form.onSubmit((values) => onSave(values))}>
                <Flex direction="column" gap="md">
                        <TextInput
                            placeholder="Nombre del colegio"
                            key={form.key('nombre')}
                            {...form.getInputProps('nombre')}
                            withAsterisk
                        />
                        <TextInput
                            placeholder="Abreviación"
                            key={form.key('abreviacion')}
                            {...form.getInputProps('abreviacion')}
                            withAsterisk
                        />
                    <TextInput
                        placeholder="Email"
                        type="email"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                        withAsterisk
                    />
      <Group justify="center">
        <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props} style={{ flexGrow: 1 }}>Subir imagen</Button>}
        </FileButton>
        <Button style={{ flexGrow: 1 }} disabled={!file} color="red" onClick={clearFile}>
          Borrar imagen
        </Button>
      </Group>

      {file && (
        <Text size="sm" ta="left" style={{ display: 'flex', alignItems: 'center', gap: 4, paddingInline: 10 }}>
            <span style={{ fontWeight: 'bolder' }}>Archivo:</span>
            <Text truncate='start' >
                {file.webkitRelativePath || file.name}
            </Text>
        </Text>
      )}
                    <Button type="submit" style={{ marginTop: '15px' }}>
                        Guardar cambios
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}

export default ModalEditSchool;