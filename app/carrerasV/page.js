'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { mockData, categorias } from "../data/mockData";

const Carreras = () => {
  const [selectedCategory, setSelectedCategory] = useState(categorias[0]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCourses(mockData.filter(course => course.tipo === selectedCategory));
    } else {
      setFilteredCourses([]);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {/* Lista de categorías */}
      <ul className="flex mt-4">
        {categorias.map(category => (
          <li
            key={category}
            className={`p-2 rounded ${selectedCategory === category ? 'bg-blue-500' : 'bg-indigo-950'} text-white cursor-pointer ml-2`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      
      {/* Cards de carreras */}
      <div className="flex overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory hide-scrollbar">
        {filteredCourses.map(course => (
          <div className="ml-5 mt-3 w-72 h-[34rem] bg-indigo-950 rounded relative shadow-2xl flex flex-col justify-between" key={course.id}>
            <div>
              <div className="bg-lime-200 text-center p-2 rounded-ss border-b-2">Aprovechá la masterBeca del 70%</div>
              <div className="absolute -right-2 top-14 p-2 pr-2 text-white border-2 border-white bg-indigo-950 text-sm">15% OFF 🔥</div>
              <h4 className="mt-16 text-white text-2xl ml-3">{course.nombre}</h4>
              <p className="mt-2 ml-3 text-white text-sm">Incluye {course.cursos.length} cursos</p>
              <ul className="mt-2 ml-8 text-white list-disc">
                {course.cursos.map((curso, index) => (
                  <li key={index} className="text-sm">{curso}</li>
                ))}
              </ul>
              <p className="mt-4 ml-3 text-white text-xs">⏱ {course.cant_semanas} semanas / 2 clases semanales de 2h</p>
            </div>

            <div className="border-t-2 h-44 w-full">
              <p className="text-white text-xs ml-3 mt-3">Standard plan <s>$ {course.price.toLocaleString()} ARS</s></p>
              <p className="text-white text-xs ml-3 mt-1">MasterBeca + 15 % OFF $ {Math.round(course.price * 0.15).toLocaleString()} ARS</p>
              <p className="text-white text-sm ml-3">Hasta 12 cuotas sin interés de</p>
              <p className="text-white text-2xl ml-3">$ {(Math.round(course.price / 12)).toLocaleString()} ARS</p>
              <div className="text-center m-2"><button className="p-2 border-2 border-lime-200 text-lime-200 w-4/5"><Link href={`/carrerasV/${course.id}`}>Ver curso</Link></button></div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Carreras