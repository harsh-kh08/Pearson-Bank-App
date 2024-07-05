import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = { firstName: "Harsh", lastName: "Khandelwal" }


  return (
    <main className="flex h-screen w-full font-inter" >
      <Sidebar user={loggedIn} />
      < div className="flex size-full flex-col" >
        <div className="root-layout" >
          <Image src='/icons/pearson.svg' width={30} height={30} alt="Menu-Icon" />

          < div >
            <MobileNavbar user={loggedIn} />
          </div>

        </div>
        {children}
      </div>

    </main>

  );
}
