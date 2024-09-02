'use client'
import React, { useState } from 'react';
import { useAuthContext } from './context/AuthContext';
import '../globals.css'; // Asegúrate de que los estilos globales estén configurados correctamente

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { registerUser, loginUser, googleLogin } = useAuthContext();
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar el error

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reinicia el mensaje de error antes de intentar iniciar sesión o registrarse

    try {
      if (isSignUp) {
        await registerUser(values); // Registra un usuario nuevo
      } else {
        await loginUser(values); // Inicia sesión si no es un registro
      }
    } catch (error) {
      setErrorMessage(error.message); // Muestra el mensaje de error si ocurre alguno
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className='w-full flex-shrink-0 p-6'>
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isSignUp ? 'Sign Up' : 'Login'}
          </h2>
          {/* Formulario de Registro */}
          {isSignUp && (
            <input
              type="text"
              required
              name='nombre'
              value={values.nombre}
              placeholder="Nombre"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            required
            name='email'
            value={values.email}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <input
            type="password"
            name='password'
            required
            value={values.password}
            placeholder="Contraseña"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <div className='flex h-[3.4rem]'>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
          <button onClick={googleLogin}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 64 64">
<radialGradient id="95yY7w43Oj6n2vH63j6HJa_fQDK2sCN4Eh1_gr1" cx="31.998" cy="34.5" r="30.776" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f4e9c3"></stop><stop offset=".219" stopColor="#f8eecd"></stop><stop offset=".644" stopColor="#fdf4dc"></stop><stop offset="1" stopColor="#fff6e1"></stop></radialGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJa_fQDK2sCN4Eh1_gr1)" d="M63.97,30.06C63.68,32.92,61.11,35,58.24,35H53c-1.22,0-2.18,1.08-1.97,2.34	c0.16,0.98,1.08,1.66,2.08,1.66h3.39c2.63,0,4.75,2.28,4.48,4.96C60.74,46.3,58.64,48,56.29,48H51c-1.22,0-2.18,1.08-1.97,2.34	c0.16,0.98,1.08,1.66,2.08,1.66h3.39c1.24,0,2.37,0.5,3.18,1.32C58.5,54.13,59,55.26,59,56.5c0,2.49-2.01,4.5-4.5,4.5h-44	c-1.52,0-2.9-0.62-3.89-1.61C5.62,58.4,5,57.02,5,55.5c0-3.04,2.46-5.5,5.5-5.5H14c1.22,0,2.18-1.08,1.97-2.34	C15.81,46.68,14.89,46,13.89,46H5.5c-2.63,0-4.75-2.28-4.48-4.96C1.26,38.7,3.36,37,5.71,37H13c1.71,0,3.09-1.43,3-3.16	C15.91,32.22,14.45,31,12.83,31H4.5c-2.63,0-4.75-2.28-4.48-4.96C0.26,23.7,2.37,22,4.71,22h9.79c1.24,0,2.37-0.5,3.18-1.32	C18.5,19.87,19,18.74,19,17.5c0-2.49-2.01-4.5-4.5-4.5h-6c-1.52,0-2.9-0.62-3.89-1.61S3,9.02,3,7.5C3,4.46,5.46,2,8.5,2h48	c3.21,0,5.8,2.79,5.47,6.06C61.68,10.92,60.11,13,57.24,13H55.5c-3.04,0-5.5,2.46-5.5,5.5c0,1.52,0.62,2.9,1.61,3.89	C52.6,23.38,53.98,24,55.5,24h3C61.71,24,64.3,26.79,63.97,30.06z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJb_fQDK2sCN4Eh1_gr2" x1="29.401" x2="29.401" y1="4.064" y2="106.734" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ff5840"></stop><stop offset=".007" stopColor="#ff5840"></stop><stop offset=".989" stopColor="#fa528c"></stop><stop offset="1" stopColor="#fa528c"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJb_fQDK2sCN4Eh1_gr2)" d="M47.46,15.5l-1.37,1.48c-1.34,1.44-3.5,1.67-5.15,0.6c-2.71-1.75-6.43-3.13-11-2.37	c-4.94,0.83-9.17,3.85-11.64,7.97l-8.03-6.08C14.99,9.82,23.2,5,32.5,5c5,0,9.94,1.56,14.27,4.46	C48.81,10.83,49.21,13.66,47.46,15.5z"></path></svg></button>
          </div>
          <div className='flex justify-between mt-4'>
            <button 
              type="button" 
              className="text-blue-500 hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
