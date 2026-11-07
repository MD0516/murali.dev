import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/theme.css";
import "../styles/globals.scss";
import Provider from "./provider";
import { Toaster } from "sonner";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://murali-dev.vercel.app"),

  title: {
    default: "Murali Dharan | Full-Stack Developer",
    template: "%s | Murali Dharan",
  },

  description:
    "Murali Dharan is a full-stack developer building thoughtful digital experiences with React, Next.js, Node.js, and modern web technologies.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://murali-dev.vercel.app",
    siteName: "Murali Dharan",
    title: "Murali Dharan | Full-Stack Developer",
    description:
      "Building thoughtful digital experiences, from concept to deployment.",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Murali Dharan | Full-Stack Developer",
    description:
      "Building thoughtful digital experiences, from concept to deployment.",
    images: ["/opengraph-image"],
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
      suppressContentEditableWarning
    >
      <head>
        <link id="app-favicon" rel="icon" href="/favicon-dark.ico" suppressContentEditableWarning />
        <Script id="theme-sync" strategy="beforeInteractive">
          {`
            try {
              if (localStorage.getItem("md_port_theme") === "light") {
                document.documentElement.classList.add("light");
              }
            } catch {}
          `}
        </Script>
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
