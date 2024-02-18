import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

import { Toaster } from "@/components/ui/sonner"
 

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


<Toaster position='bottom-left' />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
