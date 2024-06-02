import Navbar from "@/components/shared/Navbar";
import Sidebar from "./_components/Sidebar";

export const metadata = {
  title: "CSIT Portal",
  description:"The warehouse for CSIT students. The best platform we proudly call out.",
};

export default function RootLayout({ children}) {
  return (
    <>
        <Navbar/>
        <div className='h-[calc(100dvh-48px)] grid grid-cols-[230px_auto] flex-grow'>
            <Sidebar />
            <div className="max-h-[full] overflow-auto">
              {children}
            </div>
        </div>
    </>
  );
}
