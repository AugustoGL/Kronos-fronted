import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, type LoginCredentials, type LoginResponse } from "../services/authService";
import { fetchWithAuth } from "../services/fetchWithAuth";
import { fetchAndStoreMyRoles } from "../services/rolesService";
import { clearMyRoles } from "../utils/schoolStorage";

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
}

interface UseLoginReturn {
  login: (credentials: LoginCredentials, options?: UseLoginOptions) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (
    credentials: LoginCredentials,
    { onSuccess }: UseLoginOptions = {}
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      console.log("iniciando login...");
      const data = await loginService(credentials);
      console.log("login ok, guardando tokens...");

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      console.log("tokens guardados, llamando fetchAndStoreMyRoles...");
      await fetchAndStoreMyRoles();
      console.log("fetchAndStoreMyRoles terminó");

      onSuccess?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetchWithAuth("/auth/logout", { method: "POST" });
    } catch (_) {
      // Si falla igual limpiamos local
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      clearMyRoles();
      navigate("/");
    }
  };

  return { login, logout, loading, error };
};