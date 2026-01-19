export interface Subject {
    id: string;
    subject: string;
    course: string;
    teacher: string;
    hourWeek: number;
    abbreviation: string;
    color: string;
}

export const elementsLong: Subject[] = [
    {
        id: "1",
        subject: "Matemática",
        course: "1° Año A",
        teacher: "Ana García",
        hourWeek: 5,
        abbreviation: "MAT",
        color: "#FF5733"
    },
    {
        id: "2",
        subject: "Lengua y Literatura",
        course: "1° Año A",
        teacher: "Carlos Ruiz",
        hourWeek: 4,
        abbreviation: "LIT",
        color: "#33FF57"
    },
    {
        id: "3",
        subject: "Historia",
        course: "1° Año B",
        teacher: "María López",
        hourWeek: 3,
        abbreviation: "HIS",
        color: "#3357FF"
    },
    {
        id: "4",
        subject: "Geografía",
        course: "1° Año B",
        teacher: "Luis Torres",
        hourWeek: 3,
        abbreviation: "GEO",
        color: "#FF33A1"
    },
    {
        id: "5",
        subject: "Biología",
        course: "2° Año A",
        teacher: "Elena Morales",
        hourWeek: 4,
        abbreviation: "BIO",
        color: "#33FFF6"
    },
    {
        id: "6",
        subject: "Física",
        course: "2° Año A",
        teacher: "Roberto Silva",
        hourWeek: 4,
        abbreviation: "FIS",
        color: "#A1FF33"
    },
    {
        id: "7",
        subject: "Química",
        course: "2° Año B",
        teacher: "Sandra Díaz",
        hourWeek: 3,
        abbreviation: "QUI",
        color: "#FFB833"
    },
    {
        id: "8",
        subject: "Inglés",
        course: "3° Año A",
        teacher: "Jennifer Smith",
        hourWeek: 3,
        abbreviation: "ING",
        color: "#3380FF"
    },
    {
        id: "9",
        subject: "Educación Física",
        course: "3° Año A",
        teacher: "Pablo Hernández",
        hourWeek: 2,
        abbreviation: "EDF",
        color: "#FF3333"
    },
    {
        id: "10",
        subject: "Arte y Cultura",
        course: "3° Año B",
        teacher: "Laura Mendoza",
        hourWeek: 2,
        abbreviation: "ART",
        color: "#8E33FF"
    },
    {
        id: "11",
        subject: "Informática",
        course: "4° Año A",
        teacher: "Miguel Ángel Castro",
        hourWeek: 3,
        abbreviation: "INF",
        color: "#FF8533"
    },
    {
        id: "12",
        subject: "Filosofía",
        course: "4° Año A",
        teacher: "Alejandra Vega",
        hourWeek: 2,
        abbreviation: "FIL",
        color: "#33FF85"
    }
];