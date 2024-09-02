'use client';
import { auth, provider } from "@/firebase/config";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore"; // Firestore imports

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    nombre: null,
    apellido:null,
    email: null,
    uid: null,
    photoURL: null, // Incluye la URL de la imagen
    cursos: []      // Agrega campo cursos
  });

  const db = getFirestore();  // Instancia de Firestore

  const registerUser = async (values) => {
    try {
      // Registrar el usuario
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;
      const userDats = doc(db, "usuarios", newUser.email)
      const userSnapsDats = getDoc(userDats)

      if(!(await userSnapsDats).exists()){
      // Crear el documento del usuario en Firestore con un campo cursos vacío
      await setDoc(userDats, {
        email: newUser.email,
        nombre: values.nombre || null,  // Puedes usar el nombre del formulario si lo tienes
        cursos: []  // Inicialmente, sin cursos
      });
      } else {
        const existingData = (await userSnapsDats).data();

       await setDoc(userDats, {
        ...existingData,
       })
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
    await signOut(auth);
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Referencia al documento del usuario en Firestore
      const userRef = doc(db, "usuarios", user.email);
      const userSnapshot = await getDoc(userRef);
  
      // Si el usuario no tiene documento en Firestore, crea uno con cursos inicializados
      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          email: user.email,
          nombre: user.displayName || null,
          cursos: []  // Inicialmente, sin cursos
        });
      } else {
        // Si el documento ya existe, obtenemos los datos existentes
        const existingData = userSnapshot.data();
        
        // Verificamos si tiene el campo "cursos", si no lo tiene lo agregamos
        if (!existingData.cursos) {
          await setDoc(userRef, {
            ...existingData,
            cursos: []  // Añadir campo cursos si no existe
          }, { merge: true });
        }
      }
  
      // Actualiza el estado del usuario localmente
      setUser({
        logged: true,
        nombre: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        cursos: userSnapshot.exists() ? userSnapshot.data().cursos : [],  // Si el documento existe, toma los cursos
      });
  
      console.log("Inicio de sesión con Google exitoso:", result);
    } catch (error) {
      console.error("Error en Google Login:", error.message);
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Referencia al documento del usuario en Firestore
        const userRef = doc(db, "usuarios", firebaseUser.uid);
        const userSnapshot = await getDoc(userRef);
  
        // Verifica si el usuario ya tiene un documento en Firestore
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser({
            logged: true,
            nombre: firebaseUser.displayName,
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            photoURL: firebaseUser.photoURL,
            cursos: userData.cursos || []  // Inicializa cursos si existe
          });
        } else {
          // En caso de que no exista, inicializa con cursos vacíos
          setUser({
            logged: true,
            nombre: firebaseUser.displayName,
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            photoURL: firebaseUser.photoURL,
            cursos: []  // Inicializa cursos vacío
          });
        }
      } else {
        setUser({
          logged: false,
          nombre: null,
          email: null,
          uid: null,
          photoURL: null,
          cursos: []  // Reiniciar cursos al cerrar sesión
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
