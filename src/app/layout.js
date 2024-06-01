import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSIT Portal",
  description:"The warehouse for CSIT students. The best platform we proudly call out.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      
      <ToastContainer/>
      </body>
    </html>
  );
}
