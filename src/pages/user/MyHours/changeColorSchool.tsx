import { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Avatar, Group, Text, Stack, Card, ColorInput, Alert } from '@mantine/core';
import { updateMyStaffColorsService, type StaffColor } from '../../../services/user/mySchoolsServices';
import { getMyRoles } from '../../../utils/schoolStorage';
import classes from './Demo.module.css';

function ChangeSchoolModal({
  opened,
  onClose,
  staffColors,
  onSaved,
}: {
  opened: boolean;
  onClose: () => void;
  staffColors: StaffColor[];
  onSaved: () => void;
}) {
  const [colors, setColors] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Solo colegios donde el usuario es Profesor
  const filteredStaffColors = useMemo(() => {
    let profesorIds: number[] = [];
    try {
      const roles = getMyRoles();
      profesorIds = roles['Profesor'] ?? [];
    } catch (_) {}
    return staffColors.filter((s) => profesorIds.includes(s.id_school));
  }, [staffColors]);

  useEffect(() => {
    if (opened) {
      const initial: Record<number, string> = {};
      filteredStaffColors.forEach((s) => { initial[s.id_staff] = s.color_school; });
      setColors(initial);
      setError(null);
    }
  }, [opened, filteredStaffColors]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = filteredStaffColors.map((s) => ({
        id_staff: s.id_staff,
        color: colors[s.id_staff] ?? s.color_school,
      }));
      await updateMyStaffColorsService(payload);
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar color de colegios"
      yOffset="15vh"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      {error && <Alert color="red" mb="md">{error}</Alert>}
      <Stack>
        {filteredStaffColors.map((school) => (
          <Card key={school.id_staff} style={{ padding: 10 }} withBorder className={classes.card}>
            <Group justify="space-between" align="center">
              <Group>
                <Avatar
                  src={''}
                  alt={school.school_name}
                  size={32}
                  color="initials"
                  name={school.school_abbreviation}
                />
                <Text truncate="end" tt="capitalize" style={{ maxWidth: 200 }}>
                  {school.school_name}
                </Text>
              </Group>
              <ColorInput
                value={colors[school.id_staff] ?? school.color_school}
                onChange={(val) => setColors((prev) => ({ ...prev, [school.id_staff]: val }))}
                style={{ width: '30%' }}
                withEyeDropper={false}
                format="hex"
                swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
              />
            </Group>
          </Card>
        ))}
      </Stack>
      <Button mt="md" color="blue" onClick={handleSave} loading={loading} fullWidth>
        Guardar
      </Button>
    </Modal>
  );
}

export default ChangeSchoolModal;