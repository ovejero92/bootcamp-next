export const mockData = [
    {
        id:1,
        nombre:"Diseño UX/UI",
        price:2033133,
        cursos:["Diseño UX/UI","Diseño UX/UI Avanzado","UX Writing","UX Research"],
        cant_semanas:"40",
        tipo:"diseño UX/UI"
    },
    {
        id:2,
        nombre:"Data Analytics",
        price:1296699,
        cursos:["Exel","Tableau","Data analytics"],
        cant_semanas:"23",
        tipo:"data"
    },
    {
        id:3,
        nombre:"Data Scientist",
        price:2612667,
        cursos:["Data analytics","Data science 1: funamentos","Data science 2: machine learning", "Data science 3: NLP & Deep learning"],
        cant_semanas:"41",
        tipo:"data"
    },
]

export const categorias = [...new Set(mockData.map(c=>c.tipo))]