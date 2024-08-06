import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

// podes hacer metadata estatica ⬇️
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  openGraph: {
    title: "Next application",
    description:"This is a app from curso Next-js",
    type:"article"
  }
};
// podes hacer metadata dinamica ⬇️
/*
export async function generateMetadata({params}) {
   const id = params.id
   cont info = await fetch(`http://.../${id}`).then((res) => res.json());
   return {
   title: info.title,
   description: info.description
   }
}
*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex flex-col min-h-screen">
       <Navbar />
       <main className="flex-grow">
        {children}
       </main>
       <Footer />
      </div>    
      </body>
    </html>
  );
}
