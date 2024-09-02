'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../styles.module.scss";
import { useAuthContext } from './context/AuthContext';
import PlataforList from './PlataforList';

const PlataforNavbar = () => {
  const { user, logout } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleOpen = () => setMenuOpen(true);
  const handleClose = () => setMenuOpen(false);

  const toggleProfileMenu = () => setProfileOpen(!profileOpen);

  return (
    <nav className="bg-blue-800 p-4 relative">
      <ul className="flex justify-around items-center">
        <li>
          <div onClick={handleOpen}>
            <span className={styles.hambur}>&#9776;</span>
          </div>
        </li>
        <li>
          <Image 
            src={'/Logo-next.png'} 
            alt="logo" 
            width={150} 
            height={50} 
            className="rounded-xl"
            style={{ height: 'auto' }}
          />
        </li>
        <li className="relative">
          {user.logged && (
            <div className="flex items-center space-x-3">
              <div onClick={toggleProfileMenu} className="cursor-pointer">
                <Image
                  src={user.photoURL || '/per.jpg'}  // Imagen de Google o por defecto
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            {/*   <p className="text-white">{user.nombre}</p> Muestra el nombre del usuario */}
            </div>
          )}

          {/* Menú desplegable */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 text-center">
                <p className="font-bold">{user.nombre || 'Usuario'}</p> {/* Nombre del usuario */}
                <Link href="/perfil" className="block text-blue-500 hover:underline mt-2">Ver perfil</Link>
              </div>
              <hr />
              <button 
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                onClick={logout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </li>
      </ul>

      {/* Componente PlataforList */}
      <PlataforList open={menuOpen} handleClose={handleClose} />
    </nav>
  );
}

export default PlataforNavbar;

