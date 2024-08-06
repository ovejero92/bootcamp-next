'use client';
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MenuList from "./MenuList";
import styles from "../styles.module.scss";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    const handleOpen = () => setMenuOpen(true);
    const handleClose = () => setMenuOpen(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(min-width: 1024px)');
            setIsLargeScreen(mediaQuery.matches);

            const handleResize = () => setIsLargeScreen(mediaQuery.matches);
            mediaQuery.addEventListener('change', handleResize);

            return () => mediaQuery.removeEventListener('change', handleResize);
        }
    }, []);

    return (
        <div className="w-full bg-gray-600">
            <div className="container m-auto py-4 flex justify-around items-center">
                <Link href={'/'}>
                <Image src={'/Logo-next.png'} alt="logo" width={200} height={50} className="rounded-xl" />
                </Link>
                {isLargeScreen && (
                    <div className="hidden lg:flex space-x-4">
                        <ul className="flex space-x-4">
                            <li className="text-white p-4">Cursos</li>
                            <li className="text-white p-4">Carreras</li>
                            <li className="text-white p-4">Diplomaturas</li>
                            <li className="text-white p-4">Escuela de negocios</li>
                            <li className="text-white p-4">Empresas</li>
                        </ul>
                    </div>
                )}
                {isLargeScreen && (
                    <div className="hidden lg:flex items-center space-x-4">
                        <ul className="flex space-x-4">
                            <li className="text-white p-4">Plataforma</li>
                        </ul>
                    </div>
                )}
                <div className="lg:hidden" onClick={handleOpen}>
                    <span className={styles.hambur}>&#9776;</span>
                </div>
            </div>
            <MenuList open={menuOpen} handleClose={handleClose} isLargeScreen={isLargeScreen} />
        </div>
    );
};

export default Navbar;
