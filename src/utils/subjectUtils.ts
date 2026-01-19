// utils/subjectTableUtils.ts
import { listSubject } from '../services/subjectServices';
import { normalizeText } from './utils';


export function filterSubjects(
  data: typeof listSubject,
  filters: {
    subjectFilter: string;
    teacherFilter: string;
    courseFilter: string[];
  }
) {
  const subjectFilterNorm = normalizeText(filters.subjectFilter);
  const teacherFilterNorm = normalizeText(filters.teacherFilter);

  return data.filter(element =>
    normalizeText(element.subject).includes(subjectFilterNorm) &&
    normalizeText(element.teacher).includes(teacherFilterNorm) &&
    (filters.courseFilter.length === 0 || filters.courseFilter.includes(element.course))
  );
}

export function sortSubjects(
  data: typeof listSubject,
  sortConfig: { key: 'subject' | 'course' | null; order: 'asc' | 'desc' | null }
) {
  if (!sortConfig.key || !sortConfig.order) return data;

  const key = sortConfig.key as 'subject' | 'course';
  return [...data].sort((a, b) => {
    const aVal = normalizeText(a[key]?.toString() ?? '');
    const bVal = normalizeText(b[key]?.toString() ?? '');
    return sortConfig.order === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });
}

export function exportSubjectsToCSV(data: typeof listSubject) {
  const csvData = [
    ['Materia', 'Curso', 'Profesor', 'Horas/Semana', 'Abreviatura', 'Color'],
    ...data.map(item => [
      item.subject,
      item.course,
      item.teacher,
      item.hoursWeek?.toString() ?? '',
      item.abbreviation,
      item.color
    ])
  ];

  const csvContent = csvData.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'materias.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}
