import { useMemo } from 'react';
import { Flex, Button } from '@mantine/core';

import Modules from '../SchoolSettings/elementsModules';
import { ScheduleView } from '../../components/ScheduleModules/ScheduleViewUser';
import ChangeSchoolModal from './changeColorSchool';
import { useMyHours } from '../../hooks/useMyHours';

import {
  filterModulesBySchool,
} from '../../utils/myHoursUtils'; // ✅ Import util

function MyHours() {
  const {
    selectedSchool,
    changeSchool,
    modalOpened,
    openModal,
    closeModal,
    schools,
  } = useMyHours();

  // Filtrar módulos según el colegio seleccionado
  const filteredModules = useMemo(() => {
    return filterModulesBySchool(Modules, selectedSchool, schools);
  }, [selectedSchool, schools]);

  // Memoizamos los botones para evitar re-render innecesarios
  const schoolButtons = useMemo(() => {
    return schools.map((school) => (
      <Button
        key={school.id_school}
        tt="capitalize"
        variant={selectedSchool === school.abbreviation ? 'filled' : 'default'}
        onClick={() => changeSchool(school.abbreviation)}
      >
        {school.school}
      </Button>
    ));
  }, [schools, selectedSchool, changeSchool]);

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
        <Button color="red" style={{ alignSelf: 'left' }} >Tiempo ocupado</Button>
      </div>

      <Flex wrap="nowrap" style={{ overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ScheduleView modulos={filteredModules} listSchools={schools} />
        </div>
      </Flex>
    </div>
  );
}

export default MyHours;
