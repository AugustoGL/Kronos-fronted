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
    Alert,
} from "@mantine/core";

import { IconBrandGoogle, IconAlertCircle } from '@tabler/icons-react';

import { Link, useNavigate } from "react-router-dom";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLogin } from "../../../hooks/user/useLogin";
import type { LoginCredentials } from "../../../services/authService";

export default function Login() {
    const navigate = useNavigate();
    const { login, loading, error } = useLogin();

    const [form, setForm] = useState<LoginCredentials>({
        username: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await login(form, {
            onSuccess: () => {
                navigate("/subject");
            },
        });
    };

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
                c="blue"
                p="lg"
                style={{ maxWidth: 400, width: "100%" }}
            >
                <Text ta="center" fw={500} size="lg" mb="lg">
                    ¡Bienvenido nuevamente!
                </Text>

                <Button
                    size="md"
                    variant="default"
                    fullWidth
                    leftSection={<IconBrandGoogle />}
                >
                    Continuar con Google
                </Button>

                <Divider my="lg" />

                <form onSubmit={handleSubmit}>
                    <Stack>
                        {error && (
                            <Alert
                                icon={<IconAlertCircle size={16} />}
                                color="red"
                                variant="light"
                            >
                                {error}
                            </Alert>
                        )}

                        <TextInput
                            size="md"
                            placeholder="Ingresa tu correo electrónico"
                            name="username"
                            type="email"          // 👈 esto valida formato email en el navegador
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <PasswordInput
                            size="md"
                            placeholder="Ingresa tu contraseña"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            size="md"
                            fullWidth
                            type="submit"
                            loading={loading}
                        >
                            Ingresar
                        </Button>

                        <Anchor
                            href="#"
                            underline="hover"
                            ta="center"
                            size="sm"
                        >
                            ¿Olvidaste tu contraseña?
                        </Anchor>
                    </Stack>
                </form>

                <Divider my="lg" />

                <Text ta="center" size="sm">
                    ¿Todavía no tienes una cuenta?
                    <Anchor component={Link} to="/register" ml={5}>
                        Registrate
                    </Anchor>
                </Text>
            </Card>
        </Flex>
    );
}