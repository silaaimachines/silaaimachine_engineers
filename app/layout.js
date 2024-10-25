import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

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
  title: "Silaaimachine Engineers: Sales Bhi Service Bhi",
  description: "Sales Bhi... Service Bhi...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Floating Contact Icons */}
          <div className="fixed right-5 bottom-10 space-y-4 hidden md:flex lg:flex flex-col z-50">
            <a
              href="https://wa.me/+919437782677"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-green-500 text-white rounded-full"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="tel:+919437782677"
              className="p-3 bg-blue-500 text-white rounded-full"
              aria-label="Call us"
            >
              <FaPhoneAlt size={24} />
            </a>
            <a
              href="mailto:satya.silaaimachines@gmail.com"
              className="p-3 bg-red-500 text-white rounded-full"
              aria-label="Email us"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
