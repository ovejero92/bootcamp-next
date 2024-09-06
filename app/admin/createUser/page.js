'use client'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const CreateUser = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateUser = async () => {
    const auth = getAuth()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert('Usuario creado correctamente')
    } catch (error) {
      console.error('Error creando usuario:', error)
    }
  }

  return (
    <div className='container m-auto mt-6'>
      <h2 className='text-2xl text-center'>Crear Usuario</h2>
      <div className='my-4 flex flex-col items-center'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border p-2 rounded-lg mb-2'
        />
        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border p-2 rounded-lg mb-2'
        />
        <button onClick={handleCreateUser} className='bg-blue-500 text-white p-2 rounded-2xl'>
          Crear Usuario
        </button>
      </div>
    </div>
  )
}

export default CreateUser
