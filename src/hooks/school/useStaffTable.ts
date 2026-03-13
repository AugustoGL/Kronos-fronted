import { useState, useMemo } from 'react';
import { useStaff } from './useStaff';
import {
  filterStaff,
  sortStaff,
  exportStaffToCSV,
} from '../../utils/staffUtils';

export type SortKey = 'first_name' | 'last_name';
export type SortOrder = 'asc' | 'desc';

interface SortConfig {
  key: SortKey | null;
  order: SortOrder | null;
}

export function useStaffTable() {

  const { staff, loading, error, refetch } = useStaff();

  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('todos');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });

  const allRoles = useMemo(() => {
    return Array.from(new Set(staff.map(e => e.rol)));
  }, [staff]);

  const filteredData = useMemo(() => {
    const filtered = filterStaff(staff, { nameFilter, roleFilter });
    if (sortConfig.key && sortConfig.order) {
      return sortStaff(filtered, { key: sortConfig.key, order: sortConfig.order });
    }
    return filtered;
  }, [staff, nameFilter, roleFilter, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { key, order: 'asc' };
    });
  };

  const handleExportData = () => {
    exportStaffToCSV(filteredData);
  };

  return {
    nameFilter,
    setNameFilter,
    roleFilter,
    setRoleFilter,
    allRoles,
    filteredData,
    sortConfig,
    handleSort,
    handleExportData,
    loading,
    error,
    refetch,
  };
}