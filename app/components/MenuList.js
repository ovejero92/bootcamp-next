'use client';
import React, { useState, useEffect } from "react";
import AccordionItem from "./AcordionItem";

const MenuList = ({ open, handleClose, isLargeScreen }) => {
    const [isLargeScreenState, setIsLargeScreenState] = useState(isLargeScreen);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(min-width: 1024px)');
            setIsLargeScreenState(mediaQuery.matches);

            const handleResize = () => setIsLargeScreenState(mediaQuery.matches);
            mediaQuery.addEventListener('change', handleResize);

            return () => mediaQuery.removeEventListener('change', handleResize);
        }
    }, []);

    if (!open && !isLargeScreenState) return null;

    return (
        <div className={`${open ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all fixed inset-0 bg-black/50 flex z-50 justify-end lg:static lg:opacity-100 lg:visible`}>
            <aside className={`${open ? 'translate-x-0' : 'translate-x-full'} transition-transform w-64 bg-gray-700 lg:w-auto lg:translate-x-0 lg:flex lg:items-center`}>
                <div onClick={handleClose} className="text-right p-4 cursor-pointer text-white lg:hidden">❌</div>
                <nav className="flex flex-col mt-4 lg:flex-row lg:space-x-4">
                    <ul className="flex flex-col lg:flex-row lg:space-x-4 lg:items-center">
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
                                    <ul>
                                        <li className="text-white p-2 border-b-2 border-indigo-500">Diseño UX/UI</li>
                                        <li className="text-white p-2 border-b-2 border-indigo-500">Marketing Digital</li>
                                        <li className="text-white p-2 border-b-2 border-indigo-500">Programación y desarrollo</li>
                                        <li className="text-white p-2 border-b-2 border-indigo-500">Producto</li>
                                        <li className="text-white p-2 border-b-2 border-indigo-500">Data</li>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title="Diplomatura">
                                    <ul>
                                        <li className="text-white p-2 border-b-2">Full Stack Web Developer</li>
                                        <li className="text-white p-2 border-b-2">Data Analytics</li>
                                        <li className="text-white p-2 border-b-2">Data Science</li>
                                        <li className="text-white p-2 border-b-2">Marketing Specialist</li>
                                        <li className="text-white p-2 border-b-2">Diseñador UX</li>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title="Cursos">
                                    <ul>
                                        <li className="text-white p-2 border-b-2">Diseño UX/UI</li>
                                        <li className="text-white p-2 border-b-2">Marketing Digital</li>
                                        <li className="text-white p-2 border-b-2">Programación y desarrollo</li>
                                        <li className="text-white p-2 border-b-2">Producto</li>
                                        <li className="text-white p-2 border-b-2">Data</li>
                                        <li className="text-white p-2 border-b-2">Cripto</li>
                                        <li className="text-white p-2 border-b-2">Herramientas Digitales</li>
                                        <li className="text-white p-2 border-b-2">Inglés</li>
                                        <li className="text-white p-2 border-b-2">Inteligencia Artificial</li>
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

// import React, { useState } from "react";

// const AccordionItem = ({ title, children }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleOpen = () => setIsOpen(!isOpen);

//     return (
//         <div className="border-b border-gray-700">
//             <div onClick={toggleOpen} className="cursor-pointer p-4 text-white flex justify-between items-center">
//                 <span>{title}</span>
//                 <span>{isOpen ? '-' : '+'}</span>
//             </div>
//             {isOpen && (
//                 <div className="p-4 bg-gray-600 ">
//                     {children}
//                 </div>
//             )}
//         </div>
//     );
// };

// const MenuList = ({ open, handleClose }) => {
//     return (
//         <div className={`${open ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all fixed inset-0 bg-black/50 flex justify-end lg:static lg:opacity-100 lg:visible`}>
//             <aside className={`${open ? 'translate-x-0' : 'translate-x-full'} transition-transform w-64 bg-gray-700 lg:w-auto lg:translate-x-0 lg:flex lg:items-center`}>
//                 <div onClick={handleClose} className="text-right p-4 cursor-pointer text-white lg:hidden">❌</div>
//                 <nav className="flex flex-col mt-4 lg:flex-row lg:space-x-4">
//                     <AccordionItem title="Carreras">
//                         <ul>
//                             <li className="text-white p-2 border-b-2 border-indigo-500">Diseño UX/UI</li>
//                             <li className="text-white p-2 border-b-2 border-indigo-500">Marketing Digital</li>
//                             <li className="text-white p-2 border-b-2 border-indigo-500">Programación y desarrollo</li>
//                             <li className="text-white p-2 border-b-2 border-indigo-500">Producto</li>
//                             <li className="text-white p-2 border-b-2 border-indigo-500">Data</li>
//                         </ul>
//                     </AccordionItem>
//                     <AccordionItem title="Diplomatura">
//                         <ul>
//                             <li className="text-white p-2 border-b-2">Full Stack Web Developer</li>
//                             <li className="text-white p-2 border-b-2">Data Analytics</li>
//                             <li className="text-white p-2 border-b-2">Data Science</li>
//                             <li className="text-white p-2 border-b-2">Marketing Specialist</li>
//                             <li className="text-white p-2 border-b-2">Diseñador UX</li>
//                         </ul>
//                     </AccordionItem>
//                     <AccordionItem title="Cursos">
//                         <ul>
//                             <li className="text-white p-2 border-b-2">Diseño UX/UI</li>
//                             <li className="text-white p-2 border-b-2">Marketing Digital</li>
//                             <li className="text-white p-2 border-b-2">Programación y desarrollo</li>
//                             <li className="text-white p-2 border-b-2">Producto</li>
//                             <li className="text-white p-2 border-b-2">Data</li>
//                             <li className="text-white p-2 border-b-2">Cripto</li>
//                             <li className="text-white p-2 border-b-2">Herramientas Digitales</li>
//                             <li className="text-white p-2 border-b-2">Inglés</li>
//                             <li className="text-white p-2 border-b-2">Inteligencia Artificial</li>
//                         </ul>
//                     </AccordionItem>
//                     <AccordionItem title="Escuela de negocios">
//                         <ul>
//                             <li className="text-white p-2 border-b-2">Técnicas de negociacion</li>
//                             <li className="text-white p-2 border-b-2">Administracion de empresas</li>
//                             <li className="text-white p-2 border-b-2">Contabilidad</li>
//                             <li className="text-white p-2 border-b-2">Finanzas personales</li>
//                             <li className="text-white p-2 border-b-2">Trading</li>
//                             <li className="text-white p-2 border-b-2">Blockchain</li>
//                             <li className="text-white p-2 border-b-2">Mindset emprendedor</li>
//                             <li className="text-white p-2 border-b-2">Business analytics</li>
//                             <li className="text-white p-2 border-b-2">Liderazgo y gestion de equipos</li>
//                             <li className="text-white p-2 border-b-2">Oratoria</li>
//                         </ul>
//                     </AccordionItem>
//                     <AccordionItem title="Empresas">
//                         <ul>
//                             <li className="text-white p-2 border-b-2">Capacitaciones</li>
//                             <li className="text-white p-2 border-b-2">Partnership</li>
//                         </ul>
//                     </AccordionItem>
//                     <ul><li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Lanzamientos</li></ul>
//                     <AccordionItem title="Comunidad">
//                         <ul>
//                             <li className="text-white p-2 border-b-2">Nosotros</li>
//                             <li className="text-white p-2 border-b-2">Recursos</li>
//                             <li className="text-white p-2 border-b-2">Estudiantes</li>
//                             <li className="text-white p-2 border-b-2">Equipo</li>
//                             <li className="text-white p-2 border-b-2">Alianzas</li>
//                         </ul>
//                     </AccordionItem>
//                     <ul><li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Empresas certificadoras</li></ul>
//                     <ul><li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Beneficios</li></ul>
//                     <ul><li className="text-white p-4 lg:p-2 lg:border-none lg:hover:bg-gray-600">Plataforma</li></ul>
//                 </nav>
//             </aside>
//         </div>
//     );
// };


// export default MenuList;
