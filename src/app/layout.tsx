import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agorath',
  description: 'Generated with love'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
