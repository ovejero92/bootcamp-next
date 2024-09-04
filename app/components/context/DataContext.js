'use client'
import { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [carreras, setCarreras] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [carrerasResponse, cursosResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carreras`, { cache: "no-store" }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cursos`, { cache: "no-store" })
        ]);

        if (!carrerasResponse.ok || !cursosResponse.ok) {
          throw new Error("Error al cargar los datos");
        }

        const carrerasData = await carrerasResponse.json();
        const cursosData = await cursosResponse.json();

        setCarreras(carrerasData);
        setCursos(cursosData);
      } catch (err) {
        setError("No se pudieron cargar los datos. Por favor, intente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ carreras, cursos, isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
};
