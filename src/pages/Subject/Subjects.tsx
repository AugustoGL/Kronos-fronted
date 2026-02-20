
//Mantine
import { Table, Input, ActionIcon, TagsInput, Group, Tooltip, Loader, Alert } from '@mantine/core';
import { IconPlus, IconDownload, IconSignature, IconTrash, IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

//Modals
import CreateSubjectModal from './Modals/CreateSubjectModal';
import AsignSubjectModal from './Modals/AsignSubjectModal';
import DeleteSubjectModal from '../../components/Modals/DeleteModal';

//Componentes
import SortableHeader from '../../components/SorteableHeader/SorteableHeader';

//Hooks
import { useSubjectsTable } from '../../hooks/useSubjectTable';

import { useState } from 'react';


function SubjectsPage() {

    const {
        subjectFilter,
        setSubjectFilter,
        teacherFilter,
        setTeacherFilter,
        courseFilter,
        setCourseFilter,
        sortConfig,
        handleSort,
        handleExportData,
        allCourses,
        filteredData,
        loading, 
        error,
        refetch 
    } = useSubjectsTable();


    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
    const [assignOpened, { open: openAssign, close: closeAssign }] = useDisclosure(false);
    const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [subjectToEdit, setSubjectToEdit] = useState<any | null>(null);
    const [subjectToDelete, setSubjectToDelete] = useState<any | null>(null);


    const rows = filteredData.map((element) => (
        <Table.Tr key={element.id_subject}>
            <Table.Td>{element.subject}</Table.Td>
            <Table.Td>{element.course}</Table.Td>
            <Table.Td>{element.teacher}</Table.Td>
            <Table.Td>{element.hoursWeek}</Table.Td>
            <Table.Td>{element.abbreviation}</Table.Td>
            <Table.Td>
                <div
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: element.color,
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
            </Table.Td>
            <Table.Td>
                <Group gap={20}>
                    <ActionIcon
                        size='lg'
                        variant="light"
                        color="blue"
                        aria-label="Editar curso"
                        onClick={() => {
                            setSubjectToEdit(element.id_subject);
                            openAssign();
                        }}
                    >
                        <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon
                        size='lg'
                        variant="light"
                        color="red"
                        aria-label="Eliminar curso"
                        onClick={() => {
                            setSubjectToDelete(element);
                            openDelete();
                        }}
                    >
                        <IconTrash size={18} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    if (loading) return <Loader color="yellow" />;
    if (error) return <Alert color="red">{error}</Alert>;

    return (
        <div className='contenedor-tabla'>

            <CreateSubjectModal opened={createOpened} close={closeCreate} />

            <AsignSubjectModal
            opened={assignOpened}
            close={closeAssign}
            id={subjectToEdit}
            onSuccess={refetch}   // 👈 esto recarga la tabla al asignar
            />
            <DeleteSubjectModal
                opened={deleteOpened}
                close={closeDelete}
                msg={subjectToDelete ? `${subjectToDelete.subject} de ${subjectToDelete.course}` : ""}
                onDelete={() => {
                    closeDelete();
                    setSubjectToDelete(false);
                }} />
            <div className="contenedor-tabla-filtros">
                <Input
                    style={{ width: '250px' }}
                    placeholder="Filtrar materia..."
                    value={subjectFilter}
                    onChange={(event) => setSubjectFilter(event.currentTarget.value)}
                />
                <Input
                    style={{ width: '250px' }}
                    placeholder="Filtrar profesor..."
                    value={teacherFilter}
                    onChange={(event) => setTeacherFilter(event.currentTarget.value)}
                />
                <TagsInput
                    style={{ width: '325px' }}
                    maxTags={3}
                    placeholder="Filtrar cursos..."
                    value={courseFilter}
                    onChange={setCourseFilter}
                    data={allCourses}
                    clearable
                />
                <Tooltip
                    label="Asignar materia"
                    color="gray"
                    transitionProps={{ transition: 'pop', duration: 150 }}
                >
                    <ActionIcon
                        variant="filled"
                        size='lg'
                        aria-label="Asignar materia"
                        onClick={() => {
                            setSubjectToEdit(null);
                            openAssign();
                        }}
                    >
                        <IconSignature style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip
                    label="Crear materia"
                    color="gray"
                    transitionProps={{ transition: 'pop', duration: 150 }}
                >
                <ActionIcon
                    variant="filled"
                    size='lg'
                    aria-label="Agregar materia"
                    onClick={openCreate}
                >
                    <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>

                <Tooltip
                    label="Descarga tabla"
                    color="gray"
                    transitionProps={{ transition: 'pop', duration: 150 }}
                >
                <ActionIcon
                    variant="filled"
                    size='lg'
                    aria-label="Exportar datos"
                    onClick={handleExportData}
                >
                    <IconDownload style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>

            </div>

            <Table.ScrollContainer minWidth={500}>
                <Table withTableBorder verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <SortableHeader
                                    label="Materia"
                                    columnKey="subject"
                                    activeKey={sortConfig.key}
                                    order={sortConfig.order}
                                    onSort={() => handleSort('subject')}
                                />
                            </Table.Th>
                            <Table.Th>
                                <SortableHeader
                                    label="Curso"
                                    columnKey="course"
                                    activeKey={sortConfig.key}
                                    order={sortConfig.order}
                                    onSort={() => handleSort('course')}
                                />
                            </Table.Th>
                            <Table.Th>Profesor</Table.Th>
                            <Table.Th>Horas/Semana</Table.Th>
                            <Table.Th>Abreviatura</Table.Th>
                            <Table.Th>Color</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </div>
    );
}

export default SubjectsPage;