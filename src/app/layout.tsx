import "@styles/globals.css";
import type { Metadata } from "next";

const roboto = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";

export const metadata: Metadata = {
  title: "Salaire brut en net",
  description: "Une application servant à convertir les taux brut/net",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href={roboto} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
