'use client'
import { useEffect, useState } from 'react';
import PlataformNavBar from '../components/PlataforNavbar';
import { useAuthContext } from '../components/context/AuthContext';
import Login from '../components/Login';

export default function PlataformaLayout({ children }) {
  const { user } = useAuthContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {user?.logged ? <PlataformNavBar /> : null}
      <main className="flex-grow">
        {user?.logged ? children : <Login />}
      </main>
    </div>
  );
}
