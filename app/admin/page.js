import React from 'react'
import Link from 'next/link'
import CarreraTable from '../components/admin/CarreraTable'

const Admin = () => {
  return (
    <div className='container m-auto mt-6'>
        <h2 className='text-2xl my-10 border-b pb-4'>Panel Administración</h2>
        <p className='flex justify-around'>Carreras <Link href={'/admin/create'}><button className='bg-blue-200 p-2 rounded-2xl'>Crear carrera</button></Link></p>
        <CarreraTable />
    </div>
  )
}

export default Admin