import type { Metadata } from "next";
// Imported IBM_Plex text font from google font
import { Inter,IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"],variable:'--font-inter' });
// Created Font IBMPlexSerif
const ibmPlexSerif = IBM_Plex_Serif({subsets:['latin'],weight:['400','700'],
  variable:'--font-inter'
})
export const metadata: Metadata = {
  title: "Pearson Bank",
  description: "Pearson is a revolutionary modern banking platform",
  icons:{
    icon:'/icons/pearson.svg'
  }
};
// Adding classname like ${inter.variable} and ${ibmPlexSerif.variable} will allow us to use these fonts types across application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>{children}</body>
    </html>
  );
}
