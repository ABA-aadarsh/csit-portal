import Navbar from "@/components/shared/Navbar";
import Sidebar from "./_components/Sidebar";

export const metadata = {
  title: "CSIT Portal",
  description:"The warehouse for CSIT students. The best platform we proudly call out.",
};

export default function RootLayout({ children}) {
  return (
    <div>
        <div className='h-dvh flex flex-col w-dvw'>
            <Navbar/>
            <div className='grid grid-cols-[230px_auto] flex-grow'>
                <Sidebar />
                {children}
            </div>
        </div>
    </div>
  );
}
