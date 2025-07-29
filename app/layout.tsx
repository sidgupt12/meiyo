import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: "Meiyo",
  description: "Japanese-inspired design agency focused on mindful craftsmanship and MVP development.",
  keywords: ["MVP development", "web design", "mobile apps", "Japanese design", "craftsmanship", "startup", "agency"],
  authors: [{ name: "Meiyo Team" }],
  creator: "Meiyo",
  publisher: "Meiyo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://meiyo.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Meiyo - Your vision. Our craft. Delivered with care.",
    description: "Japanese-inspired design agency focused on mindful craftsmanship and MVP development. We honor your ideas by offering gentle guidance, clear fixed pricing, and a process built on trust.",
    url: "https://meiyo.online",
    siteName: "Meiyo",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Meiyo - Japanese-inspired design agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meiyo - Your vision. Our craft. Delivered with care.",
    description: "Japanese-inspired design agency focused on mindful craftsmanship and MVP development. We honor your ideas by offering gentle guidance, clear fixed pricing, and a process built on trust.",
    images: ["/preview.png"],
    creator: "@meiyo",
    site: "@meiyo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Meiyo" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
