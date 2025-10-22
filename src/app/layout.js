import { Geist, Geist_Mono, Lexend, Playfair_Display, VT323 } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
})

export const vt = VT323({
  weight: "400",            
  subsets: ["latin"],
  variable: "--font-vt",
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "League Reel Builder",
  description: "AWS RiftRewind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${vt.variable} ${geistMono.variable} ${lexend.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
