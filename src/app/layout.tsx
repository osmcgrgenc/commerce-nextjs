import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { NhostProvider } from "@/lib/nhost/provider";
import { Toaster } from "sonner";
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liman Design - Modern Mobilya",
  description: "Modern ve şık mobilyalar için doğru adres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <NhostProvider>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
          <Toaster />
        </NhostProvider>
      </body>
    </html>
  );
}
