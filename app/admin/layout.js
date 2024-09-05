'use client';
import React, { useEffect, useState } from 'react';

const AdminLayaut = ({ children, login }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        // Verificamos si hay un usuario guardado en localStorage
        const savedUserAdmin = localStorage.getItem('addU');
        if (savedUserAdmin) {
            try {
                const parsedUser = JSON.parse(savedUserAdmin);
                if (parsedUser && parsedUser.logged) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error parsing addU from localStorage:', error);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // Mostramos un indicador de carga mientras verificamos el estado
    if (isLoggedIn === null) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            {isLoggedIn ? children : login}
        </>
    );
};

export default AdminLayaut;