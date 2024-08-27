'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCartContext } from '../context/CartContext';
import Image from 'next/image';

const CartWidget = () => {
  const { totalQty } = useCartContext();
  const [animateHeart, setAnimateHeart] = useState(false);
  const [prevQty, setPrevQty] = useState(totalQty());

  // Verificar si la cantidad cambió para iniciar la animación
  useEffect(() => {
    if (totalQty() > prevQty) {
      setAnimateHeart(true);
      setPrevQty(totalQty());
      setTimeout(() => setAnimateHeart(false), 600); // Duración de la animación
    }
  }, [totalQty, prevQty]);

  return (
    <Link href={"/cart"} className={"text-base text-slate-100 p-3 flex items-center relative"}>
         <Image 
         src={"/cart-icon.svg"}
         alt="Cart icon"
         fill=''
         width={45}
         height={45}
         />
      <span
        className={`text-[5rem] absolute  -right-[0.7rem] top-[1.5rem]   ${animateHeart ? 'heart-animation opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ fontFamily: 'Arial', color: 'red' }}
      >
        &#9825;
      </span>
      {totalQty() > 0 && (<span className="ml-2">{totalQty()}</span>)}
      
    </Link>
  );
};

export default CartWidget;
