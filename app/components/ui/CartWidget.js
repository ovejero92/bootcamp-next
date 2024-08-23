'use client'
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import Image from "next/image"

const CartWidget = () => {
    const {totalQty} = useCartContext();

    return (
        <Link href={"/cart"} className={"text-base text-slate-100 p-3 flex items-center"}>
        <Image 
        src={"/cart-icon.svg"}
        alt="Cart icon"
        width={45}
        height={45}
        />
        <span>{totalQty()}</span>
        </Link>
    )
}
export default CartWidget