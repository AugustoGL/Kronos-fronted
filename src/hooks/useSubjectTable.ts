// hooks/useSubjectsTable.ts

import { useState, useMemo } from 'react';
import { useSubjects } from './useSubjects';
import {
  filterSubjects,
  sortSubjects,
  exportSubjectsToCSV
} from '../utils/subjectUtils';

export type SortKey = 'subject' | 'course' | null;
export type SortOrder = 'asc' | 'desc' | null;

interface SortConfig {
  key: SortKey;
  order: SortOrder;
}

export function useSubjectsTable() {

  const { subjects, loading, error, refetch } = useSubjects();

  const [subjectFilter, setSubjectFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });

  const allCourses = useMemo(() => {
    return Array.from(new Set(subjects.map(s => s.course))).sort();
  }, [subjects]);

  const filteredData = useMemo(() => {
    const filtered = filterSubjects(subjects, {
      subjectFilter,
      teacherFilter,
      courseFilter
    });
    return sortSubjects(filtered, sortConfig);
  }, [subjects, subjectFilter, teacherFilter, courseFilter, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { key, order: 'asc' };
    });
  };

  const handleExportData = () => {
    exportSubjectsToCSV(filteredData);
  };

  return {
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
    refetch,
  };
}