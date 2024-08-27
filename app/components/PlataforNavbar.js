import React from 'react'
import Link from 'next/link'

const PlataforNavbar = () => {
  return (
    <nav className="bg-blue-800 p-4">
      <ul className="flex justify-around">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/plataforma">Dashboard</Link></li>
        <li><Link href="/plataforma/otras-secciones">Otras Secciones</Link></li>
      </ul>
    </nav>
  )
}

export default PlataforNavbar