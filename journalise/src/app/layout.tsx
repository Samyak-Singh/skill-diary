"use client"

import NavBar from '@/components/NavBar';
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react';
import Copyright from '@/components/Copyright';
import { createTheme } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export const meta: Metadata = {
  title: 'Journalise',
  description: 'Journalise, Unveil Your Weekly Progress Through AI-Powered Journal Analysis',
  viewport: 'width=device-width, initial-scale=1.0',
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
  ],
  manifest: "/site.webmanifest",
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <SessionProvider>
      <body className={inter.className} >
          <NavBar />
          {
            children
          }
          <Copyright theme={theme} sx={{ mt: 5 }} />
        </body>
      </SessionProvider>
    </html>
  )
}
