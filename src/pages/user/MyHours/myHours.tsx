import { useMemo } from 'react';
import { Flex, Button, Loader, Alert } from '@mantine/core';
import { ScheduleView } from '../../../components/ScheduleModules/ScheduleViewUser';
import ChangeSchoolModal from './changeColorSchool';
import { useMyHours } from '../../../hooks/user/useMyHours';

function MyHours() {
  const {
    selectedSchool,
    changeSchool,
    modalOpened,
    openModal,
    closeModal,
    schools,
    schedule,
    loading,
    error,
  } = useMyHours();

  const schoolButtons = useMemo(() => {
    return schools.map((school) => (
      <Button
        key={school.id_school}
        tt="capitalize"
        variant={selectedSchool === String(school.id_school) ? 'filled' : 'default'}
        onClick={() => changeSchool(String(school.id_school))}
      >
        {school.school}
      </Button>
    ));
  }, [schools, selectedSchool, changeSchool]);

  if (loading) return <Loader color="yellow" />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <div className="contenedor-tabla">

      <ChangeSchoolModal
        opened={modalOpened}
        onClose={closeModal}
        schools={schools}
      />

      <div className="contenedor-tabla-filtros">
        <Button.Group>
          <Button
            variant={selectedSchool === 'todos' ? 'filled' : 'default'}
            onClick={() => changeSchool('todos')}
          >
            Todos
          </Button>
          {schoolButtons}
        </Button.Group>

        <Button onClick={openModal}>Editar colores</Button>
        <Button color="red">Tiempo ocupado</Button>
      </div>

      <Flex wrap="nowrap" style={{ overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ScheduleView schedule={schedule} />
        </div>
      </Flex>
    </div>
  );
}

export default MyHours;