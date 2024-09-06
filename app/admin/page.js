'use client'
import React from 'react'
import Link from 'next/link'
import CarreraTable from '../components/admin/CarreraTable'
import { useAuthAdminContext } from '../components/context/authAdminContext'

const Admin = () => {
  const { logoutAdmin } = useAuthAdminContext()
  
  return (
    <div className='container m-auto mt-6'>
      <div className='flex justify-around border-b pb-4 my-10 '>
        <h2 className='text-2xl'>Panel Administración</h2> 
        <button onClick={() => logoutAdmin()}>Logout</button>
      </div>
      <div className='flex justify-around'>
        <p>Carreras</p>
        <Link href={'/admin/create'}>
          <button className='bg-blue-200 p-2 rounded-2xl'>Crear carrera</button>
        </Link>
        <Link href={'/admin/users'}>
          <button className='bg-green-200 p-2 rounded-2xl'>Gestionar Usuarios</button>
        </Link>
      </div>
      <CarreraTable />
    </div>
  )
}

export default Admin
