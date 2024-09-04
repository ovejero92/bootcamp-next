'use client';
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import MenuList from "./MenuList";
import { useAuthAdminContext } from '../components/context/authAdminContext';
import styles from "../styles.module.scss";
import CartWidget from "./ui/CartWidget";
import LoginAdminPage from "../admin/@login/page";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [inputSequence, setInputSequence] = useState('');

    const { userAdmin, loginAdmin } = useAuthAdminContext();

    const handleOpen = () => setMenuOpen(true);
    const handleClose = () => setMenuOpen(false);

    const handleLogin = () => {
        if (userInput === 'coder' && passwordInput === '1234') {
            loginAdmin();
            setShowLoginModal(false);
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    };

    const handleKeySequence = useCallback((e) => {
        setInputSequence(prev => prev + e.key);

        if (inputSequence.includes('c') && e.ctrlKey && e.key === 'i') {
            setShowLoginModal(true);
            setInputSequence('');
        }
    }, [inputSequence]);

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
    }, [handleKeySequence]);

    return (
        <>
            <div className="w-full bg-gray-600 fixed top-0 z-10">
                <div className="container m-auto py-4 flex justify-around items-center">
                    <Link href={'/'}>
                        <Image src={'/Logo-next.png'} alt="logo" width={200} height={50} fill='' className="rounded-xl hover:animate-pulse" style={{ height: 'auto' }} />
                    </Link>

                    {userAdmin?.logged && (
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

            {showLoginModal && (
                <LoginAdminPage
                    userInput={userInput}
                    setUserInput={setUserInput}
                    passwordInput={passwordInput}
                    setPasswordInput={setPasswordInput}
                    handleLogin={handleLogin}
                    setShowLoginModal={setShowLoginModal}
                />
            )}
        </>
    );
};

export default Navbar;
