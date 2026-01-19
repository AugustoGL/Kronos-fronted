import { useMemo, useState } from 'react';
import { listSchools, type School } from '../services/mySchoolsServices';

export function useMyHours() {
  const [selectedSchool, setSelectedSchool] = useState<string>('todos');
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);
  const changeSchool = (abbreviation: string) => setSelectedSchool(abbreviation);

  // Memoizamos las escuelas, aunque son estáticas
  const schools: School[] = useMemo(() => listSchools, []);

  return {
    selectedSchool,
    modalOpened,
    openModal,
    closeModal,
    changeSchool,
    schools,
  };
}
