import { Modal, Button, Flex, Input } from '@mantine/core';

function Demo({ opened, close }: { opened: boolean; close: () => void }) {

    return (
            <Modal 
            opened={opened} 
            onClose={close} 
            title="Busca una persona" 
            yOffset='15vh'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <Flex direction="row" gap="md">
                    <Input type='number' placeholder="Buscar por dni" />
                    <Button onClick={close}>Cerrar</Button>
                </Flex>
            </Modal>
    );
}

export default Demo;