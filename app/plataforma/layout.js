'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PlataformNavBar from '../components/PlataforNavbar';
import Footer from '../components/Footer';

export default function PlataformaLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Lógica para verificar la autenticación del usuario
    // Aquí se debería implementar la verificación real
    const userIsAuthenticated = false; // Cambia esto con la lógica real

    if (!userIsAuthenticated) {
      router.push('/login'); // Redirige al login si no está autenticado
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // No renderiza nada mientras redirige
  }

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <PlataformNavBar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
