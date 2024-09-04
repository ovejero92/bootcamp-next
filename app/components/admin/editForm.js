'use client'
import { useState} from "react";
import {db} from "@/firebase/config";
import {doc, updateDoc} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const updateCarrera = async (values) => {
    const docRef = doc(db, "carreras", values.firestoreId); // Usamos el ID real de Firestore
    
    return updateDoc(docRef,{
        ...values,
        cursos: [...values.cursos] // Asegúrate de que `cursos` esté en el formato correcto
    });
};

const EditForm = ({ item }) => {
    console.log("Datos del ítem recibido en EditForm:", item); // Verifica los datos que llegan
    const ruta = useRouter();

    const [values, setValues] = useState(item);

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

    const handleRemoveCurso = (index) => {
        const newCursos = [...values.cursos];
        newCursos.splice(index, 1); // Eliminamos el curso del índice dado
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ID del documento Firestore:", item.firestoreId); // Verifica que el ID de Firestore esté correcto
        
        await updateCarrera(values)
            .then(() => Swal.fire({
                position:"center",
                icon:"success",
                iconColor:"#457b9d",
                title:"carrera editada!",
                showConfirmButton: false,
                timer:1500,
            }))
            .then(() => ruta.back());  // Aquí hacemos la navegación después del mensaje
    };

    return (
        <div className="container m-auto mt-6 max-w-lg">
            <form className="my-12" onSubmit={handleSubmit}>
            <h3 className="text-2xl text-center mb-4 font-black ">Editar la carrera:</h3>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={values.nombre}
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name="nombre"
                    onChange={handleChange}
                />
                <label>Precio:</label>
                <input
                    type="number"
                    value={values.price}
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name="price"
                    onChange={handleChange}
                />
                <label>Cantidad de semanas:</label>
                <input
                    type="text"
                    value={values.cant_semanas}
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name="cant_semanas"
                    onChange={handleChange}
                />
                <label>Categoria:</label>
                <input
                    type="text"
                    value={values.tipo}
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name="tipo"
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
                        onClick={() => ruta.back()}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;
