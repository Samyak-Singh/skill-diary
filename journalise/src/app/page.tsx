"use client"

import About from '@/components/About'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import JournalInput from '@/components/JournalInput'
import { useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />

      <About />

      <Footer />
    </main>
  )
}
