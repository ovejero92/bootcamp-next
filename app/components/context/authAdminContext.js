'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthAdminContext = createContext();

export const useAuthAdminContext = () => useContext(AuthAdminContext);

export const AuthAdminProvider = ({ children }) => {
    const ruta = useRouter()
    const [userAdmin, setUserAdmin] = useState({
        logged: false,
    });

    // Función para iniciar sesión
    const loginAdmin = () => {
        const userState = { logged: true };
        setUserAdmin(userState);
        localStorage.setItem('adminUser', JSON.stringify(userState)); // Guardamos el estado en localStorage
    };

    // Función para cerrar sesión
    const logoutAdmin = () => {
        setUserAdmin({ logged: false });
        localStorage.removeItem('adminUser');
        ruta.push('/')
    };

    useEffect(() => {
        const savedUserAdmin = localStorage.getItem('adminUser');
        if (savedUserAdmin) {
            try {
                const parsedUser = JSON.parse(savedUserAdmin);
                if (parsedUser && typeof parsedUser === 'object' && parsedUser.logged !== undefined) {
                    setUserAdmin(parsedUser); // Recuperamos el estado desde localStorage
                }
            } catch (error) {
                console.error('Error parsing adminUser from localStorage:', error);
            }
        }
    }, []);

    return (
        <AuthAdminContext.Provider value={{ userAdmin, loginAdmin, logoutAdmin }}>
            {children}
        </AuthAdminContext.Provider>
    );
};
