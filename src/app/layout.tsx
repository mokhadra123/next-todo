import type { Metadata } from "next";
import { interSans, poppinsSans, rubikSans } from "@/lib/fonts";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

export const metadata: Metadata = {
  title: "TODO APP",
  description: "The most beauty TODO APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubikSans.variable} ${interSans.variable} ${poppinsSans.variable} antialiased`}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
