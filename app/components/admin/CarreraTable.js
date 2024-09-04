'use client'
import React from 'react';
import Link from 'next/link';
import { useDataContext } from '../context/DataContext'; 

const CarreraTable = () => {
  const { carreras, isLoading, error } = useDataContext();

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='overflow-x-auto'>
      <table>
        <thead>
          <tr>
            <th scope='col' className='px-3 py-2'>ID</th>
            <th scope='col' className='px-3 py-2'>Nombre</th>
            <th scope='col' className='px-3 py-2'>Precio</th>
            <th scope='col' className='px-3 py-2'>Cantidad de cursos</th>
            <th scope='col' className='px-3 py-2'>Cantidad de semanas</th>
            <th scope='col' className='px-3 py-2'>Categoria</th>
            <th scope='col' className='px-3 py-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((item) => (
            <tr key={item.id}>
              <td className='p-2'>{item.id}</td>
              <td className='p-2'>{item.nombre}</td>
              <td className='p-2'>{item.price}</td>
              <td className='p-2'>{item.cursos.length}</td>
              <td className='p-2'>{item.cant_semanas}</td>
              <td className='p-2'>{item.tipo}</td>
              <td className='p-2'>
                <Link href={`/admin/edit/${item.id}`} className='rounded bg-green-400 text-white'>
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarreraTable;
