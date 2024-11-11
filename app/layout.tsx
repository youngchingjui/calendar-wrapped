import { Footer } from "@/components/Footer";
import "@/globals.css";
import { GeistSans } from "geist/font/sans";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
