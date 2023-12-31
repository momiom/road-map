import './globals.css'
import type { Metadata } from 'next'
import '@/consts/metadata'
import AppProvider from './provider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const a = 1 + 1

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
