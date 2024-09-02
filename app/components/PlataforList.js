import React from "react";
import Link from "next/link";
import Image from 'next/image';


const PlataforList = ({open, handleClose}) => {
  return (
    <div className={`${open ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300 fixed inset-0 bg-black/50 flex z-50 justify-start`}>
      <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 w-64 bg-gray-700`}>
        <div onClick={handleClose} className="p-4 cursor-pointer text-white">❌</div>
        <nav className="flex flex-col mt-4 text-white">
         <ul className="flex flex-col">
         <Link href={'/plataforma'} className="p-2 hover:bg-gray-600">
          <li className="flex pl-4">
           <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 30 30">
           <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z"></path>
          </svg> 
          <span className="pl-3 pt-2">Inicio</span>
          </li>
          </Link>
          <Link href={'/plataforma/chat'} className="p-2 hover:bg-gray-600">
          <li className="flex pl-4">
          <Image alt="icono de " src={'/chat-icon.svg'} width={40} height={40}/>
          <span className="pl-3 pt-2">Chat</span>
          </li>
          </Link>
          <Link href={'/plataforma/yourway'} className="p-2 hover:bg-gray-600">
          <li className="flex pl-4">
          <Image alt="icono de " src={'/route-icon.svg'} width={40} height={40}/>
          <span className="pl-3 pt-2">Mi ruta</span>
          </li>
          </Link>
          <br />
          <hr />
          <br />
          <Link href={'/plataforma/bitejobs'} className="p-2 hover:bg-gray-600">
          <li className="flex pl-4">
          <Image alt="icono de " src={'/briefcase-icon.svg'} width={40} height={40}/>
          <span className="pl-3 pt-2">ByteJobs</span>
          </li>
          </Link>
          <br />
          <hr />
          <br />
          <Link href={'/plataforma/productos'} className="p-2 hover:bg-gray-600">
          <li className="flex pl-4">
          <Image alt="icono de " src={'/cart-shopping-icon.svg'} width={40} height={40}/>
          <span className="pl-3 pt-2">Más cursos</span>
          </li>
          </Link>
          <br />
          <hr />
          <br />
           <Link href={'/plataforma'} className="p-2 hover:bg-gray-600">
          <li className="flex pl-4">
          <Image alt="icono de " src={'/discord-icon.svg'} width={40} height={40}/>
          <span className="pl-3 pt-2">Comunidad</span>
          </li>
          </Link>
          <Link href={'/plataforma/notificaciones'} className="p-2 hover:bg-gray-600">
          <li className="flex pl-4">
          <Image alt="icono de " src={'/notification-icon.svg'} width={40} height={40}/>
          <span className="pl-3 pt-2">Notificaciones</span>
          </li>
          </Link>
          <Link href={'/plataforma'} className="p-2 hover:bg-gray-600">
          <li className="flex pl-4">
          <Image alt="icono de " src={'/event-icon.svg'} width={40} height={40}/>
          <span className="pl-3 pt-2">Eventos</span>
          </li>
          </Link>
         </ul>
        </nav>
      </aside>
    </div>
  );
}

export default PlataforList;