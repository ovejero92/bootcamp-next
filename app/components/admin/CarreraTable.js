import React from 'react'
import Link from 'next/link'

const CarreraTable = async () => {
    const items = await fetch("http://localhost:4000/api/carreras",{
        cache:'no-store',
    }).then(r => r.json())
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
                {items.map((item) => (
                    <tr>
                        <td className='p-2'>{item.id}</td>
                        <td className='p-2'>{item.nombre}</td>
                        <td className='p-2'>{item.price}</td>
                        <td className='p-2'>{item.cursos.length}</td>
                        <td className='p-2'>{item.cant_semanas}</td>
                        <td className='p-2'>{item.tipo}</td>
                        <td className='p-2'>
                         <Link href={`/admin/edit/`} className='rounded bg-green-400 text-white'>
                         editar
                         </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
}

export default CarreraTable