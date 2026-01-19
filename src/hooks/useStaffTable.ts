import { useState, useMemo } from 'react';
import { listStaff } from '../services/staffServices';
import {
  filterStaff,
  sortStaff,
  exportStaffToCSV,
} from '../utils/staffUtils';

export type SortKey = 'first_name' | 'last_name';
export type SortOrder = 'asc' | 'desc';

interface SortConfig {
  key: SortKey | null;
  order: SortOrder | null;
}

export function useStaffTable() {

  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('todos');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });

  const allRoles = useMemo(() => {
    return Array.from(new Set(listStaff.map(e => e.rol)));
  }, []);

  const filteredData = useMemo(() => {
    const filtered = filterStaff(listStaff, { nameFilter, roleFilter });
    if (sortConfig.key && sortConfig.order) {
      return sortStaff(filtered, { key: sortConfig.key, order: sortConfig.order });
    }
    return filtered;
  }, [nameFilter, roleFilter, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        const newOrder = prev.order === 'asc' ? 'desc' : 'asc';
        return { key, order: newOrder };
      } else {
        return { key, order: 'asc' };
      }
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
    handleExportData
  };
}