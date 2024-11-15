import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Head from 'next/head';
import { AuthProvider } from "./auth-provider";
import "react-toastify/dist/ReactToastify.css";
import "@/ui/themes/GlobalStyling.scss"

export const metadata: Metadata = {
  title: "",
  description: "",
};

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content=""
        />
        <meta
          name="keywords"
          content="David, Francisco, Blandón, Mena, franccoina, frn!, Riwi"
        />
        <meta name="sitedomain" content="https://example.com/" />
        <meta name="organization" content="frn!, riwi" />
        <meta name="author" content=" David Francisco Blandón Mena" />
        <meta name="designer" content="David Francisco Blandón Mena" />
        <meta name="copyright" content="© 2024. Todos los derechos reservados." />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="revisit-after" content="15days" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={urbanist.className}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
