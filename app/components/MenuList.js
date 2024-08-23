'use client';
import React, { useState, useEffect } from "react";
import AccordionItem from "./AcordionItem";
import Link from "next/link";

const MenuList = ({ open, handleClose, isLargeScreen }) => {
    const [isLargeScreenState, setIsLargeScreenState] = useState(isLargeScreen);
    const [category, setCategory] = useState([]);
    const [category2, setCategory2] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(min-width: 1024px)');
            setIsLargeScreenState(mediaQuery.matches);

            const handleResize = () => setIsLargeScreenState(mediaQuery.matches);
            mediaQuery.addEventListener('change', handleResize);

            return () => mediaQuery.removeEventListener('change', handleResize);
        }
    }, []);

    useEffect(() => {
        const fetchCarreras = async () => {
          try {
            const response = await fetch('http://localhost:4000/api/carreras');
            if (!response.ok) {
              throw new Error("Falló la obtención de datos");
            }
            const data = await response.json();
            const uniqueCategories = [...new Set(data.map(c=>c.tipo))];
            setCategory(uniqueCategories);
            setCarreras(data);
           
    
          } catch (err) {
            setError("No se pudieron cargar los datos. Por favor, intente más tarde.");
          }
        };
        const fetchCursos = async() => {
            try{
                const response = await fetch('http://localhost:4000/api/cursos')
                const data = await response.json()
                const uniqueCategories = [...new Set(data.map(c=>c.tipo))];
                setCategory2(uniqueCategories);
                setCursos(data)
            }
            catch(err){
                setError("No se pudieron cargar los datos. Por favor, intente más tarde.");
            }
        }
        fetchCursos()
        fetchCarreras();
      }, []);
      

    if (!open) return null;

    return (
        <div className={`${open ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all fixed inset-0 bg-black/50 flex z-50 justify-end`}>
            <aside className={`${open ? 'translate-x-0' : 'translate-x-full'} transition-transform w-64 bg-gray-700 `}>
                <div onClick={handleClose} className="text-right p-4 cursor-pointer text-white ">❌</div>
                <nav className="flex flex-col mt-4  ">
                    <ul className="flex flex-col ">
                        {isLargeScreenState ? (
                            <>
                                <li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Lanzamientos</li>
                                <li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Beneficios</li>
                                <AccordionItem title="Comunidad">
                                    <ul>
                                        <li className="text-white p-2 border-b-2">Nosotros</li>
                                        <li className="text-white p-2 border-b-2">Recursos</li>
                                        <li className="text-white p-2 border-b-2">Estudiantes</li>
                                        <li className="text-white p-2 border-b-2">Equipo</li>
                                        <li className="text-white p-2 border-b-2">Alianzas</li>
                                    </ul>
                                </AccordionItem>
                                <li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Empresas certificadoras</li>
                            </>
                        ) : (
                            <>
                                <AccordionItem title="Carreras">
                                    <ul className="relative">
                                        <li className="absolute -top-[2.8rem] -left-[6rem] p-1 bg-gray-800 rounded-xl border-2 border-white text-white "><Link href={'/cursosV'}>Ver todos &#8594;</Link></li>
                                        {category.map(cat => (
                                            <>
                                            <AccordionItem title={cat} key={cat}>
                                                <ul>
                                                    {carreras
                                                        .filter(car => car.tipo === cat)  // Filtramos las carreras por categoría
                                                        .map(car => (
                                                            <li className="text-center text-white p-2 border-b-2 border-indigo-500 hover:bg-gray-600" key={car.id}>
                                                                <Link href={`/carrerasV/${car.id}`}>{car.nombre}</Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </AccordionItem>
                                            </>
                                        ))}
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title="Diplomatura">
                                    <ul>
                                        <li className="text-white p-2 border-b-2 text-center hover:hover:bg-gray-600">Full Stack Web Developer</li>
                                        <li className="text-white p-2 border-b-2 text-center hover:hover:bg-gray-600">Data Analytics</li>
                                        <li className="text-white p-2 border-b-2 text-center hover:hover:bg-gray-600">Data Science</li>
                                        <li className="text-white p-2 border-b-2 text-center hover:hover:bg-gray-600">Marketing Specialist</li>
                                        <li className="text-white p-2 border-b-2 text-center hover:hover:bg-gray-600">Diseñador UX</li>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title="Cursos">
                                <ul className="relative">
                                        <li className="absolute -top-[2.8rem] -left-[6rem] p-1 bg-gray-800 rounded-xl border-2 border-white text-white "><Link href={'/carrerasV'}>Ver todos &#8594;</Link></li>
                                        {category2.map(cat => (
                                            <>
                                            <AccordionItem title={cat} key={cat}>
                                                <ul>
                                                    {cursos
                                                        .filter(car => car.tipo === cat)  // Filtramos las carreras por categoría
                                                        .map(car => (
                                                            <li className="text-center text-white p-2 border-b-2 border-indigo-500 hover:bg-gray-600" key={car.id}>
                                                                <Link href={`/carrerasV/${car.id}`}>{car.nombre}</Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </AccordionItem>
                                            </>
                                        ))}
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title="Escuela de negocios">
                                    <ul>
                                        <li className="text-white p-2 border-b-2">Técnicas de negociacion</li>
                                        <li className="text-white p-2 border-b-2">Administracion de empresas</li>
                                        <li className="text-white p-2 border-b-2">Contabilidad</li>
                                        <li className="text-white p-2 border-b-2">Finanzas personales</li>
                                        <li className="text-white p-2 border-b-2">Trading</li>
                                        <li className="text-white p-2 border-b-2">Blockchain</li>
                                        <li className="text-white p-2 border-b-2">Mindset emprendedor</li>
                                        <li className="text-white p-2 border-b-2">Business analytics</li>
                                        <li className="text-white p-2 border-b-2">Proyectos agiles</li>
                                        <li className="text-white p-2 border-b-2">Growth hacking</li>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title="Empresas">
                                    <ul>
                                        <li className="text-white p-2 border-b-2">Google</li>
                                        <li className="text-white p-2 border-b-2">IBM</li>
                                        <li className="text-white p-2 border-b-2">Microsoft</li>
                                        <li className="text-white p-2 border-b-2">Amazon</li>
                                        <li className="text-white p-2 border-b-2">Facebook</li>
                                        <li className="text-white p-2 border-b-2">Slack</li>
                                        <li className="text-white p-2 border-b-2">Twitter</li>
                                    </ul>
                                </AccordionItem>
                                <li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Lanzamientos</li>
                                <AccordionItem title="Comunidad">
                                    <ul>
                                        <li className="text-white p-2 border-b-2">Nosotros</li>
                                        <li className="text-white p-2 border-b-2">Recursos</li>
                                        <li className="text-white p-2 border-b-2">Estudiantes</li>
                                        <li className="text-white p-2 border-b-2">Equipo</li>
                                        <li className="text-white p-2 border-b-2">Alianzas</li>
                                    </ul>
                                </AccordionItem>
                                <li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Beneficios</li>
                            </>
                        )}
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default MenuList;
