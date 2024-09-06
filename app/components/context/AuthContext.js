'use client';
import { auth, provider } from "@/firebase/config";
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const router = useRouter(); // Hook de enrutamiento
  const [user, setUser] = useState({
    logged: false,
    nombre: null,
    apellido: null,
    email: null,
    uid: null,
    photoURL: null,
    cursos: []
  });

  const db = getFirestore();  // Instancia de Firestore

  const registerUser = async (values) => {
    try {
      // Registrar el usuario
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;
      const userRef = doc(db, "usuarios", newUser.uid); // Usar UID como identificador

      // Verificar si el documento ya existe
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Crear el documento del usuario en Firestore con un campo cursos vacío
        await setDoc(userRef, {
          email: newUser.email,
          nombre: values.nombre || null,
          cursos: []  // Inicialmente, sin cursos
        });
      } else {
        const existingData = userSnap.data();
        // Actualizar el documento con datos existentes
        await setDoc(userRef, {
          ...existingData,
        }, { merge: true });
      }

      console.log("Usuario registrado y documento en Firestore creado.");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Este correo ya está en uso. Intenta con otro.");
      } else {
        console.error("Error al registrar el usuario:", error.message);
      }
    }
  };

  const loginUser = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("Usuario logueado:", userCredential.user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const logout = async () => {
    try {
      window.location.reload(); // Recarga la página para actualizar el estado
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Referencia al documento del usuario en Firestore usando UID
      const userRef = doc(db, "usuarios", user.uid); 
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          email: user.email,
          nombre: user.displayName || null,
          id:user.uid,
          cursos: []  // Inicialmente, sin cursos
        });
      } else {
        const existingData = userSnapshot.data();
        
        // Verificamos si tiene el campo "cursos", si no lo tiene lo agregamos
        if (!existingData.cursos) {
          await setDoc(userRef, {
            ...existingData,
            cursos: []  // Añadir campo cursos si no existe
          }, { merge: true });
        }
      }

      setUser({
        logged: true,
        nombre: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        cursos: userSnapshot.exists() ? userSnapshot.data().cursos : [],
      });

      console.log("Inicio de sesión con Google exitoso:", result);
    } catch (error) {
      console.error("Error en Google Login:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "usuarios", firebaseUser.uid); // Usar UID como identificador
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser({
            logged: true,
            nombre: firebaseUser.displayName,
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            photoURL: firebaseUser.photoURL,
            cursos: userData.cursos || []
          });
        } else {
          setUser({
            logged: true,
            nombre: firebaseUser.displayName,
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            photoURL: firebaseUser.photoURL,
            cursos: []
          });
        }
      } else {
        setUser({
          logged: false,
          nombre: null,
          email: null,
          uid: null,
          photoURL: null,
          cursos: []
        });
      }
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
