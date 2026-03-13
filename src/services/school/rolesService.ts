import { fetchWithAuth } from "../fetchWithAuth";
import { setMyRoles } from "../../utils/schoolStorage";

type MyRolesResponse = Record<string, number[]>;

export const fetchAndStoreMyRoles = async (): Promise<void> => {
  const response = await fetchWithAuth("/user/me/myroles", { method: "GET" });
  if (!response.ok) {
    throw new Error("No se pudo obtener los roles");
  }
  const data: MyRolesResponse = await response.json();
  setMyRoles(data);
};