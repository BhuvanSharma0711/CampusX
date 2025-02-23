import Navigationbar from "@/components/Navigationbar";
import "./globals.css";
import {Providers} from "./providers";

export const metadata = {
  title: "𝒞αмρυѕ✘",
  description: "Your AI-powered campus guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigationbar></Navigationbar>
        <main>
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
