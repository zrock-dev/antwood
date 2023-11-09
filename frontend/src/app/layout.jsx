/* eslint-disable @next/next/no-sync-scripts */
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ['latin'] })
import { Toaster } from "sonner";

export const metadata = {
  title: 'Solestyle',
  description: 'E-Commerce for sneakers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="logo.svg" />
      </head>
      <body className={inter.className}>
        <Toaster richColors />
        <AuthProvider>{children}</AuthProvider>
        <script
          src="https://kit.fontawesome.com/76fc76e1bc.js"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
