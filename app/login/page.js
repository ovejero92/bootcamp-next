'use client'
import React, { useState } from 'react';
import '../globals.css'; // Asegúrate de que Tailwind CSS esté correctamente configurado

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className={`absolute inset-0 flex transition-transform duration-500 ${isSignUp ? 'translate-x-[-50%]' : 'translate-x-0'}`}>
          {/* Login Form */}
          <div className="w-full flex-shrink-0 flex flex-col p-6 space-y-4 bg-white">
            <h2 className="text-2xl font-semibold text-center">Login</h2>
            <input type="text" placeholder="Username" className="p-2 border border-gray-300 rounded" />
            <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded" />
            <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
          </div>

          {/* Sign Up Form */}
          <div className="w-full flex-shrink-0 flex flex-col p-6 space-y-4 bg-blue-500 text-white">
            <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
            <input type="text" placeholder="Username" className="p-2 border border-gray-200 rounded bg-blue-600" />
            <input type="password" placeholder="Password" className="p-2 border border-gray-200 rounded bg-blue-600" />
            <button className="p-2 bg-blue-700 rounded hover:bg-blue-800">Sign Up</button>
            <div className="absolute inset-0 flex items-center justify-center text-center text-gray-200 p-6">
              {isSignUp ? "Already have an account? Click below to log in." : "Not registered yet? Click below to sign up."}
              <button 
                className="mt-4 p-2 bg-gray-800 text-white rounded hover:bg-gray-900"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
