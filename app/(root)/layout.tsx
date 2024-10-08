import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import { getUserInfo } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/appwrite";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const loggedIn = await getLoggedInUser();

  // New Code

  // const usernew = await getLoggedInUser();
  // const loggedIn = await getUserInfo({ userId: usernew?.$id });

  if (!loggedIn) redirect('/sign-in')

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
