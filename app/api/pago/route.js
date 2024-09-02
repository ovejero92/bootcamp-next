import { db } from '@/firebase/config'; 
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { NextResponse } from 'next/server'; 

export async function POST(req) {
    try {
        const { email, curso, nombre, apellido, phone, documento } = await req.json();

        if (!email || !curso || !nombre || !apellido || !phone || !documento) {
            return NextResponse.json({ message: "Faltan datos en la solicitud" }, { status: 400 });
        }

        // Referencia al documento del usuario
        const userDocRef = doc(db, 'usuarios', email);

        // Verificar si el usuario ya existe
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
            // El usuario ya existe, actualiza el documento
            await updateDoc(userDocRef, {
                cursos: arrayUnion(curso),
                phone: phone,
                documento: documento,
                apellido: apellido
            });

            return NextResponse.json({ message: "Curso añadido y datos actualizados con éxito" }, { status: 200 });
        } else {
            // El usuario no existe, crea un nuevo documento
            await setDoc(userDocRef, {
                email: email,
                nombre: nombre,
                apellido: apellido,
                phone: phone,
                documento: documento,
                cursos: [curso]
            });

            return NextResponse.json({ message: "Usuario creado y curso añadido con éxito" }, { status: 201 });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        return NextResponse.json({ message: "Error en el servidor", error: error.message }, { status: 500 });
    }
}
