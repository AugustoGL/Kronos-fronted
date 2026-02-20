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
  PinInput,
} from "@mantine/core";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";

export default function Register() {
  const navigate = useNavigate();
  const { register, verifyEmail, resendVerification, loading, error, success, step } =
    useRegister();
  const [code, setCode] = useState("");

  const form = useForm({
    initialValues: {
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      nombre: (value) => (value.length < 2 ? "Nombre demasiado corto" : null),
      apellido: (value) => (value.length < 2 ? "Apellido demasiado corto" : null),
      dni: (value) => (/^\d{7,8}$/.test(value) ? null : "DNI inválido"),
      telefono: (value) => (/^\d{8,15}$/.test(value) ? null : "Teléfono inválido"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) => (value.length < 6 ? "Mínimo 6 caracteres" : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Las contraseñas no coinciden" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await register({
      dni: values.dni,
      email: values.email,
      first_name: values.nombre,
      last_name: values.apellido,
      password: values.password,
    });
  };

  const handleVerify = async () => {
    await verifyEmail(code);
  };

  // Si la verificación fue exitosa redirigimos al login
  const isVerified = step === "verify" && success?.includes("verificada");

  return (
    <Flex h="90vh" w="100vw" justify="center" align="center">
      <Card
        withBorder
        shadow="sm"
        radius="md"
        p="lg"
        style={{ maxWidth: 400, width: "100%", maxHeight: "90vh", overflowY: "auto" }}
      >
        <Text ta="center" fw={500} size="lg" mb="lg">
          {step === "form" ? "Crear cuenta" : "Verificá tu correo"}
        </Text>

        {/* STEP 1: Formulario de registro */}
        {step === "form" && (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              {error && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                  {error}
                </Alert>
              )}

              <TextInput label="Nombre" placeholder="Tu nombre" {...form.getInputProps("nombre")} />
              <TextInput label="Apellido" placeholder="Tu apellido" {...form.getInputProps("apellido")} />
              <TextInput label="DNI" placeholder="12345678" {...form.getInputProps("dni")} />
              <TextInput label="Teléfono" placeholder="Ej: 1134567890" {...form.getInputProps("telefono")} />
              <TextInput label="Email" placeholder="correo@ejemplo.com" {...form.getInputProps("email")} />
              <PasswordInput label="Contraseña" placeholder="********" {...form.getInputProps("password")} />
              <PasswordInput label="Confirmar contraseña" placeholder="********" {...form.getInputProps("confirmPassword")} />

              <Button type="submit" size="md" fullWidth loading={loading}>
                Registrarme
              </Button>
            </Stack>
          </form>
        )}

        {/* STEP 2: Verificación de código */}
        {step === "verify" && (
          <Stack align="center">
            {success && !isVerified && (
              <Alert icon={<IconCircleCheck size={16} />} color="green" variant="light" w="100%">
                {success}
              </Alert>
            )}

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" w="100%">
                {error}
              </Alert>
            )}

            {isVerified ? (
              <>
                <Alert icon={<IconCircleCheck size={16} />} color="green" variant="light" w="100%">
                  {success}
                </Alert>
                <Button fullWidth mt="sm" onClick={() => navigate("/")}>
                  Ir al inicio de sesión
                </Button>
              </>
            ) : (
              <>
                <PinInput
                  length={6}
                  type="number"
                  value={code}
                  onChange={setCode}
                  size="md"
                />

                <Button fullWidth loading={loading} onClick={handleVerify} disabled={code.length < 6}>
                  Verificar cuenta
                </Button>

                <Anchor size="sm" onClick={resendVerification} style={{ cursor: "pointer" }}>
                  ¿No te llegó el correo? Reenviar
                </Anchor>
              </>
            )}
          </Stack>
        )}

        <Divider my="lg" />

        <Text ta="center" size="sm">
          ¿Ya tenés una cuenta?
          <Anchor component={Link} to="/" ml={5}>
            Ingresar
          </Anchor>
        </Text>
      </Card>
    </Flex>
  );
}