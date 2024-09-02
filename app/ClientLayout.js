"use client"; // Esto marca el componente como un Client Component
import { usePathname } from 'next/navigation';
import PlataformNavBar from './components/PlataforNavbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isPlataformaPage = pathname.startsWith('/plataforma');
  const isAuthPage = pathname.startsWith('/login')

  return (
    <>
      {isAuthPage ? null : (isPlataformaPage ? null : <Navbar />)}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
