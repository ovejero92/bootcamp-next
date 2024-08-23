'use client'
import {useParams, useRouter} from 'next/navigation';
import React, {useState, useEffect} from 'react';
import '../../globals.css';
import AccordionItem from '@/app/components/AcordionItem';
import Image from 'next/image';
import Loading from '../../components/ui/loading';

const Curso = () => {
    const {curso} = useParams();
    const [loading , setLoading] = useState(true);
    const [CR, setCR] = useState(null);
    const ruta = useRouter()

    useEffect(() => {
        const fetchCursos = async() => {
            try{
                const response = await fetch('http://localhost:4000/api/cursos')
                const data = await response.json()
                setTimeout(() => {
                    const fetchedData = data.find(c=> c.id == curso);
                    setCR(fetchedData);
                    setLoading(false);
                },2000)
            }
            catch(err){
                setError("No se pudieron cargar los datos. Por favor, intente más tarde.");
                setLoading(false); 
            }
        }
        fetchCursos()
    },[curso]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
            <Loading />
            </div>
          );
    }

    if (!CR) {
        return (
          <div className='BODY'>
          <header className="top-header">
          </header>
          <div>
            <div className="starsec"></div>
            <div className="starthird"></div>
            <div className="starfourth"></div>
            <div className="starfifth"></div>
          </div>
          <div className="lamp__wrap">
            <div className="lamp">
              <div className="cable"></div>
              <div className="cover"></div>
              <div className="in-cover">
                <div className="bulb"></div>
              </div>
              <div className="light"></div>
            </div>
          </div>
          <section className="error">
            <div className="error__content">
              <div className="error__message message">
                <h1 className="message__title">curso no encontrado</h1>
                <p className="message__text">pusiste un id de una carrera ineccistente porfa vuelve al menu principal</p>
              </div>
              <div className="error__nav e-nav">
                <button className="e-nav__link" onClick={() => ruta.replace("/")}></button>
              </div>
            </div>

          </section>
          </div>
        )
    }
    return (
        <>
         <div className='img-fondo w-full h-[26rem] p-0 fondo_imagen'>
                <p className='text-center pt-6 text-white'>🔴 Online en vivo</p>
                <p className='text-white pt-4 text-3xl text-center font-black'>Carrera de {CR.nombre}</p>
                <ul className='text-white list-disc ml-20 mt-4'>
                    <li>Correccíon de proyectos prácticos</li>
                    <li>Tutoría personalizada</li>
                </ul>
                <div className='text-center mt-6'><button className='py-2.5 px-10 bg-lime-200 rounded'>Inscribirme ahora</button></div>
                <ul className='text-white list-disc ml-20 mt-4'>
                    <li className='text-lime-200'>2 clases de prueba en tu primer curso</li>
                </ul>
                <div className='mt-6 ml-16 flex'>
                    <img src='https://www.coderhouse.com/imgs/landings/persons-degree.png' alt='distintas imagenes de alumnos/as que pasaron por el programa' />
                    <span className='text-white ml-3 mt-1'>Únete a más de 300.000 estudiantes</span>
                </div>
            </div>
            <div className='w-full h-full bg-gray-950'>
                <h4 className='text-white ml-16 pt-4 text-3xl'>Sobre el curso.</h4>
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
                    <AccordionItem title={'Certificado'}>
                        <div className='w-full h-[22rem] bg-gradient-to-r from-neutral-500 to-violet-500"'>
                            <div className='w-full h-[4rem] flex justify-around items-center'>
                                <div><Image src={'/Logo-next.png'} alt="logo" width={120} height={50} className="rounded-xl" /></div>
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
                <div className='w-[25rem] p-5 mx-auto mt-16 bg-zinc-700 flex'>
                    <div className='w-1/6 ml-4 calendar-bf relative'>
                        <svg width="32" height="32" className="text-gray-100 mt-[23px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M16.5 2.25V5.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M7.5 2.25V5.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M3.75 8.25H20.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path></svg>
                    </div>
                    <div className='ml-5'>
                        <p className='text-white'>Duración: {CR.cant_semanas - 1} semanas -</p>
                        <p className='text-white'>Modalidad flex</p>
                        <p><a href='https://drive.google.com/file/d/1BWE4s51opqBxACy6HGcqBW4x088gcSrU/view' className='text-lime-200'>Descargar programa<span className='text-lime-200 text-xl ml-2 relative top-1' >&#9729;</span></a></p>
                    </div>
                </div>
                <div className='w-[25rem] p-5 mx-auto mt-12 bg-zinc-700 flex'>
                    <div className='w-1/6 ml-4 calendar-bf relative'>
                        <svg width="32" height="32" className="text-gray-100 mt-[23px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M16.5 2.25V5.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M7.5 2.25V5.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M3.75 8.25H20.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path></svg>
                    </div>
                    <div className='ml-5'>
                        <p className='text-white'>Duración: {CR.cant_semanas - 1} semanas -</p>
                        <p className='text-white'>Modalidad flex</p>
                        <p><a href='https://drive.google.com/file/d/1BWE4s51opqBxACy6HGcqBW4x088gcSrU/view' className='text-lime-200'>Descargar programa<span className='text-lime-200 text-xl ml-2 relative top-1' >&#9729;</span></a></p>
                    </div>
                </div>
                <div className='w-[25rem] p-5 mx-auto mt-12 bg-zinc-700 flex'>
                    <div className='w-1/6 ml-4 calendar-bf relative'>
                        <svg width="32" height="32" className="text-gray-100 mt-[23px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M16.5 2.25V5.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M7.5 2.25V5.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path><path fill="none" stroke="currentColor" d="M3.75 8.25H20.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.125"></path></svg>
                    </div>
                    <div className='ml-5'>
                        <p className='text-white'>Duración: {CR.cant_semanas - 1} semanas -</p>
                        <p className='text-white'>Modalidad flex</p>
                        <p><a href='https://drive.google.com/file/d/1BWE4s51opqBxACy6HGcqBW4x088gcSrU/view' className='text-lime-200'>Descargar programa<span className='text-lime-200 text-xl ml-2 relative top-1' >&#9729;</span></a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Curso