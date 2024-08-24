'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useRouter } from 'next/navigation';

const CreateForm = () => {
    const ruta = useRouter();
    const [carreras, setCarreras] = useState([]);
    const [values, setValues] = useState({
        nombre: '',
        price: 0,
        tipo: '',
        id: '',
        cant_semanas: '',
        cursos: [''], // Inicializamos el array con un curso vacío para empezar
    });

    // Fetch de carreras desde Firebase, ejecutado solo una vez al montar el componente
    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const carrerasSnapshot = await getDocs(collection(db, 'carreras'));
                const carrerasData = carrerasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCarreras(carrerasData);
            } catch (error) {
                console.error('Error fetching carreras:', error);
            }
        };
        fetchCarreras();
    }, []);

    // Obtener el ID más alto y sumarle 1
    const generateNewId = () => {
        const maxId = carreras.reduce((max, carrera) => Math.max(max, parseInt(carrera.id)), 0);
        return (maxId + 1).toString(); // Convertir a string ya que los IDs son strings
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleCursoChange = (index, e) => {
        const newCursos = [...values.cursos];
        newCursos[index] = e.target.value;
        setValues({
            ...values,
            cursos: newCursos
        });
    };

    const handleAddCurso = () => {
        setValues({
            ...values,
            cursos: [...values.cursos, ''] // Agregamos un curso vacío
        });
    };

    const handleRemoveCurso = (index) => {
        const newCursos = [...values.cursos];
        newCursos.splice(index, 1); // Eliminamos el curso del índice dado
        setValues({
            ...values,
            cursos: newCursos
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Generar un nuevo ID para la carrera
            const newId = generateNewId();

            // Crear el documento con el nuevo ID
            const docRef = doc(db, 'carreras', newId);
            await setDoc(docRef, { ...values, id: newId });

            console.log('Carrera agregada correctamente');
        } catch (error) {
            console.error('Error al agregar carrera:', error);
        }
    };

    return (
        <div className='container m-auto mt-6 max-w-lg'>
            <form className='my-12' onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input
                    type='text'
                    value={values.nombre}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='nombre'
                    onChange={handleChange}
                />
                <label>Precio:</label>
                <input
                    type='number'
                    value={values.price}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='price'
                    onChange={handleChange}
                />
                <label>Cantidad de semanas:</label>
                <input
                    type='text'
                    value={values.cant_semanas}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='cant_semanas'
                    onChange={handleChange}
                />
                <label>Categoria:</label>
                <input
                    type='text'
                    value={values.tipo}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='tipo'
                    onChange={handleChange}
                />
                <label>Cursos de la carrera:</label>
                {values.cursos.map((curso, index) => (
                    <div key={index} className='my-4'>
                        <input
                            type='text'
                            value={curso}
                            onChange={(e) => handleCursoChange(index, e)}
                            className='p-2 rounded w-full border border-blue-100 block mb-2'
                            placeholder={`Curso ${index + 1}`}
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => handleRemoveCurso(index)}
                            >
                                Eliminar Curso
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
                    onClick={handleAddCurso}
                >
                    Agregar Curso
                </button>
                <div className='text-center '>
                    <button
                        type='submit'
                        className='bg-indigo-950 text-white px-4 py-2 rounded mt-4 animate-pulse'
                    >
                        Guardar
                    </button>
                    <button
                        className='bg-red-700 ml-2 text-white px-4 py-2 rounded mt-4 animate-pulse'
                        onClick={()=>ruta.back()}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateForm;