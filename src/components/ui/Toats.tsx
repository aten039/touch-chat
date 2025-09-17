'use client'
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast'

export default function Toats() {
const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // No renderiza nada en el servidor
  }
  return (
    <Toaster 
    toastOptions={{
    duration: 3000,
    removeDelay: 2000}}
    />
  )
}
