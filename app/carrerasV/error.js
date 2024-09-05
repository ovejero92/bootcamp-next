'use client'
import React from 'react'

const errorCarreras = ({error,reset}) => {
  return (
    <div className="ml-5 mt-3 w-72 h-[34rem] bg-red-100 rounded relative shadow-2xl flex flex-col justify-center items-center">
    <p className="text-red-500 text-center p-4">No se pudo conectar a la base de datos.</p>
    <p className="text-red-500 text-center p-4">Por favor, intente más tarde.</p>
    <button onClick={() => reset}>Reset!</button>
  </div>  )
}

export default errorCarreras;