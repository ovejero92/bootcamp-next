'use client'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../components/context/AuthContext';

const PataformaPage = () => {
  const [userData, setUserData] = useState(null); // Datos del usuario de Firestore
  const { user } = useAuthContext(); // Usuario autenticado del contexto de autenticación
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Verificamos si el usuario está autenticado
        if (user) {
          // Obtenemos el usuario desde Firestore
          const userRef = collection(db, 'usuarios');
          const q = query(userRef, where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Extraemos los datos del usuario
            const userDataFromDb = querySnapshot.docs[0].data();
            setUserData(userDataFromDb);
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario y cursos:', error);
      }
    };

    fetchUserData();
  }, [user, db]);

  return (
    <div className="p-5">
      {/* Verificamos si userData no es null antes de mostrar el nombre */}
      <h1 className="font-black text-xl">
        ¡Hola, {userData ? userData.nombre : 'Usuario'}!
      </h1>

      <p>Mostrar Cursos</p>

      <select className="w-full bg-blue-200 p-2">
        <option>Cursando</option>
        <option>Terminados</option>
      </select>

        {/* Carrusel */}
        <div className="relative">
        <div className="flex overflow-x-auto snap-x snap-mandatory">
          {userData?.cursos?.map((cur, index) => (
            <div
              key={index}
              className="ml-[1rem] flex-shrink-0 w-11/12 border-2 bg-gray-700 border-x-blue-400 border-y-violet-400 p-4 mt-6 mr-4 snap-center"
            >
              <p className="text-white">{cur}</p>
              <div className="text-white mb-2">
                <span className="p-1 bg-gray-500 rounded">100% en vivo</span>
              </div>
              <hr />
              <p className="text-white">Comisión 54432</p>
              <p className="text-white">Del 17/07/24 al 04/09/24</p>
              <p className="text-white">Miércoles 20:30 a 22:30h</p>
              <br />
              <div>
                <button className="bg-lime-200 p-2 w-full rounded-md">Ir al Zoom</button>
              </div>
              <p className="text-lime-200 p-2 text-center">Ir al Curso</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-lg">Tu ruta de aprendizaje</h4>
        <p className="text-md">Tu ruta de aprendizaje se compone de una seleccion personalizada de cursos que te ayudaran a alcanzar tus metas profesionales.</p>
      </div>
      <div className="mt-4 p-4 bg-gray-700">
        <p className="text-white">Ruta de Aprendizaje</p>
        <h4 className="text-white text-lg font-black">UX/UI Design para emprendedores</h4>
        <div>
          <span className="p-1 bg-green-700 rounded text-lime-100">Diseno-Uxui</span>
          <span className="p-1 rounded bg-gray-400 ml-2">💫 Principal</span>
        </div>
      </div>
    </div>
  );
}

export default PataformaPage;
