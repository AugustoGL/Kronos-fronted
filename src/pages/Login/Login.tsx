import {
    Card,
    Text,
    Button,
    Stack,
    Anchor,
    Divider,
    TextInput,
    PasswordInput,
    Flex,
} from "@mantine/core";

import { IconBrandGoogle } from '@tabler/icons-react';

import { Link } from "react-router-dom";

export default function Login() {
    return (
        <Flex
            style={{ height: "90vh", width: "100vw" }}
            justify="center"
            align="center"
        >
            <Card
                withBorder
                shadow="sm"
                radius="md"
                c={'blue'}
                
                p="lg"
                style={{ maxWidth: 400, width: "100%" }}
            >
                {/* Logo */}


                {/* Welcome */}
                <Text
                    ta="center"
                    fw={500}
                    size="lg"
                    mb="lg"
                >
                    ¡Bienvenido nuevamente!
                </Text>
                {/* Google */}
                <Button
                    size="md"
                    variant="default"
                    fullWidth
                    leftSection={
                        <IconBrandGoogle />
                    }
                >
                    Continuar con Google
                </Button>

                <Divider my="lg" />

                {/* Login form (opcional si querés login por email directo) */}
                <Stack>
                    <TextInput size="md" placeholder="Ingresa tu correo electronico" />
                    <PasswordInput size="md" placeholder="Ingresa tu contraseña" />
                    <Button
                        size="md"
                        component={Link}
                        to="/subject"
                        fullWidth
                    >                        Ingresar
                    </Button>
                    <Anchor
                        href="https://mantine.dev/" target="_blank" underline="hover"
                        ta="center" size="sm" 
                    >
                        ¿Olvidaste tu contraseña?
                    </Anchor>

                </Stack>
                <Divider my="lg" />
                <Text ta="center" size="sm" 
                >
                    ¿Todavía no tienes una cuenta?
                    <Anchor href="/signup" ml={5}>
                        Registrate
                    </Anchor>
                </Text>
            </Card>
        </Flex>
    );
}
