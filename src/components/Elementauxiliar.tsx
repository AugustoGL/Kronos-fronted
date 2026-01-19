import { Table, Text } from "@mantine/core";

interface NoDisponibleProps {
  inicio: string;
  fin: string;
  duracion: number;        // en minutos
  altoPorMinuto: number;   // px por minuto
}

export const BloqueNoDisponible = ({
  inicio,
  fin,
  duracion,
  altoPorMinuto,
}: NoDisponibleProps) => {
  const color = "#FF0000";

  return (
    <Table.Td
      className="espacioFinalHover"
      style={{
        height: duracion * altoPorMinuto,
        textAlign: "center",
        userSelect: "none",
        backgroundColor: `${color}55`,   // rojo con transparencia
        border: `2px solid ${color}`,
      }}
    >
      <Text
        size="sm"
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5px 0",
        }}
      >
        Tiempo No disponible
      </Text>

      <Text size="sm" style={{ color: "white", padding: "2.5px 0" }}>
        {inicio} - {fin}
      </Text>
    </Table.Td>
  );
};

export default BloqueNoDisponible