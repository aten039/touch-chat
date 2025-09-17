'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AsideMenu from "@/components/logicalLAyout/AsideMenu";
import Toats from "@/components/ui/Toats";
import { usePathname } from "next/navigation";
import { TokenContextProvider } from "@/context/tokenContext";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname()
  const ismain = pathname === '/';

  return (
    <html lang="es">
      <TokenContextProvider>
        
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toats/>

        <div className=" flex flex-col h-screen">
          <header className=" p-4 bg-azul text-azul text-white ">
            <Link href={'/'}><h1 className=" text-2xl font-black text-center ">Touch</h1></Link>
          </header>

          <main className="flex flex-col md:flex-row flex-grow overflow-y-auto bg-gray-100 ">
            <aside className={ `${ismain ? "block" : "hidden"}  lg:block flex-1 p-2 overflow-y-auto bg-azul-claro h-full max-h-full`}>
              <AsideMenu/>
            </aside>
            <section className={ `${ismain ? "hidden" : "block"}  lg:block flex-2 overflow-y-auto p-2 bg-gray-100  h-full center max-h-full`}>
              {children}
            </section> 
          </main>
        </div>
      </body>
      
      </TokenContextProvider>
    </html>
  );
}
