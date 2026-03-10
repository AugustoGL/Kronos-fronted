import { Table, Group, Flex, Avatar, Text, ActionIcon, Button, Loader, Center } from '@mantine/core';
import { IconAdjustments, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';

import { ScheduleView } from '../../components/ScheduleModules/ScheduleViewSchool';

//Modal
import ModalEditSchool from './Modals/EditSchoolModal';
import ModalModifyCourses from './Modals/EditCoursesModal';
import DeleteCourseModal from '../../components/Modals/DeleteModal';
import CreateCourseModal from './Modals/CreateCourseModal';
import CreateEditModuleModal from './Modals/CEModuleModal';
import CreateYearModal from './Modals/CreateYearModal';
import DeleteYearModal from './Modals/DeleteYearModal';

import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useCourse } from '../../hooks/useCourse';
import { useModules } from '../../hooks/useModules';

function SchoolSettings() {

    const { courses, loading, deleteCourse, refetch } = useCourse();
    const { modulos, refetch: refetchModules } = useModules();

    const [modalEditSchoolOpened, setModalEditSchoolOpened] = useState(false);
    const [modalModifyCoursesOpened, setModalModifyCoursesOpened] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<{ id_course: number; name: string; id_year: number } | null>(null);
    const [modalCreateCourseOpened, setModalCreateCourseOpened] = useState(false);
    const [modalCreateModuleOpened, setModalCreateModuleOpened] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState<string | undefined>(undefined);
    const [deleteCourseOpened, { open: openDeleteCourse, close: closeDeleteCourse }] = useDisclosure(false);
    const [courseToDelete, setCourseToDelete] = useState<{ id_course: number; name: string } | null>(null);

    const [modalCreateYearOpened, setModalCreateYearOpened] = useState(false);
    const [modalDeleteYearOpened, setModalDeleteYearOpened] = useState(false);

    const colegio = {
        nombre: 'Colegio San Martín',
        abreviacion: 'CSM',
        email: 'info@sanmartin.edu.ar',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_Icon_Logo.png',
    };

    const rowsCourses = courses.map((element) => (
        <Table.Tr key={element.id_course}>
            <Table.Td>{element.full_name}</Table.Td>
            <Table.Td>
                <Group gap={10}>
                    <ActionIcon
                        variant="light"
                        color="blue"
                        aria-label="Editar curso"
                        onClick={() => {
                            setSelectedCourse(element);
                            setModalModifyCoursesOpened(true);
                        }}
                    >
                        <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon
                        variant="light"
                        color="red"
                        aria-label="Eliminar curso"
                        onClick={() => {
                            setCourseToDelete(element);
                            openDeleteCourse();
                        }}
                    >
                        <IconTrash size={18} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className='contenedor-tabla'>

            <DeleteYearModal
                opened={modalDeleteYearOpened}
                onClose={() => setModalDeleteYearOpened(false)}
            />

            <CreateYearModal
                opened={modalCreateYearOpened}
                onClose={() => setModalCreateYearOpened(false)}
            />

            <CreateEditModuleModal
                opened={modalCreateModuleOpened}
                close={() => {
                    setModalCreateModuleOpened(false);
                    setTimeout(() => setSelectedModuleId(undefined), 300);
                    refetchModules();
                }}
                id={selectedModuleId}
            />

            <CreateCourseModal
                opened={modalCreateCourseOpened}
                onClose={() => {
                    setModalCreateCourseOpened(false);
                    refetch();
                }}
            />

            <ModalEditSchool
                opened={modalEditSchoolOpened}
                close={() => setModalEditSchoolOpened(false)}
                colegio={colegio}
                onSave={(values) => {
                    console.log('Guardar cambios:', values);
                    setModalEditSchoolOpened(false);
                }}
            />

            <ModalModifyCourses
                opened={modalModifyCoursesOpened}
                close={() => {
                    setModalModifyCoursesOpened(false);
                    refetch();
                }}
                courseId={selectedCourse?.id_course}
                initialCourse={selectedCourse?.name}
                initialYearId={selectedCourse?.id_year}
            />

            <DeleteCourseModal
                opened={deleteCourseOpened}
                close={closeDeleteCourse}
                msg={courseToDelete ? `${courseToDelete.name}` : ""}
                onDelete={async () => {
                    if (courseToDelete) {
                        await deleteCourse(courseToDelete.id_course);
                    }
                    closeDeleteCourse();
                    setCourseToDelete(null);
                }}
            />

            <Group justify='space-between'>
                <Group gap={25}>
                    <Avatar src={colegio.logo} size={64} radius="md" />
                    <Text size="xl" fw={700}>
                        {colegio.nombre} <Text span c="dimmed" size="md">({colegio.abreviacion})</Text>
                        <Text size="sm" c="dimmed">{colegio.email}</Text>
                    </Text>
                    <ActionIcon variant="filled" size="lg" aria-label="Settings" style={{ marginLeft: 25 }}
                        onClick={() => setModalEditSchoolOpened(true)}>
                        <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
                <Group gap={15}>
                    <Button onClick={() => setModalCreateYearOpened(true)}>Añadir año</Button>
                    <Button color='red' onClick={() => setModalDeleteYearOpened(true)}>Eliminar año</Button>
                </Group>
            </Group>

            <Flex wrap="nowrap" style={{ marginTop: 25, width: '100%', gap: 25, overflow: 'hidden' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Group gap={50} className='subtitulos-configuracion'>
                        <Text size="md">Horarios del colegio</Text>
                        <ActionIcon variant="filled" aria-label="Settings"
                            onClick={() => {
                                setSelectedModuleId(undefined);
                                setModalCreateModuleOpened(true);
                            }}>
                            <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                    <ScheduleView
                        modulos={modulos}
                        onModuleClick={(id: string) => {
                            setSelectedModuleId(id);
                            setModalCreateModuleOpened(true);
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Group gap={50} className='subtitulos-configuracion'>
                        <Text size="md">Cursos</Text>
                        <ActionIcon variant="filled" aria-label="Settings"
                            onClick={() => setModalCreateCourseOpened(true)}>
                            <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>

                    {loading ? (
                        <Center h={100}><Loader /></Center>
                    ) : (
                        <Table.ScrollContainer minWidth='250'>
                            <Table withTableBorder withColumnBorders>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>División</Table.Th>
                                        <Table.Th>Curso</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{rowsCourses}</Table.Tbody>
                            </Table>
                        </Table.ScrollContainer>
                    )}
                </div>
            </Flex>
        </div>
    );
}

export default SchoolSettings;