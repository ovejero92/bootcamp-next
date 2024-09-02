'use client';
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import MenuList from "./MenuList";
import styles from "../styles.module.scss";
import CartWidget from "./ui/CartWidget";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [showAdminLink, setShowAdminLink] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [inputSequence, setInputSequence] = useState('');

    const handleOpen = () => setMenuOpen(true);
    const handleClose = () => setMenuOpen(false);

    const handleLogin = () => {
        if (userInput === 'coder' && passwordInput === '1234') {
            setShowAdminLink(true);
            setShowLoginModal(false);
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    };

    const handleKeySequence = useCallback((e) => {
        setInputSequence(prev => prev + e.key);

        // Detectar la secuencia 'c' 'o' combinada con 'ctrl'
        if (inputSequence.includes('c') && e.ctrlKey && e.key === 'i') {
            setShowLoginModal(true);
            setInputSequence('');
        }
    }, [inputSequence]); // Agregar inputSequence como dependencia

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeySequence);

            const mediaQuery = window.matchMedia('(min-width: 1024px)');
            setIsLargeScreen(mediaQuery.matches);

            const handleResize = () => setIsLargeScreen(mediaQuery.matches);
            mediaQuery.addEventListener('change', handleResize);

            return () => {
                window.removeEventListener('keydown', handleKeySequence);
                mediaQuery.removeEventListener('change', handleResize);
            };
        }
    }, [handleKeySequence]); // Cambiar inputSequence por handleKeySequence

    return (
        <>
        <div className="w-full bg-gray-600 fixed top-0 z-10 ">
            <div className="container m-auto py-4 flex justify-around items-center">
                <Link href={'/'} >
                    <Image src={'/Logo-next.png'} alt="logo" width={200} height={50} fill='' className="rounded-xl hover:animate-pulse" style={{ height: 'auto' }}
                    />
                </Link>

                {/* Mostrar el link de admin solo si las credenciales son correctas */}
                {showAdminLink && (
                    <Link href={'/admin'} className="text-[3.2rem] hover:origin-center hover:rotate-45 hover:transition-transform">&#10049;</Link>
                )}
                
                {isLargeScreen && (
                    <>
                    <div className="hidden lg:flex space-x-4">
                        <ul className="flex space-x-4">
                            <li className="text-white p-4"><Link href={'/carrerasV'}>Carreras</Link></li>
                            <li className="text-white p-4"><Link href={'/cursosV'}>Cursos</Link></li>
                            <li className="text-white p-4">Diplomaturas</li>
                            <li className="text-white p-4">Escuela de negocios</li>
                            <li className="text-white p-4">Empresas</li>
                        </ul>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        <ul className="flex space-x-4">
                            <Link href={'/flataforma'}>
                            <li className="text-white p-4">Plataforma</li>
                            </Link>
                        </ul>
                    </div>
                    </>
                )}
                
                <CartWidget />
                <div onClick={handleOpen}>
                    <span className={styles.hambur}>&#9776;</span>
                </div>
            </div>
            <MenuList open={menuOpen} handleClose={handleClose} isLargeScreen={isLargeScreen} />
        </div>

        <div className="mb-[6rem]"></div>

        {/* Modal de inicio de sesión */}
        {showLoginModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white p-6 rounded shadow-md w-4/5">
                    <h2 className="text-2xl mb-4">Iniciar sesión</h2>
                    <input 
                        type="text"
                        placeholder="Usuario"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="border p-2 mb-4 w-full"
                    />
                    <input 
                        type="password"
                        placeholder="Contraseña"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="border p-2 mb-4 w-full"
                    />
                    <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded">Ingresar</button>
                    <button onClick={() => setShowLoginModal(false)} className="bg-red-500 text-white py-2 px-4 ml-2 rounded">Cancelar</button>
                </div>
            </div>
        )}
        </>
    );
};

export default Navbar;
