'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/components/ui/loading';

const Payment = () => {
    const { carreras } = useParams(); // Renombrado a 'id' para mayor claridad
    const ruta = useRouter();
    const [loading, setLoading] = useState(true);
    const [CR, setCR] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        nombre: '',
        apellido: '',
        phone: '',
        documento: '',
        Ntarjeta: '',
        NombreTitular: '',
        ApellidoTitular: '',
        FechaVencimiento: '',
        CodigoSeguridad: ''
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Función para llenar los campos con datos ficticios
    const autofillCardData = () => {
        setFormData({
            ...formData,
            Ntarjeta: 4242424242424242,
            NombreTitular: 'Juan',
            ApellidoTitular: 'Perez',
            FechaVencimiento: '12/25',
            CodigoSeguridad: '123'
        });
    };

    const handlePayment = async () => {

          // Verificación de los datos de la tarjeta con los datos ficticios
          const tarjetaValida = formData.Ntarjeta === 4242424242424242 &&
          formData.NombreTitular === 'Juan' &&
          formData.ApellidoTitular === 'Perez' &&
          formData.FechaVencimiento === '12/25' &&
          formData.CodigoSeguridad === '123';

      if (!tarjetaValida) {
          alert('Los datos de la tarjeta son incorrectos.');
          return;
      }


        try {
            const response = await fetch('/api/pago', { // Cambié la ruta a '/api/pago' que es relativa en Next.js
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    curso: CR?.nombre,
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    phone: formData.phone,
                    documento: formData.documento
                }),
            });
   
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                ruta.push('/'); // Rediriges después del pago
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al realizar el pago:', error);
            alert('Hubo un error al procesar el pago.');
        }
    };

    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const response = await fetch(`http://${process.env.VERCEL_URL}/api/carreras`, {
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error("Error en la solicitud al servidor.");
                }

                const data = await response.json();
                // Aquí comparamos el ID único de Firebase
                const fetchedData = data.find(c => String(c.id) === String(carreras));
                if (fetchedData) {
                    setCR(fetchedData);
                } else {
                    setError("Carrera no encontrada.");
                }
                setLoading(false);

            } catch (err) {
                setError("No se pudieron cargar los datos. Por favor, intente más tarde.");
                setLoading(false);
            }
        };
        fetchCarreras();
    }, [carreras]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    if (error) {
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
                            <p className="message__text">{error}</p>
                        </div>
                        <div className="error__nav e-nav">
                            <button className="e-nav__link" onClick={() => ruta.replace("/")}>Volver al inicio</button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div>
            <h4 className='text-xl p-6 font-black'>Elige un medio de pago</h4>
            <div className='p-4 flex justify-between border-2 border-gray-300 w-4/5 rounded m-auto mt-2'>
                <div>Tarjeta de crédito</div>
                <div className='flex'>
                    <Image className='mr-2' src='https://coder-ui-static-content.coderhouse.com/checkout-statics/icons/cards/visa.svg' width={24} height={36} alt="Visa" />
                    <Image src='https://coder-ui-static-content.coderhouse.com/checkout-statics/icons/cards/mastercard.svg' height={36} width={24} alt="Mastercard" />
                </div>
            </div>
            <div className='p-4 flex justify-between border-2 border-gray-300 w-4/5 rounded m-auto mt-2'>
                <div>Tarjeta de débito</div>
                <div className='flex'>
                    <Image className='mr-2' src='https://coder-ui-static-content.coderhouse.com/checkout-statics/icons/cards/visa.svg' width={24} height={36} alt="Visa" />
                    <Image src='https://coder-ui-static-content.coderhouse.com/checkout-statics/icons/cards/mastercard.svg' height={36} width={24} alt="Mastercard" />
                </div>
            </div>
            <div className='p-4 flex justify-between border-2 border-gray-300 w-4/5 rounded m-auto mt-2'>
                <div> &#8646; transferencia o deposito</div>
            </div>
            <div>
                <div className='flex justify-between'>
                <h4 className='text-xl p-6 font-black'>Datos de la tarjeta</h4>
                <button className='p-2 w-[11rem] h-[3rem] mr-12 mt-4 bg-blue-200 rounded' onClick={autofillCardData}>
                        Usar datos ficticios
                    </button>
                </div>
                <div className='flex flex-col items-center'>
                    <label>Número de la tarjeta</label>
                    <input
                        type='number'
                        placeholder='ej: 9999 9999 9999 9999'
                        name='Ntarjeta'
                        value={formData.Ntarjeta}
                        onChange={handleInputChange}
                        className='p-2 bg-gray-200 w-4/5 rounded pl-6 border-2 border-gray-400 mb-4'
                    />
                </div>
                <div  className='flex flex-col items-center'>
                    <label>Nombre del titular</label>
                    <input
                        type='text'
                        placeholder='ej: Gustavo'
                        name='NombreTitualar'
                        value={formData.NombreTitular}
                        onChange={handleInputChange}
                        className='p-2 bg-gray-200 w-4/5 rounded pl-6 border-2 border-gray-400 mb-4'
                    />

                </div>
                <div  className='flex flex-col items-center mb-4'>
                    <label>Apellido del titular</label>
                    <input
                        type='text'
                        placeholder='ej: Ovejero'
                        value={formData.ApellidoTitular}
                        onChange={handleInputChange}
                        name='ApellidoTitualar'
                        className='p-2 bg-gray-200 w-4/5 rounded pl-6 border-2 border-gray-400'
                    />

                </div>
                <div className='flex justify-center'>
                <div className='flex flex-col items-center'>
                    <label>Fecha de vencimiento</label>
                    <input
                        type='text'
                        placeholder='MM/AA'
                        name='FechaNacimiento'
                        value={formData.FechaVencimiento}
                        onChange={handleInputChange}
                         className='p-2 bg-gray-200 w-1/2 rounded pl-6 border-2 border-gray-400'
                    />
                </div>
                <div className='flex flex-col items-center'>
                   <label>Codigo de seguridad</label>
                    <input
                        type='text'
                        placeholder='CVV'
                        name='CodigoSeguridad'
                        value={formData.CodigoSeguridad}
                        onChange={handleInputChange}
                        className='p-2 bg-gray-200 w-1/2 rounded pl-6 border-2 border-gray-400'
                    />
                </div>

                </div>
            </div>
            <div>
                <h4 className='text-xl p-6 font-black'>Datos de facturación y usuario</h4>
                <div className='flex justify-center'>
                <div className='flex flex-col items-center'>
                    <label>Nombre</label>
                    <input
                        type='text'
                        name='nombre' onChange={handleInputChange}
                        className='p-2 bg-gray-200 w-11/12 rounded pl-6 border-2 border-gray-400'
                    />
                </div>
                <div className='flex flex-col items-center'>
                   <label>Apellido</label>
                    <input
                        type='text'
                        name='apellido' onChange={handleInputChange}
                        className='p-2 bg-gray-200 w-11/12 rounded pl-6 border-2 border-gray-400'
                    />
                </div>

                </div>
                <div className='flex flex-col items-center'>
                    <label>Email</label>
                    <input
                        type='email'
                        placeholder='ejemplo@ejemplo.com'
                        name='email'
                        onChange={handleInputChange}
                        className='p-2 bg-gray-200 w-4/5 rounded pl-6 border-2 border-gray-400 mb-4'
                    />
                </div>
                <div  className='flex flex-col items-center'>
                    <label>Telefono</label>
                    <input
                        type='number'
                        placeholder='1146648615'
                        name='phone'
                        onChange={handleInputChange} 
                        className='p-2 bg-gray-200 w-4/5 rounded pl-6 border-2 border-gray-400 mb-4'
                    />

                </div>
                <div  className='flex flex-col items-center mb-4'>
                    <label>Numero de documento</label>
                    <input
                        type='number'
                        placeholder='49845564'
                        name='documento'
                        onChange={handleInputChange} 
                        className='p-2 bg-gray-200 w-4/5 rounded pl-6 border-2 border-gray-400'
                    />

                </div>
            </div>
            <div className='relative'>
            <div className='absolute top-8 right-10'>$ {CR.price} <span className='text-[.7rem] text-gray-500'>ARS</span></div>
            <h4 className='text-2xl p-6 font-black'>Carrera a pagar</h4>
            <p className='pl-6 text-xl'> {CR.nombre} </p>
            <ul className='p-6'>
    {CR.cursos.map((cu, index) => 
        <li key={index}>- {cu}</li>
    )}
</ul>

            </div>

            <div className='flex justify-around mt-4'>
            <div>
            <p>Total:</p>
            <p>$ {CR.price} <span className='text-[.7rem] text-gray-500'>ARS</span></p>
            </div>
            <div>
            <button className='p-3 rounded-xl bg-yellow-200' onClick={ () => ruta.back() }>Atrás</button>
            <button className='p-3 rounded-xl bg-gray-200 text-gray-400 ml-2' onClick={handlePayment}>Pagar</button>
            </div>
            </div>


        </div>
    );
};

export default Payment;
