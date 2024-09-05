'use client';
import React from 'react';const LoginAdminPage = ({ userInput, setUserInput, passwordInput, setPasswordInput, handleLogin, setShowLoginModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-4/5 ">
                <h2 className="text-2xl mb-4">Iniciar sesión</h2>
                <input 
                    type="text"
                    placeholder="Usuario"
                    value={userInput}
                    onChange={(e) => setUserInput && setUserInput(e.target.value)}  // Validamos que setUserInput exista
                    className="border p-2 mb-4 w-full"
                />
                <input 
                    type="password"
                    placeholder="Contraseña"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput && setPasswordInput(e.target.value)}  // Validamos que setPasswordInput exista
                    className="border p-2 mb-4 w-full"
                />
                <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded">Ingresar</button>
                <button onClick={() => setShowLoginModal(false)} className="bg-red-500 text-white py-2 px-4 ml-2 rounded">Cancelar</button>
            </div>
        </div>
    );
};export default LoginAdminPage;
