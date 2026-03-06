const BASE_URL = import.meta.env.VITE_API_URL;

const refreshAccessToken = async (): Promise<string | null> => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;

  const response = await fetch(
    `${BASE_URL}/auth/refresh?refresh_token=${refresh_token}`,
    { method: "POST" }
  );

  if (!response.ok) return null;

  const data = await response.json();

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);

  return data.access_token;
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem("access_token");

  const authOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, authOptions);

  // Si el token expiró, intentamos refrescarlo
  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    // Si el refresh también falló, cerramos sesión
    if (!newToken) {
      logout();
      return response;
    }

    // Reintentamos la petición original con el nuevo token
    return fetch(`${BASE_URL}${endpoint}`, {
      ...authOptions,
      headers: {
        ...authOptions.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return response;
};