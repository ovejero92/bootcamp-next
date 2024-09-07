// 'use client'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { ref, onValue, off } from 'firebase/database';
// import { rtdb } from '@/firebase/config'; // Asegúrate de que la ruta sea correcta

// const UsersPanel = () => {
//     const [users, setUsers] = useState([]);
//     const [presenceStatus, setPresenceStatus] = useState({}); // Guardar el estado de presencia por UID

//     useEffect(() => {
//         const fetchUsers = async () => {
//             const db = getFirestore(); // Obtener Firestore
//             const usersCollection = collection(db, 'usuarios');
//             const usersSnapshot = await getDocs(usersCollection);
//             const usersList = usersSnapshot.docs.map(doc => ({
//                 id: doc.id, // Usa el UID como id
//                 ...doc.data(),
//             }));
//             setUsers(usersList);
//         };

//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         // Guardar las referencias de los listeners
//         const listeners = users.map(user => {
//             const userStatusRef = ref(rtdb, `status/${user.id}`);
//             const unsubscribe = onValue(userStatusRef, (snapshot) => {
//                 const status = snapshot.val();
//                 setPresenceStatus(prevStatus => ({
//                     ...prevStatus,
//                     [user.id]: status && status.state === 'online' ? '🟢' : '🔴'
//                 }));
//             });

//             return { ref: userStatusRef, unsubscribe };
//         });

//         // Limpiar los listeners cuando el componente se desmonte
//         return () => {
//             listeners.forEach(listener => {
//                 off(listener.ref); // Quitar el listener
//                 listener.unsubscribe(); // Llamar a unsubscribe si es necesario
//             });
//         };
//     }, [users]);

//     return (
//         <div className='container m-auto mt-6'>
//             <h2 className='text-2xl text-center'>Gestión de Usuarios</h2>
//             <div className='my-4 flex justify-end'>
//                 <Link href={'/admin'}>
//                     <button className='bg-blue-200 p-2 rounded-2xl mr-2'>Panel Administración</button>
//                 </Link>
//                 <Link href={'/admin/createUser'}>
//                     <button className='bg-blue-200 p-2 rounded-2xl'>Crear Usuario</button>
//                 </Link>
//             </div>
//             <table className='w-full bg-white p-2 ml-2'>
//                 <thead>
//                     <tr>
//                         <th className='text-left py-2'>Usuario</th>
//                         <th className='text-left py-2'>Correo</th>
//                         <th className='text-left py-2'>Estado</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td className='py-2'>{user.nombre || 'Sin Nombre'}</td>
//                             <td className='py-2'>{user.email || 'Sin Email'}</td>
//                             <td className='py-2'>{presenceStatus[user.id] || '🔴'}</td> {/* Estado en tiempo real */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default UsersPanel;
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ref, onValue, off } from 'firebase/database';
import { rtdb } from '@/firebase/config'; // Importar correctamente

const UsersPanel = () => {
    const [users, setUsers] = useState([]);
    const [presenceStatus, setPresenceStatus] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const db = getFirestore();
                const usersCollection = collection(db, 'usuarios');
                const usersSnapshot = await getDocs(usersCollection);
                const usersList = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const listeners = users.map(user => {
            const userStatusRef = ref(rtdb, `status/${user.id}`);
            const unsubscribe = onValue(userStatusRef, (snapshot) => {
                const status = snapshot.val();
                setPresenceStatus(prevStatus => ({
                    ...prevStatus,
                    [user.id]: status && status.state === 'online' ? '🟢' : '🔴'
                }));
            });

            return { ref: userStatusRef, unsubscribe };
        });

        return () => {
            listeners.forEach(listener => {
                off(listener.ref);
                listener.unsubscribe();
            });
        };
    }, [users]);

    return (
        <div className='container m-auto mt-6'>
            <h2 className='text-2xl text-center'>Gestión de Usuarios</h2>
            <div className='my-4 flex justify-end'>
                <Link href={'/admin'}>
                    <button className='bg-blue-200 p-2 rounded-2xl mr-2'>Panel Administración</button>
                </Link>
                <Link href={'/admin/createUser'}>
                    <button className='bg-blue-200 p-2 rounded-2xl'>Crear Usuario</button>
                </Link>
            </div>
            <table className='w-full bg-white p-2 ml-2'>
                <thead>
                    <tr>
                        <th className='text-left py-2'>Usuario</th>
                        <th className='text-left py-2'>Correo</th>
                        <th className='text-left py-2'>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className='py-2'>{user.nombre || 'Sin Nombre'}</td>
                            <td className='py-2'>{user.email || 'Sin Email'}</td>
                            <td className='py-2'>{presenceStatus[user.id] || '🔴'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPanel;
