import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter ">

      {children}

      <div className="auth-asset">
        <div className="flex justify-center items-center">
          <Image src='/icons/bank-building.svg' alt="Auth image" width={300} height={300}></Image>
        </div>
      </div>

    </main>

  );
}
