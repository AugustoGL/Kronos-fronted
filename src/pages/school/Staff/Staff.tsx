
//Mantine
import { Table, Input, ActionIcon, Button } from '@mantine/core';
import { IconPlus, IconDownload } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

//Modals
import ProfileStaffModal from './Modals/ProfileStaffModal';
import SearchStaffModal from './Modals/SearchStaffModal';

//Hooks
import { useStaffTable } from '../../../hooks/school/useStaffTable';

//Componentes
import SortableHeader from '../../../components/SorteableHeader/SorteableHeader';

function StaffPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    nameFilter,
    setNameFilter,
    roleFilter,
    setRoleFilter,
    allRoles,
    filteredData,
    sortConfig,
    handleSort,
    handleExportData
  } = useStaffTable();

  const rows = filteredData.map((element) => (
    <Table.Tr key={element.id_user}>
      <Table.Td>{element.first_name}</Table.Td>
      <Table.Td>{element.last_name}</Table.Td>
      <Table.Td>{element.document}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.hoursTeaching}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className='contenedor-tabla'>
      <SearchStaffModal opened={opened} close={close} />
      <div className="contenedor-tabla-filtros">
        <Button.Group>
          <Button
            variant={roleFilter === 'todos' ? "filled" : "default"}
            onClick={() => setRoleFilter('todos')}
          >
            Todos
          </Button>
          {allRoles.map(role => (
            <Button
              key={role}
              variant={roleFilter === role ? "filled" : "default"}
              onClick={() => setRoleFilter(role)}
            >
              {role}
            </Button>
          ))}
        </Button.Group>
        <Input
          style={{ width: '300px' }}
          placeholder="Filtrar por nombre..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.currentTarget.value)}
        />
        <ActionIcon
          variant="filled"
          size='lg'
          aria-label="Agregar personal"
          onClick={open}
        >
          <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="filled"
          size='lg'
          aria-label="Exportar datos"
          onClick={handleExportData}
        >
          <IconDownload style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </div>

      <Table.ScrollContainer minWidth={500}>
        <Table withTableBorder verticalSpacing="sm" style={{ minWidth: '700px' }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <SortableHeader
                  label="Nombre"
                  columnKey="first_name"
                  activeKey={sortConfig.key}
                  order={sortConfig.order}
                  onSort={() => handleSort('first_name')}
                />
              </Table.Th>
              <Table.Th>
                <SortableHeader
                  label="Apellido"
                  columnKey="last_name"
                  activeKey={sortConfig.key}
                  order={sortConfig.order}
                  onSort={() => handleSort('last_name')}
                />
              </Table.Th>
              <Table.Th>Documento</Table.Th>
              <Table.Th>Teléfono</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Horas Cátedra</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}

export default StaffPage;
