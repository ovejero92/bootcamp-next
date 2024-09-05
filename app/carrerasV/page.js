'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import SkeletonCategory from "../components/ui/skeletonCategory";
import SkeletonCard from "../components/ui/skeletonCard";
import { useCartContext } from "../components/context/CartContext";
import { useDataContext } from "../components/context/DataContext";
import "../globals.css";

// export const generateStaticParams = () => {
//   return [
//     { category: 'diseño UX/UI' },
//     { category: 'data' },
//     { category: 'programacion y desarrollo' },
//     { category: 'marketing digital' },
//     { category: 'producto' }
//   ];
// };

const Carreras = () => {
  const { carreras, carrerasLoading, carrerasError } = useDataContext();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { addToCart, isInCart, removeToCart } = useCartContext();

  useEffect(() => {
    if (carreras.length > 0) {
      const uniqueCategories = [...new Set(carreras.map(c => c.tipo))];
      setCategory(uniqueCategories);
      setSelectedCategory(uniqueCategories[0]);
    }
  }, [carreras]);

  useEffect(() => {
    setFilteredCourses(carreras.filter(course => course.tipo === selectedCategory));
  }, [selectedCategory, carreras]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleToggleCart = (course) => {
    if (isInCart(course.id)) {
      removeToCart(course.id);
    } else {
      const updateData = {
        ...course,
        top: "carreras"
      };
      addToCart(updateData);
    }
  };

  // const ErrorCard = () => (
  //   <div className="ml-5 mt-3 w-72 h-[34rem] bg-red-100 rounded relative shadow-2xl flex flex-col justify-center items-center">
  //     <p className="text-red-500 text-center p-4">No se pudo conectar a la base de datos.</p>
  //     <p className="text-red-500 text-center p-4">Por favor, intente más tarde.</p>
  //   </div>
  // );

  return (
    <>
      {carrerasLoading ? (
        <>
          <ul className="flex mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide lg:mt-5">
            {Array(5).fill(null).map((_, index) => (
              <SkeletonCategory key={index} />
            ))}
          </ul>

          <div className="flex justify-center items-center mt-[3rem]">
            {Array(2).fill(null).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </>
      ) : (
        <>
          <ul className="flex mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide lg:mt-5">
            {category.map((cate, index) => (
              <li
                key={`${cate}-${index}`}
                className={`p-2 rounded ${selectedCategory === cate ? 'bg-blue-500' : 'bg-indigo-950'} text-white cursor-pointer ml-2`}
                onClick={() => handleCategoryClick(cate)}
              >
                {cate}
              </li>
            ))}
          </ul>

          <div className="flex overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory hide-scrollbar">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
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
                    <div className="text-center m-2">
                      <Link href={`/carrerasV/${course.id}`}>
                        <button className="p-2 border-2 border-lime-200 text-lime-200 w-4/5">Ver curso</button>
                      </Link>
                      <button 
                        className={`ml-2 p-2 border-2 text-2xl ${isInCart(course.id) ? 'border-red-200 text-red-500' : 'border-lime-200 text-red-200'}`} 
                        onClick={() => handleToggleCart(course)}
                      >
                        {isInCart(course.id) ? (<>♥️</>) : (<>&#9825;</>)}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="ml-5 mt-3 w-72 h-[34rem] bg-yellow-100 rounded relative shadow-2xl flex flex-col justify-center items-center">
                <p className="text-yellow-700 text-center p-4">No hay cursos disponibles en esta categoría.</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Carreras;
