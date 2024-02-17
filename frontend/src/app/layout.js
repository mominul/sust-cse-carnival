import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";

// const inter = Inter({ subsets: ["latin"] });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Best Deal",
  description: "Get the best deal on your favorite products.",

  // icons: {
  //   icon: "../../public/logo.ico", // /public path
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Header />

        {children}
      </body>
    </html>
  );
}
