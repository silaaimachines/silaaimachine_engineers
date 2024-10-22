import localFont from "next/font/local";
import "./globals.css";
import DesktopHeader from "./_components/DesktopHeader";
import MobileHeader from "./_components/MobileHeader";
import Footer from "./_components/Footer";


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
        <DesktopHeader/>
        <MobileHeader/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
