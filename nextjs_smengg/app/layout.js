import localFont from "next/font/local";
import "./globals.css";
import DesktopHeader from "./_components/DesktopHeader";
import MobileHeader from "./_components/MobileHeader";
import Footer from "./_components/Footer";
import Test from "./_components/Test";
import SingleProduct from "./pages/product/SingleProduct";







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
  title: "Silaaimachine Engineers",
  description: "Sales Bhi... Service Bhi...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<<<<<<< HEAD
        <DesktopHeader/>
        <MobileHeader/>
=======
        <Header/>
        {/* <Test/> */}
        <SingleProduct/>
     
>>>>>>> fd83a6a5470f6d1a3a6f2e01f3478018f1f6f85c
        {children}

        <Footer/>
      </body>
    </html>
  );
}
