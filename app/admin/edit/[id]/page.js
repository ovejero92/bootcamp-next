'use client'
import React, { useEffect, useState } from 'react';
import EditForm from '@/app/components/admin/editForm';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/ui/loading';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';

const EditPage = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [carrera, setCarrera] = useState(null);
  const ruta = useRouter();
  const { id } = params;

  useEffect(() => {
    const getDocumentById = async () => {
      try {
        const carrerasRef = collection(db, 'carreras');
        const q = query(carrerasRef, where('id', '==', id));  // Buscamos por el campo id manual
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Guardamos tanto los datos del documento como su ID generado por Firestore
          const doc = querySnapshot.docs[0];
          setCarrera({ ...doc.data(), firestoreId: doc.id }); // firestoreId contiene el ID real de Firestore
        } else {
          setCarrera(null);
        }
      } catch (err) {
        setCarrera(null);
      } finally {
        setLoading(false);
      }
    };

    getDocumentById(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!carrera) {
    return (
      <div className='BODY'>
        <header className="top-header"></header>
        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>
        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Carrera no encontrada</h1>
              <p className="message__text">Pusiste un ID de una carrera inexistente. Por favor vuelve al menú principal.</p>
            </div>
            <div className="error__nav e-nav">
              <button className="e-nav__link" onClick={() => ruta.replace("/")}></button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <EditForm item={carrera} />
    </div>
  );
};

export default EditPage;
