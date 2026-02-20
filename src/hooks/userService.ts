const BASE_URL = import.meta.env.VITE_API_URL;

export interface RegisterData {
  dni: number;
  email: string;
  first_name: string;
  last_name: string;
  url_picture?: string;
  gender: "Masculino" | "Femenino" | "Otro";
  password: string;
}

export const registerService = async (data: RegisterData): Promise<void> => {
  const response = await fetch(`${BASE_URL}/user/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al registrarse");
  }
};

export const verifyEmailService = async (email: string, code: string): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/user/verify-email?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`,
    { method: "POST" }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Código inválido o expirado");
  }
};

export const resendVerificationService = async (email: string): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/user/resend-verification?email=${encodeURIComponent(email)}`,
    { method: "POST" }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al reenviar el correo");
  }
};