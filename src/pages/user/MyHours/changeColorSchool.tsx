import { Modal, Button, Avatar, Group, Text, Stack, Card, ColorInput } from '@mantine/core';
import classes from './Demo.module.css';

function ChangeSchoolModal({
    opened,
    onClose,
    schools,
}: {
    opened: boolean;
    onClose: () => void;
    schools: { id_school: number; school: string; color: string }[];
}) {

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Cambia el color de tu colegio"
            yOffset='15vh'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >

                <Stack>
                    {schools.map(school => (
                        <Card key={school.school} style={{ padding: 10 }} withBorder className={classes.card}>
                            <Group  justify="space-between" align="center">
                                <Group>
                                    <Avatar src={''} alt={school.school} size={32} />
                                    <Text truncate="end" tt={"capitalize"} style={{ maxWidth: '200px' }}>
                                        {school.school}
                                    </Text>
                                </Group>
                                    <ColorInput
                                        defaultValue={school.color}
                                        style={{ width: '30%' }}
                                        withEyeDropper={false}
                                        format="hex"
                                        swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                                    />
                            </Group>
                        </Card>
                    ))}
                </Stack>
            <Button
                mt="md"
                color="blue"
                onClick={onClose}
                fullWidth
            >
                Guardar
            </Button>
        </Modal>
    );
}

export default ChangeSchoolModal;