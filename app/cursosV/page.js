'use client'
import {useState, useEffect} from 'react';
import SkeletonCategory from '../components/ui/skeletonCategory';
import Link from 'next/link';
import { useCartContext } from '../components/context/CartContext';
import SkeletonCard from '../components/ui/skeletonCard';
import "../globals.css"

const Cursos = () => {
   const [cursos, setCursos] = useState([]);
   const [category, setCategory] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState('');
   const [filteredCurses, setFilteredCurses] = useState([]);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const {addToCart} = useCartContext();

   useEffect(()=> {
    const fetchCursos = async () => {
        try{
            setIsLoading(true);
            const response = await fetch('http://localhost:4000/api/cursos', {
              cache:'no-store',
            });
            if(!response.ok){
                throw new Error('Falló la obrencion de datos');
            }
            const data = await response.json()

            setTimeout(() => {
                setCursos(data);
                setIsLoading(false);
            },2000)
        }
        catch(err){
            setError("No se pudieron cargar los datos. Por favor, intente más tarde.");
            setIsLoading(false);
        }
    };
    fetchCursos();
   },[]);

   useEffect(() => {
    if (cursos.length > 0) {
        const uniqueCategories = [... new Set(cursos.map(c => c.tipo))];
        setCategory(uniqueCategories);
        setSelectedCategory(uniqueCategories[0])
    }
   },[cursos]);

   useEffect(() =>{
    setFilteredCurses(cursos.filter(course => course.tipo === selectedCategory));
   },[selectedCategory,cursos]);

   const handleCategoryClick = (category) => {
    setSelectedCategory(category)
   }
   const handleAdd = (item) => {
    addToCart({...item});
   }

   const ErrorCard = () => (
    <div className="ml-5 mt-3 w-72 h-[34rem] bg-red-100 rounded relative shadow-2xl flex flex-col justify-center items-center">
      <p className="text-red-500 text-center p-4">
        No se pudo conectar a la base de datos.
      </p>
      <p className="text-red-500 text-center p-4">
        Por favor, intente más tarde.
      </p>
    </div>
  );

  return(
    <>
     {isLoading ? (
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
          <ul className="flex mt-4  overflow-x-auto whitespace-nowrap scrollbar-hide lg:mt-5">
            {category.map(cate => (
              <li
                key={cate}
                className={`p-2 rounded ${selectedCategory === cate ? 'bg-blue-500' : 'bg-indigo-950'} text-white cursor-pointer ml-2`}
                onClick={() => handleCategoryClick(cate)}
              >
                {cate}
              </li>
            ))}
          </ul>
<div className="flex overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory hide-scrollbar">
    {error ? (<ErrorCard />) : filteredCurses.length > 0 ? (
        filteredCurses.map(course => (
        <div className="ml-5 mt-3 w-72 h-[25rem] bg-indigo-950 rounded relative shadow-2xl flex flex-col justify-between">
          <div>
         <div className="bg-lime-200 text-center p-2 rounded-ss border-b-2">Aprobechá la masterBeca del 70%</div>
         <div className="absolute -right-2 top-14 p-2 pr-2 text-white border-2 border-white bg-indigo-950 text-sm">2 clases de prueba</div>
         <h4 className="mt-16 text-white text-2xl ml-3">{course.nombre}</h4>
         <p className="mt-4 ml-3 text-white text-xs">⏱ {course.cant_semanas} semanas / 2 clases semanales de 2h</p>
         <div className="ml-6 mt-2 bg-indigo-700 w-32 flex justify-center border-2 border-black rounded-xl text-white">Online en vivo</div>
          </div>
        <div className="border-t-2 h-44 w-full">
         <p className="text-white text-xs ml-3 mt-3">Standard plan <s>{course.price.toLocaleString()} ARS</s></p>
         <p className="text-white text-xs ml-3 mt-1">MasterBeca {Math.round(course.price * 0.15).toLocaleString()} ARS</p>
         <p className="text-white text-sm ml-3">Hasta 12 cuotas sin interés de</p>
         <p className="text-white text-2xl ml-3">{(Math.round(course.price / 12)).toLocaleString()} ARS</p>
         <div className="text-center m-2"><Link href={`/cursosV/${course.id}`}><button className="p-2 border-2 border-lime-200 text-lime-200 w-4/5">Ver curso</button></Link><button className="ml-2 p-2 border-2 border-lime-200 text-red-200 text-2xl" onClick={() => handleAdd(course)}>&#9825;</button></div>
        </div>
        </div>))
       ) : (
             <div className="ml-5 mt-3 w-72 h-[34rem] bg-yellow-100 rounded relative shadow-2xl flex flex-col justify-center items-center">
             <p className="text-yellow-700 text-center p-4">
               No hay cursos disponibles en esta categoría.
             </p>
           </div>
        )}
</div>
        </>
      )}
    </>
  )
}


export default Cursos