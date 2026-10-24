import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/theme.css";
import "../styles/globals.scss";
import Provider from "./provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://murali.dev"),
  title: "Murali Dharan | Full Stack Developer",
  description:
    "Full stack developer specializing in the MERN stack — React, Node.js, Express, MongoDB. Building fast, well-structured web applications.",
  keywords: [
    "Murali Dharan",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Chennai Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Murali Dharan" }],
  creator: "Murali Dharan",

  openGraph: {
    title: "Murali Dharan | Full Stack Developer",
    description:
      "Full stack developer specializing in the MERN stack. Explore projects, skills, and experience.",
    url: "https://murali.dev",
    siteName: "Murali Dharan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // 1200x630, needs to exist in /public
        width: 1200,
        height: 630,
        alt: "Murali Dharan - Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Murali Dharan | Full Stack Developer",
    description:
      "Full stack developer specializing in the MERN stack. Explore projects, skills, and experience.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}

    >
      <head>
        <link id="app-favicon" rel="icon" href="/favicon-dark.svg" />
        <link rel="alternate icon" href="/favicon-dark.ico" />
      </head>
      <body className="min-h-full flex flex-col">
        <Provider>
          <Toaster position="top-right" richColors closeButton />
          {children}
        </Provider>
      </body>
    </html>
  );
}
