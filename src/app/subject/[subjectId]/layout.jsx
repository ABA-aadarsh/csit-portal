import Navbar from "@/components/shared/Navbar";
import Sidebar from "./_components/Sidebar";
import Footer from "@/components/shared/Footer";

export default function RootLayout({ children}) {
  return (
    <>
        <Navbar/>
        <div className='max-w-[1200px] mx-auto grid grid-cols-[230px_auto] flex-grow'>
            <Sidebar />
            <div className="min-h-dvh px-4">
              {children}
            </div>
        </div>
        <Footer/>
    </>
  );
}
