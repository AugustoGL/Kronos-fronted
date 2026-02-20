const BASE_URL = import.meta.env.VITE_API_URL;

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export const loginService = async ({
  username,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  const body = new URLSearchParams({ username, password });

  const response = await fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail || "Error al iniciar sesión");
  }

  return response.json() as Promise<LoginResponse>;
};