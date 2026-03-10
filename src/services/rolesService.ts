import { fetchWithAuth } from "./fetchWithAuth";
import { setMyRoles } from "../utils/schoolStorage";

type MyRolesResponse = Record<string, number[]>;

export const fetchAndStoreMyRoles = async (): Promise<void> => {
  console.log("llamando myroles...");  // agregá esto
  const response = await fetchWithAuth("/user/me/myroles", { method: "GET" });
  console.log("response status:", response.status);  // y esto
  if (!response.ok) {
    throw new Error("No se pudo obtener los roles");
  }
  const data: MyRolesResponse = await response.json();
  console.log("myroles:", data);
  setMyRoles(data);
};