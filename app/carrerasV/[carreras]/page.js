'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import { mockData } from '@/app/data/mockData'
import "../../globals.css";
import AccordionItem from '@/app/components/AcordionItem';
import Image from 'next/image';


const Carreras = () => {
    const {carreras} = useParams();
    const CR = mockData.find(c => c.id == carreras)
    console.log(carreras)
  return (
    <>
    <div className='img-fondo w-full h-[26rem] p-0'>
      <p className='text-center pt-6 text-white'>🔴 Online en vivo</p>
      <p className='text-white pt-4 text-3xl text-center font-black'>Carrera de</p>
      <p className='text-white pt-4 text-3xl text-center font-black'>{CR.nombre}</p>
      <ul className='text-white list-disc ml-20 mt-4'>
        <li>Correccíon de proyectos prácticos</li>
        <li>Tutoría personalizada</li>
      </ul>
      <div className='text-center mt-6'><button className='py-2.5 px-10 bg-lime-200 rounded'>Inscribirme ahora</button></div>
      <ul className='text-white list-disc ml-20 mt-4'>
        <li className='text-lime-200'>2 clases de prueba en tu primer curso</li>
      </ul>
      <div className='mt-6 ml-16 flex'>
      <img src='https://www.coderhouse.com/imgs/landings/persons-degree.png' alt='distintas imagenes de alumnos/as que pasaron por el programa'/>
      <span className='text-white ml-3 mt-1'>Únete a más de 300.000 estudiantes</span>
      </div>
    </div>
    <div className='w-full h-[50rem] bg-gray-950'>
    <h4 className='text-white ml-16 pt-4 text-3xl'>Sobre la carrera.</h4>
    <div className='w-[25rem] mx-auto mt-2 border-b border-b-indigo-500'>
    <AccordionItem title={'Introducción'}>
    <p className='text-white text-center'>En esta carrera comprenderás la importancia de la interpretación de los datos para establecer estrategias de negocio. Para eso, aprenderás los conceptos y fundamentos generales de procesamiento de datos. Lograrás análizar datos de manera más eficaz con Tableau y Excel.</p>
    </AccordionItem>
    </div>
    <div className='w-[25rem] mx-auto mt-2 border-b border-b-indigo-500'>
    <AccordionItem title={'Requisitos'}>
    <p className='text-white text-center'>No requiere conocimientos previos.</p>
    </AccordionItem>
    </div>
    <div className='w-[25rem] mx-auto mt-2 border-b border-b-indigo-500'>
    <AccordionItem title={'Certidicado'}>
    <div className='w-full h-[22rem] bg-gradient-to-r from-neutral-500 to-violet-500"'>
      <div className='w-full h-[4rem] flex justify-around items-center'>
      <div><Image src={'/Logo-next.png'} alt="logo" width={120} height={50} className="rounded-xl"/></div>
      <div className='bg-white p-1 rounded-3xl'>certificado</div>
      </div>
      <div className='mx-auto h-[10.3rem] w-7/12'>
      <p className='text-white text-4xl text-center pt-3'>Carrera de</p>
      <p className='text-white text-4xl text-center pt-2'>{CR.nombre}</p>
      <p className='text-white font-black text-center text-sm'>Gustavo Ovejero</p>
      </div>
      <div>
      <p className='text-white text-xs text-center'>Ha realizado y completado con éxito su curso en Coderhouse. La duración fue de 36 horas dictadas a lo largo de 9 semanas, cumpliendo todos los requisitos académicos exigidos.</p>
      </div>
      <p className='text-white text-center text-xs mt-6'>22 de junio de 2020</p>
    </div>
    </AccordionItem>
    </div>
    <div className='w-[25rem] mx-auto mt-2 border-b border-b-indigo-500'>
    <AccordionItem title={'¿Quiénes nos certifican?'}>
    <p className='text-white text-center'>Nuestros cursos están certificados por empresas líderes de cada industria como PedidosYa, Pomelo, Tiendanube, Bitso, entre otras</p>
    </AccordionItem>
    </div>
    </div>
    </> 
  )
}

export default Carreras