import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '@/lib/constants';
import './globals.css';
import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ['latin'] });
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: `%s | Shop.co`,
    default: APP_NAME
  },
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute={`class`}
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
