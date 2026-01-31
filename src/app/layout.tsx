import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AKKERT",
  description: "AKKERT – green oasis in the city",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png"
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
