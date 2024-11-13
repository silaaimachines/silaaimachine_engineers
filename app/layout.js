import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const montserrat = localFont({
  src: [
    { path: "./fonts/Montserrat-Thin.ttf", weight: "100", style: "normal" },
    {
      path: "./fonts/Montserrat-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/Montserrat-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    { path: "./fonts/Montserrat-Light.ttf", weight: "300", style: "normal" },
    {
      path: "./fonts/Montserrat-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    { path: "./fonts/Montserrat-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Montserrat-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Montserrat-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "./fonts/Montserrat-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    { path: "./fonts/Montserrat-SemiBold.ttf", weight: "600", style: "normal" },
    {
      path: "./fonts/Montserrat-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    { path: "./fonts/Montserrat-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "./fonts/Montserrat-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Montserrat-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    { path: "./fonts/Montserrat-Black.ttf", weight: "900", style: "normal" },
    {
      path: "./fonts/Montserrat-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata = {
  metadataBase: new URL("https://silaaimachines.com"), 
  title: {
    default: "Silaaimachine Engineers",
    template: "%s | Silaaimachine Engineers",
  },
  description: "Sales Bhi... Service Bhi...",
  keywords: "Silaaimachine Engineers, Sewing Machine, usha",
  openGraph: {
    description: "SSales Bhi... SeService Bhi...", 
    images: [""]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <body className="antialiased">
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
