export interface Staff {
    id_user: number;
    document: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    url_picture: string;
    rol: string;
    hoursTeaching: number;
}   


export const listStaff: Staff[] = [
    {
        id_user: 1,
        document: "12345678A",
        email: "alice@example.com",
        first_name: "Alice",
        last_name: "Smith",
        phone: "600000001",
        url_picture: "https://example.com/pictures/alice.jpg",
        rol: "Directivo",
        hoursTeaching: 0
    },
    {
        id_user: 2,
        document: "87654321B",
        email: "bob@example.com",
        first_name: "Bob",
        last_name: "Johnson",
        phone: "600000002",
        url_picture: "https://example.com/pictures/bob.jpg",
        rol: "Profesor",
        hoursTeaching: 20
    },
    {
        id_user: 3,
        document: "11223344C",
        email: "carol@example.com",
        first_name: "Carol",
        last_name: "Williams",
        phone: "600000003",
        url_picture: "https://example.com/pictures/carol.jpg",
        rol: "Profesor",
        hoursTeaching: 18
    },
    {
        id_user: 4,
        document: "22334455D",
        email: "dave@example.com",
        first_name: "Dave",
        last_name: "Brown",
        phone: "600000004",
        url_picture: "https://example.com/pictures/dave.jpg",
        rol: "Directivo",
        hoursTeaching: 0
    },
    {
        id_user: 5,
        document: "33445566E",
        email: "eve@example.com",
        first_name: "Eve",
        last_name: "Davis",
        phone: "600000005",
        url_picture: "https://example.com/pictures/eve.jpg",
        rol: "Profesor",
        hoursTeaching: 22
    },
    {
        id_user: 6,
        document: "44556677F",
        email: "frank@example.com",
        first_name: "Frank",
        last_name: "Miller",
        phone: "600000006",
        url_picture: "https://example.com/pictures/frank.jpg",
        rol: "Profesor",
        hoursTeaching: 16
    },
    {
        id_user: 7,
        document: "55667788G",
        email: "grace@example.com",
        first_name: "Grace",
        last_name: "Wilson",
        phone: "600000007",
        url_picture: "https://example.com/pictures/grace.jpg",
        rol: "Directivo",
        hoursTeaching: 0
    },
    {
        id_user: 8,
        document: "66778899H",
        email: "henry@example.com",
        first_name: "Henry",
        last_name: "Moore",
        phone: "600000008",
        url_picture: "https://example.com/pictures/henry.jpg",
        rol: "Profesor",
        hoursTeaching: 19
    },
    {
        id_user: 9,
        document: "77889900I",
        email: "irene@example.com",
        first_name: "Irene",
        last_name: "Taylor",
        phone: "600000009",
        url_picture: "https://example.com/pictures/irene.jpg",
        rol: "Profesor",
        hoursTeaching: 21
    },
    {
        id_user: 10,
        document: "88990011J",
        email: "jack@example.com",
        first_name: "Jack",
        last_name: "Anderson",
        phone: "600000010",
        url_picture: "https://example.com/pictures/jack.jpg",
        rol: "Directivo",
        hoursTeaching: 0
    },
    {
        id_user: 11,
        document: "99001122K",
        email: "kate@example.com",
        first_name: "Kate",
        last_name: "Thomas",
        phone: "600000011",
        url_picture: "https://example.com/pictures/kate.jpg",
        rol: "Profesor",
        hoursTeaching: 17
    },
    {
        id_user: 12,
        document: "10111213L",
        email: "leo@example.com",
        first_name: "Leo",
        last_name: "Jackson",
        phone: "600000012",
        url_picture: "https://example.com/pictures/leo.jpg",
        rol: "Profesor",
        hoursTeaching: 15
    },
    {
        id_user: 13,
        document: "11121314M",
        email: "mia@example.com",
        first_name: "Mia",
        last_name: "White",
        phone: "600000013",
        url_picture: "https://example.com/pictures/mia.jpg",
        rol: "Directivo",
        hoursTeaching: 0
    },
    {
        id_user: 14,
        document: "12131415N",
        email: "nick@example.com",
        first_name: "Nick",
        last_name: "Harris",
        phone: "600000014",
        url_picture: "https://example.com/pictures/nick.jpg",
        rol: "Profesor",
        hoursTeaching: 20
    },
    {
        id_user: 15,
        document: "13141516O",
        email: "olivia@example.com",
        first_name: "Olivia",
        last_name: "Martin",
        phone: "600000015",
        url_picture: "https://example.com/pictures/olivia.jpg",
        rol: "Profesor",
        hoursTeaching: 18
    },
    {
        id_user: 16,
        document: "14151617P",
        email: "paul@example.com",
        first_name: "Paul",
        last_name: "Lee",
        phone: "600000016",
        url_picture: "https://example.com/pictures/paul.jpg",
        rol: "Directivo",
        hoursTeaching: 0
    },
    {
        id_user: 17,
        document: "15161718Q",
        email: "quinn@example.com",
        first_name: "Quinn",
        last_name: "Walker",
        phone: "600000017",
        url_picture: "https://example.com/pictures/quinn.jpg",
        rol: "Profesor",
        hoursTeaching: 19
    },
    {
        id_user: 18,
        document: "16171819R",
        email: "ruby@example.com",
        first_name: "Ruby",
        last_name: "Hall",
        phone: "600000018",
        url_picture: "https://example.com/pictures/ruby.jpg",
        rol: "Profesor",
        hoursTeaching: 21
    },
    {
        id_user: 19,
        document: "17181920S",
        email: "sam@example.com",
        first_name: "Sam",
        last_name: "Allen",
        phone: "600000019",
        url_picture: "https://example.com/pictures/sam.jpg",
        rol: "Directivo",
        hoursTeaching: 0
    },
    {
        id_user: 20,
        document: "18192021T",
        email: "tina@example.com",
        first_name: "Tina",
        last_name: "Young",
        phone: "600000020",
        url_picture: "https://example.com/pictures/tina.jpg",
        rol: "Preceptor",
        hoursTeaching: 16
    }
];

