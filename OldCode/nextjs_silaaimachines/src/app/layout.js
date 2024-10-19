import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { EcommerceHome } from "@/ecommerce/EcommerceHome";
import NavBar from "./fonts/NavBar";
import Contact from "@/ecommerce/Contact";
import SideBar from "@/ecommerce/SideBar";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Silaaimachines: Service Bhi.. Sales Bhi..",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
       
        {/* <SideBar/> */}
        {children}
        {/*    <Contact/> */}
        {/* <EcommerceHome/> */}
        <Footer />
      </body>
    </html>
  );
}
