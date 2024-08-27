'use client'
import { useState } from "react";
import { useCartContext } from "../components/context/CartContext";
import '../globals.css'; // Asegúrate de que esta importación funcione correctamente

const CartPage = () => {
    const { cart, removeToCart } = useCartContext();
    const [activeTab, setActiveTab] = useState('carreras');

    // Filtrar carreras y cursos
    const carreras = cart.filter(item => item.top === 'carreras');
    const cursos = cart.filter(item => item.top === 'cursos');

    return (
        <main className="container m-auto">
            <h2 className="text-2xl my-10 border-b pb-4 text-center">Tus cursos o carreras a pagar</h2>

            <div className="flex border-b">
                <button
                    className={`p-4 flex-1 text-center ${activeTab === 'carreras' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('carreras')}
                >
                    Carreras
                </button>
                <button
                    className={`p-4 flex-1 text-center ${activeTab === 'cursos' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('cursos')}
                >
                    Cursos
                </button>
            </div>

            <ul className="mt-4">
                {(activeTab === 'carreras' ? carreras : cursos).length > 0 ? (
                    (activeTab === 'carreras' ? carreras : cursos).map((item) => (
                        <li
                            key={item.id}
                            className="p-4 mb-2 border rounded relative flex shadow-md bg-white"
                        >
                            <div className="w-2/3">
                                <p><strong>Nombre:</strong> {item.nombre}</p>
                                <p><strong>Precio:</strong> ${item.price}</p>
                                <p><strong>Cantidad semanas:</strong> {item.cant_semanas}</p>
                                <p><strong>Categoría:</strong> {item.tipo}</p>
                            </div>
                            <div className="flex justify-center items-center w-1/3">
                                <button className="relative overflow-hidden rounded-xl bg-indigo-950 h-[4rem] w-[7rem]">
                                    <span className="text-white z-10 relative ">Inscribirme ahora</span>
                                    <div className="absolute inset-0 animate-shine"></div>
                                </button>
                            </div>
                            <button className="absolute top-2 right-2" onClick={()=>removeToCart(item.id)}>❌</button>
                        </li>
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        <div className="flex justify-center mt-24">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwIltRB98LyiTHaSlP3fO1tD5mDxQLmjR8w&s" alt="Imagen carrito vacio" width={200} height={100}/>
                        </div>
                        <p>No hay elementos en esta categoría.</p>
                    </div>
                )}
            </ul>
        </main>
    )
}

export default CartPage;
