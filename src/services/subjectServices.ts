export interface Subject {
    id_subject: number;
    subject: string;
    course: string;
    teacher: string;
    hoursWeek: number;
    abbreviation: string;
    color: string;
}

export const listSubject: Subject[] = [
    // 1A
    { id_subject: 1, subject: 'Matemática', course: '1A', teacher: 'María González', hoursWeek: 6, abbreviation: 'MAT', color: '#FF5733' },
    { id_subject: 2, subject: 'Lengua y Literatura', course: '1A', teacher: 'Carlos Rodríguez', hoursWeek: 5, abbreviation: 'LEN', color: '#33A1FF' },
    { id_subject: 3, subject: 'Historia', course: '1A', teacher: 'Ana López', hoursWeek: 3, abbreviation: 'HIS', color: '#28A745' },
    { id_subject: 4, subject: 'Geografía', course: '1A', teacher: 'Jorge Martín', hoursWeek: 3, abbreviation: 'GEO', color: '#FFC300' },
    { id_subject: 5, subject: 'Biología', course: '1A', teacher: 'Laura Fernández', hoursWeek: 4, abbreviation: 'BIO', color: '#8E44AD' },
    { id_subject: 6, subject: 'Educación Física', course: '1A', teacher: 'Roberto Silva', hoursWeek: 3, abbreviation: 'EDF', color: '#E67E22' },

    // 1B
    { id_subject: 7, subject: 'Matemática', course: '1B', teacher: 'Pedro Sánchez', hoursWeek: 6, abbreviation: 'MAT', color: '#FF5733' },
    { id_subject: 8, subject: 'Lengua y Literatura', course: '1B', teacher: 'Elena Castro', hoursWeek: 5, abbreviation: 'LEN', color: '#33A1FF' },
    { id_subject: 9, subject: 'Historia', course: '1B', teacher: 'Ana López', hoursWeek: 3, abbreviation: 'HIS', color: '#28A745' },
    { id_subject: 10, subject: 'Geografía', course: '1B', teacher: 'Miguel Torres', hoursWeek: 3, abbreviation: 'GEO', color: '#FFC300' },
    { id_subject: 11, subject: 'Biología', course: '1B', teacher: 'Carmen Ruiz', hoursWeek: 4, abbreviation: 'BIO', color: '#8E44AD' },
    { id_subject: 12, subject: 'Educación Física', course: '1B', teacher: 'Roberto Silva', hoursWeek: 3, abbreviation: 'EDF', color: '#E67E22' },

    // 2A
    { id_subject: 13, subject: 'Matemática', course: '2A', teacher: 'María González', hoursWeek: 6, abbreviation: 'MAT', color: '#FF5733' },
    { id_subject: 14, subject: 'Lengua y Literatura', course: '2A', teacher: 'Carlos Rodríguez', hoursWeek: 5, abbreviation: 'LEN', color: '#33A1FF' },
    { id_subject: 15, subject: 'Física', course: '2A', teacher: 'Alberto Mendoza', hoursWeek: 4, abbreviation: 'FÍS', color: '#DC3545' },
    { id_subject: 16, subject: 'Química', course: '2A', teacher: 'Isabel Herrera', hoursWeek: 4, abbreviation: 'QUÍ', color: '#17A2B8' },
    { id_subject: 17, subject: 'Historia', course: '2A', teacher: 'Ana López', hoursWeek: 3, abbreviation: 'HIS', color: '#28A745' },
    { id_subject: 18, subject: 'Inglés', course: '2A', teacher: 'Patricia Brown', hoursWeek: 4, abbreviation: 'ING', color: '#6F42C1' },

    // 2B
    { id_subject: 19, subject: 'Matemática', course: '2B', teacher: 'Pedro Sánchez', hoursWeek: 6, abbreviation: 'MAT', color: '#FF5733' },
    { id_subject: 20, subject: 'Lengua y Literatura', course: '2B', teacher: 'Elena Castro', hoursWeek: 5, abbreviation: 'LEN', color: '#33A1FF' },
    { id_subject: 21, subject: 'Física', course: '2B', teacher: 'Alberto Mendoza', hoursWeek: 4, abbreviation: 'FÍS', color: '#DC3545' },
    { id_subject: 22, subject: 'Química', course: '2B', teacher: 'Isabel Herrera', hoursWeek: 4, abbreviation: 'QUÍ', color: '#17A2B8' },
    { id_subject: 23, subject: 'Historia', course: '2B', teacher: 'Ricardo Vargas', hoursWeek: 3, abbreviation: 'HIS', color: '#28A745' },
    { id_subject: 24, subject: 'Inglés', course: '2B', teacher: 'Patricia Brown', hoursWeek: 4, abbreviation: 'ING', color: '#6F42C1' },

    // 3A
    { id_subject: 25, subject: 'Matemática', course: '3A', teacher: 'Fernando Gutiérrez', hoursWeek: 6, abbreviation: 'MAT', color: '#FF5733' },
    { id_subject: 26, subject: 'Lengua y Literatura', course: '3A', teacher: 'Sofía Morales', hoursWeek: 5, abbreviation: 'LEN', color: '#33A1FF' },
    { id_subject: 27, subject: 'Física', course: '3A', teacher: 'Alberto Mendoza', hoursWeek: 5, abbreviation: 'FÍS', color: '#DC3545' },
    { id_subject: 28, subject: 'Química', course: '3A', teacher: 'Isabel Herrera', hoursWeek: 5, abbreviation: 'QUÍ', color: '#17A2B8' },
    { id_subject: 29, subject: 'Filosofía', course: '3A', teacher: 'Andrés Vega', hoursWeek: 3, abbreviation: 'FIL', color: '#FD7E14' },
    { id_subject: 30, subject: 'Economía', course: '3A', teacher: 'Lucía Ramírez', hoursWeek: 3, abbreviation: 'ECO', color: '#20C997' },

    // 3B
    { id_subject: 31, subject: 'Matemática', course: '3B', teacher: 'Fernando Gutiérrez', hoursWeek: 6, abbreviation: 'MAT', color: '#FF5733' },
    { id_subject: 32, subject: 'Lengua y Literatura', course: '3B', teacher: 'Sofía Morales', hoursWeek: 5, abbreviation: 'LEN', color: '#33A1FF' },
    { id_subject: 33, subject: 'Física', course: '3B', teacher: 'Alberto Mendoza', hoursWeek: 5, abbreviation: 'FÍS', color: '#DC3545' },
    { id_subject: 34, subject: 'Química', course: '3B', teacher: 'Isabel Herrera', hoursWeek: 5, abbreviation: 'QUÍ', color: '#17A2B8' },
    { id_subject: 35, subject: 'Filosofía', course: '3B', teacher: 'Andrés Vega', hoursWeek: 3, abbreviation: 'FIL', color: '#FD7E14' },
    { id_subject: 36, subject: 'Economía', course: '3B', teacher: 'Lucía Ramírez', hoursWeek: 3, abbreviation: 'ECO', color: '#20C997' },

    // 4A
    { id_subject: 37, subject: 'Cálculo', course: '4A', teacher: 'Fernando Gutiérrez', hoursWeek: 6, abbreviation: 'CAL', color: '#FF5733' },
    { id_subject: 38, subject: 'Literatura', course: '4A', teacher: 'Sofía Morales', hoursWeek: 4, abbreviation: 'LIT', color: '#33A1FF' },
    { id_subject: 39, subject: 'Física Avanzada', course: '4A', teacher: 'Alberto Mendoza', hoursWeek: 6, abbreviation: 'FAV', color: '#DC3545' },
    { id_subject: 40, subject: 'Química Orgánica', course: '4A', teacher: 'Isabel Herrera', hoursWeek: 5, abbreviation: 'QOR', color: '#17A2B8' },
    { id_subject: 41, subject: 'Filosofía', course: '4A', teacher: 'Andrés Vega', hoursWeek: 3, abbreviation: 'FIL', color: '#FD7E14' },
    { id_subject: 42, subject: 'Psicología', course: '4A', teacher: 'Valentina Cruz', hoursWeek: 3, abbreviation: 'PSI', color: '#E83E8C' },

    // 4B
    { id_subject: 43, subject: 'Cálculo', course: '4B', teacher: 'Fernando Gutiérrez', hoursWeek: 6, abbreviation: 'CAL', color: '#FF5733' },
    { id_subject: 44, subject: 'Literatura', course: '4B', teacher: 'Sofía Morales', hoursWeek: 4, abbreviation: 'LIT', color: '#33A1FF' },
    { id_subject: 45, subject: 'Física Avanzada', course: '4B', teacher: 'Alberto Mendoza', hoursWeek: 6, abbreviation: 'FAV', color: '#DC3545' },
    { id_subject: 46, subject: 'Química Orgánica', course: '4B', teacher: 'Isabel Herrera', hoursWeek: 5, abbreviation: 'QOR', color: '#17A2B8' },
    { id_subject: 47, subject: 'Filosofía', course: '4B', teacher: 'Andrés Vega', hoursWeek: 3, abbreviation: 'FIL', color: '#FD7E14' },
    { id_subject: 48, subject: 'Psicología', course: '4B', teacher: 'Valentina Cruz', hoursWeek: 3, abbreviation: 'PSI', color: '#E83E8C' },

    // 5A
    { id_subject: 49, subject: 'Análisis Matemático', course: '5A', teacher: 'Fernando Gutiérrez', hoursWeek: 6, abbreviation: 'ANA', color: '#FF5733' },
    { id_subject: 50, subject: 'Literatura Universal', course: '5A', teacher: 'Sofía Morales', hoursWeek: 4, abbreviation: 'LIU', color: '#33A1FF' },
    { id_subject: 51, subject: 'Física Cuántica', course: '5A', teacher: 'Alberto Mendoza', hoursWeek: 6, abbreviation: 'FCU', color: '#DC3545' },
    { id_subject: 52, subject: 'Bioquímica', course: '5A', teacher: 'Isabel Herrera', hoursWeek: 5, abbreviation: 'BIQ', color: '#17A2B8' },
    { id_subject: 53, subject: 'Historia del Arte', course: '5A', teacher: 'Gabriela Flores', hoursWeek: 3, abbreviation: 'HAR', color: '#6C757D' },
    { id_subject: 54, subject: 'Metodología de la Investigación', course: '5A', teacher: 'Raúl Jiménez', hoursWeek: 4, abbreviation: 'MET', color: '#495057' },

    // 5B
    { id_subject: 55, subject: 'Análisis Matemático', course: '5B', teacher: 'Fernando Gutiérrez', hoursWeek: 6, abbreviation: 'ANA', color: '#FF5733' },
    { id_subject: 56, subject: 'Literatura Universal', course: '5B', teacher: 'Sofía Morales', hoursWeek: 4, abbreviation: 'LIU', color: '#33A1FF' },
    { id_subject: 57, subject: 'Física Cuántica', course: '5B', teacher: 'Alberto Mendoza', hoursWeek: 6, abbreviation: 'FCU', color: '#DC3545' },
    { id_subject: 58, subject: 'Bioquímica', course: '5B', teacher: 'Isabel Herrera', hoursWeek: 5, abbreviation: 'BIQ', color: '#17A2B8' },
    { id_subject: 59, subject: 'Historia del Arte', course: '5B', teacher: 'Gabriela Flores', hoursWeek: 3, abbreviation: 'HAR', color: '#6C757D' },
    { id_subject: 60, subject: 'Metodología de la Investigación', course: '5B', teacher: 'Raúl Jiménez', hoursWeek: 4, abbreviation: 'MET', color: '#495057' },

    // 6A
    { id_subject: 61, subject: 'Matemática Superior', course: '6A', teacher: 'Diego Martínez', hoursWeek: 6, abbreviation: 'MSU', color: '#FF5733' },
    { id_subject: 62, subject: 'Comunicación', course: '6A', teacher: 'Andrea Vásquez', hoursWeek: 4, abbreviation: 'COM', color: '#33A1FF' },
    { id_subject: 63, subject: 'Física Moderna', course: '6A', teacher: 'Rodrigo Peña', hoursWeek: 6, abbreviation: 'FMO', color: '#DC3545' },
    { id_subject: 64, subject: 'Química Industrial', course: '6A', teacher: 'Carmen Silva', hoursWeek: 5, abbreviation: 'QIN', color: '#17A2B8' },
    { id_subject: 65, subject: 'Sociología', course: '6A', teacher: 'Marcela Díaz', hoursWeek: 3, abbreviation: 'SOC', color: '#FD7E14' },
    { id_subject: 66, subject: 'Proyecto de Investigación', course: '6A', teacher: 'Tomás Heredia', hoursWeek: 4, abbreviation: 'PRO', color: '#20C997' },

    // 6B
    { id_subject: 67, subject: 'Matemática Superior', course: '6B', teacher: 'Diego Martínez', hoursWeek: 6, abbreviation: 'MSU', color: '#FF5733' },
    { id_subject: 68, subject: 'Comunicación', course: '6B', teacher: 'Andrea Vásquez', hoursWeek: 4, abbreviation: 'COM', color: '#33A1FF' },
    { id_subject: 69, subject: 'Física Moderna', course: '6B', teacher: 'Rodrigo Peña', hoursWeek: 6, abbreviation: 'FMO', color: '#DC3545' },
    { id_subject: 70, subject: 'Química Industrial', course: '6B', teacher: 'Carmen Silva', hoursWeek: 5, abbreviation: 'QIN', color: '#17A2B8' },
    { id_subject: 71, subject: 'Sociología', course: '6B', teacher: 'Marcela Díaz', hoursWeek: 3, abbreviation: 'SOC', color: '#FD7E14' },
    { id_subject: 72, subject: 'Proyecto de Investigación', course: '6B', teacher: 'Tomás Heredia', hoursWeek: 4, abbreviation: 'PRO', color: '#20C997' },

    // 7A
    { id_subject: 73, subject: 'Tesis', course: '7A', teacher: 'Elena Moreno', hoursWeek: 8, abbreviation: 'TES', color: '#6C757D' },
    { id_subject: 74, subject: 'Seminario Avanzado', course: '7A', teacher: 'Javier Luna', hoursWeek: 4, abbreviation: 'SEA', color: '#495057' },
    { id_subject: 75, subject: 'Práctica Profesional', course: '7A', teacher: 'Natalia Ramos', hoursWeek: 6, abbreviation: 'PPR', color: '#E83E8C' },
    { id_subject: 76, subject: 'Ética Profesional', course: '7A', teacher: 'Roberto Castillo', hoursWeek: 3, abbreviation: 'ETP', color: '#6F42C1' },
    { id_subject: 77, subject: 'Gestión de Proyectos', course: '7A', teacher: 'Silvia Guerrero', hoursWeek: 4, abbreviation: 'GPS', color: '#FD7E14' },

    // 7B
    { id_subject: 78, subject: 'Tesis', course: '7B', teacher: 'Elena Moreno', hoursWeek: 8, abbreviation: 'TES', color: '#6C757D' },
    { id_subject: 79, subject: 'Seminario Avanzado', course: '7B', teacher: 'Javier Luna', hoursWeek: 4, abbreviation: 'SEA', color: '#495057' },
    { id_subject: 80, subject: 'Práctica Profesional', course: '7B', teacher: 'Natalia Ramos', hoursWeek: 6, abbreviation: 'PPR', color: '#E83E8C' },
    { id_subject: 81, subject: 'Ética Profesional', course: '7B', teacher: 'Roberto Castillo', hoursWeek: 3, abbreviation: 'ETP', color: '#6F42C1' },
    { id_subject: 82, subject: 'Gestión de Proyectos', course: '7B', teacher: 'Silvia Guerrero', hoursWeek: 4, abbreviation: 'GPS', color: '#FD7E14' },
];

