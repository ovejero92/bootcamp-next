// 'use client';
// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, set, onDisconnect } from "firebase/database";

// const AuthAdminContext = createContext();

// export const useAuthAdminContext = () => useContext(AuthAdminContext);

// export const AuthAdminProvider = ({ children }) => {
//     const ruta = useRouter();
//     const [userAdmin, setUserAdmin] = useState({ logged: false });
//     const auth = getAuth();
//     const rtdb = getDatabase();

//     // Función para iniciar sesión
//     const loginAdmin = () => {
//         const userState = { logged: true };
//         setUserAdmin(userState);
//         localStorage.setItem('addU', JSON.stringify(userState)); // Guardamos el estado en localStorage
//     };

//     // Función para cerrar sesión
//     const logoutAdmin = () => {
//         setUserAdmin({ logged: false });
//         localStorage.removeItem('addU');
//         ruta.push('/');
//     };

//     useEffect(() => {
//         const savedUserAdmin = localStorage.getItem('addU');
//         if (savedUserAdmin) {
//             try {
//                 const parsedUser = JSON.parse(savedUserAdmin);
//                 if (parsedUser && typeof parsedUser === 'object' && parsedUser.logged !== undefined) {
//                     setUserAdmin(parsedUser); // Recuperamos el estado desde localStorage
//                 }
//             } catch (error) {
//                 console.error('Error parsing addU from localStorage:', error);
//             }
//         }
//     }, []);

//     // Firebase Presence: Detecta cuando el usuario está conectado/desconectado
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 const userStatusDatabaseRef = ref(rtdb, 'status/' + user.uid);

//                 set(userStatusDatabaseRef, { state: 'online', last_changed: new Date().toISOString() });

//                 onDisconnect(userStatusDatabaseRef).set({ state: 'offline', last_changed: new Date().toISOString() });
//             }
//         });

//         return () => unsubscribe(); // Limpiar el listener al desmontar
//     }, [auth, rtdb]);

//     return (
//         <AuthAdminContext.Provider value={{ userAdmin, loginAdmin, logoutAdmin }}>
//             {children}
//         </AuthAdminContext.Provider>
//     );
// };
'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, rtdb } from "@/firebase/config"; // Reutilizar instancias exportadas
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, onDisconnect } from "firebase/database";

const AuthAdminContext = createContext();

export const useAuthAdminContext = () => useContext(AuthAdminContext);

export const AuthAdminProvider = ({ children }) => {
    const ruta = useRouter();
    const [userAdmin, setUserAdmin] = useState({ logged: false });

    const loginAdmin = () => {
        const userState = { logged: true };
        setUserAdmin(userState);
        localStorage.setItem('addU', JSON.stringify(userState));
    };

    const logoutAdmin = () => {
        setUserAdmin({ logged: false });
        localStorage.removeItem('addU');
        ruta.push('/');
    };

    useEffect(() => {
        const savedUserAdmin = localStorage.getItem('addU');
        if (savedUserAdmin) {
            try {
                const parsedUser = JSON.parse(savedUserAdmin);
                if (parsedUser && typeof parsedUser === 'object' && parsedUser.logged !== undefined) {
                    setUserAdmin(parsedUser);
                }
            } catch (error) {
                console.error('Error parsing addU from localStorage:', error);
            }
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userStatusDatabaseRef = ref(rtdb, 'status/' + user.uid);
                set(userStatusDatabaseRef, { state: 'online', last_changed: new Date().toISOString() });
                onDisconnect(userStatusDatabaseRef).set({ state: 'offline', last_changed: new Date().toISOString() });
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthAdminContext.Provider value={{ userAdmin, loginAdmin, logoutAdmin }}>
            {children}
        </AuthAdminContext.Provider>
    );
};
