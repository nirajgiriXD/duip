/**
 * External dependencies.
 */
import { Inter } from "next/font/google";

/**
 * Internal dependencies.
 */
import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DUIP - Discover User Internet Profile",
  description: "DUIP (Discover User Internet Profile) is a powerful and efficient tool designed to simplify the process of finding information about individuals across various platforms.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
