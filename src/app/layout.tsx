"use client";

import "./globals.css";
import "antd/dist/reset.css";
import { ThemeProvider } from "./context/ThemeContext";
import { LoadingProvider } from "./components/LoadingProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AntdRegistry>
          <ThemeProvider>
            <LoadingProvider>
              {children}
            </LoadingProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
