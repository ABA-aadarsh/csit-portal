import "./globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import localFont from "next/font/local"
const segeo = localFont({
  src: [
    {
      path: "../../public/fonts/segoe-ui.ttf",
      display: 'swap'
    }
  ],
  variable: '--font-segeo'
})

export const metadata = {
  title: 'CSIT Portal - Home',
  description: 'Your ultimate resource for CSIT learning, providing structured courses, question banks, interactive content, and more to help students excel.',
  keywords: 'CSIT, computer science, information technology, learning, courses, question bank, interactive content, exams, students, Nepal, computer science and information technology, syllabus'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${segeo.className} mobile:text-[14px]`}>
      <body >
        {children}
      <ToastContainer/>
      </body>
    </html>
  );
}
