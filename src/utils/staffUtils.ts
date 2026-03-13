import { type Staff } from '../services/school/staffService';
import { normalizeText } from '../utils/utils';

export function filterStaff(
  data: Staff[],
  filters: { nameFilter: string; roleFilter: string }
) {
  const name = normalizeText(filters.nameFilter);

  return data.filter(e =>
    (
      normalizeText(e.first_name).includes(name) ||
      normalizeText(e.last_name).includes(name)
    ) &&
    (filters.roleFilter === 'todos' || e.rol.includes(filters.roleFilter))
  );
}

export function sortStaff(
  data: Staff[],
  sortConfig: { key: 'first_name' | 'last_name'; order: 'asc' | 'desc' }
) {
  if (!sortConfig.key || !sortConfig.order) return data;

  return [...data].sort((a, b) => {
    const aVal = normalizeText(a[sortConfig.key]);
    const bVal = normalizeText(b[sortConfig.key]);
    return sortConfig.order === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });
}

export function exportStaffToCSV(data: Staff[]) {
  const csvData = [
    ['Nombre', 'Apellido', 'Documento', 'Teléfono', 'Email', 'Horas Cátedra'],
    ...data.map(item => [
      item.first_name,
      item.last_name,
      item.document,
      item.phone,
      item.email,
      item.hoursTeaching?.toString() ?? ''
    ])
  ];

  const csvContent = csvData.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'personal.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}