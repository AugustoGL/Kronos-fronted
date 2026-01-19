export interface School {
    id_school: number;
    school: string;
    abbreviation: string;
    image: string;
    color: string;
}

export const listSchools: School[] = [
    {
        id_school: 1,
        school: 'Colegio San Martín',
        abbreviation: 'CSM',
        image: 'https://example.com/images/san-martin-logo.png',
        color: '#FF5733'
    },
    {
        id_school: 2,
        school: 'Instituto Belgrano',
        abbreviation: 'IBE',
        image: 'https://example.com/images/belgrano-logo.png',
        color: '#33A1FF'
    },
    {
        id_school: 3,
        school: 'Escuela Sarmiento',
        abbreviation: 'ESA',
        image: 'https://example.com/images/sarmiento-logo.png',
        color: '#28A745'
    },
    {
        id_school: 4,
        school: 'Colegio Mitre',
        abbreviation: 'CMI',
        image: 'https://example.com/images/mitre-logo.png',
        color: '#FFC300'
    },
];


