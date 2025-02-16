import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider"
import HomeLayout from "./HomeLayout";
export const metadata: Metadata = {
  title: "Prestige Déco - Luxury Home Decor & Furniture",
  description: "Discover exquisite luxury home decor and furniture at Prestige Déco. Elevate your living space with our premium collection of modern and timeless designs.",
  keywords: [
    "luxury home decor",
    "premium furniture",
    "modern home decor",
    "high-end furniture",
    "Prestige Déco",
    "interior design",
    "luxury living",
    "home styling",
  ],
  openGraph: {
    title: "Prestige Déco - Luxury Home Decor & Furniture",
    description: "Discover exquisite luxury home decor and furniture at Prestige Déco. Elevate your living space with our premium collection of modern and timeless designs.",
    url: "https://www.prestigedeco.com",
    siteName: "Prestige Déco",
    images: [
      {
        url: "https://www.prestigedeco.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prestige Déco - Luxury Home Decor & Furniture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestige Déco - Luxury Home Decor & Furniture",
    description: "Discover exquisite luxury home decor and furniture at Prestige Déco. Elevate your living space with our premium collection of modern and timeless designs.",
    images: ["https://www.prestigedeco.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
          <HomeLayout>
            {children}
          </HomeLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
