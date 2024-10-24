import "./globals.css"

import Provider from "@/trpc/Provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-200`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
