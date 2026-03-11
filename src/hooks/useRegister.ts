import { useState } from "react";
import {
  registerService,
  verifyEmailService,
  resendVerificationService,
} from "../services/userService";

interface UseRegisterReturn {
  register: (data: {
    dni: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
  step: "form" | "verify";
  email: string;
}

export const useRegister = (): UseRegisterReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "verify">("form");
  const [email, setEmail] = useState("");

  const register = async (data: {
    dni: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      await registerService({
        ...data,
        dni: Number(data.dni),
        gender: "Masculino", // ajustá si agregás campo gender al form
      });
      setEmail(data.email);
      setStep("verify");
      setSuccess("Te enviamos un código a tu correo. Ingresalo para verificar tu cuenta.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await verifyEmailService(email, code);
      setSuccess("¡Cuenta verificada! Ya podés iniciar sesión.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await resendVerificationService(email);
      setSuccess("Te reenviamos el código. Revisá tu correo.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { register, verifyEmail, resendVerification, loading, error, success, step, email };
};