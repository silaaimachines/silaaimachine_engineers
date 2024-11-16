import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Script from "next/script";
import Head from "next/head";

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
    default: "Silaaimachine Engineers | Service Bhi Sales Bhi",
    template: "%s | Silaaimachine Engineers",
  },

  description:
    "At Silaaimachine Engineers, we believe in offering more than just great products – that's why we say, 'Service bhi, Sales bhi.' Whether you're looking for home sewing machines or industrial-grade equipment, we provide high-quality options from trusted brands like Singer, Brother, Usha, Jack, Juki, etc. Shop with us for the best deals, expert advice, and after-sales support that ensures you get the most out of your sewing experience.",

  keywords:
    "Silaaimachine Engineers, Sewing Machine, sewing machines online, buy sewing machines India, best sewing machines for home use, automatic sewing machines, industrial sewing machines, sewing machine sale India, sewing machine price India, domestic sewing machines, heavy-duty sewing machines, portable sewing machines, buy Singer sewing machine, Usha sewing machines India, Jack sewing machines India, Juki sewing machines India, Brother sewing machine online, sewing machine accessories, affordable sewing machines, sewing machine for beginners, electric sewing machine online, sewing machine for tailoring, online fabric sewing machine, best sewing machine brands in India, sewing machine repair services India, buy embroidery sewing machine, quilting sewing machines India, handheld sewing machines India",

  openGraph: {
    title: "Silaaimachine Engineers | Service Bhi Sales Bhi",
    type: "website",
    url: "https://silaaimachines.com",
    siteName: "Silaaimachine Engineers",
    description:
      "At Silaaimachine Engineers, we believe in offering more than just great products – that's why we say, 'Service bhi, Sales bhi.' Whether you're looking for home sewing machines or industrial-grade equipment, we provide high-quality options from trusted brands like Singer, Brother, Usha, Jack, Juki, etc. Shop with us for the best deals, expert advice, and after-sales support that ensures you get the most out of your sewing experience.",
    images: [""],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <Head>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1306533554041867');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=1306533554041867&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>
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
