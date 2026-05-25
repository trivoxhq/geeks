import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import { HomePageBackground } from "@/components/layout/HomePageBackground";
import Header from "@/components/layout/Header";
import { ModalOverlayProvider } from "@/components/layout/ModalOverlayProvider";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { fontInter, fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "amz-geeks",
    template: "%s | amz-geeks",
  },
  description: "Amazon Geeks — modern professional platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} h-full scroll-smooth antialiased`}
    >
      <body
        className={`${fontInter.className} relative min-h-full flex flex-col bg-background text-foreground`}
      >
        <ModalOverlayProvider>
          <HomePageBackground />
          <Header />
          <main className="relative z-10 flex-1">
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </main>
          <Footer />
        </ModalOverlayProvider>
      </body>
    </html>
  );
}
