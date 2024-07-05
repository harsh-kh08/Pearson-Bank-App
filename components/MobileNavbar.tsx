'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Section } from 'lucide-react'
 import Image from 'next/image' 
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import { cn } from '@/lib/utils'
const MobileNavbar = ({user}:MobileNavProps) => {
       const pathName = usePathname();
  return (


    <section className='w-full max-width-[264px]'>

    <Sheet>
  <SheetTrigger>
  <Image src='/icons/hamburger.svg' alt='menu' className='cursor-pointer' width={30} height={30} />
  </SheetTrigger>
  <SheetContent side='left' className='border-none bg-white'>

    <Link href='/' className='cursor-pointer flex item-center gap-1 px-4'>
    <Image src='/icons/pearson.svg' width={34} height={34} alt='Pearson Logo'/>
   <h1 className='text-26 font-ibm-plex-serif font-medium text-[#c1555f]'> </h1>
    </Link>

<div className='mobilenav-sheet'>
  <SheetClose asChild>
<nav className='flex h-full flex-col gap-6 pt-16 text-white'>
{sidebarLinks.map(
    (link)=>{
        
   
        const isActive = pathName === link.route || pathName.startsWith(link.route)
        
        return (
<SheetClose asChild key={link.route}>
<Link key={link.label} href={link.route} className={cn('mobilenav-sheet_close w-full',{'bg-[#c1555f]':isActive})}> 
    {/* <Image src={link.imgURL} width={34} height={34} alt={link.label} /> */}
        <Image src={link.imgURL} alt={link.label} width={20} height={20} className={cn({'brightness-[3] invert-0':isActive})}>
        </Image>
        <p className={cn('text-16 font-semibold text-[#c1555f]',{'text-white':isActive})}>{link.label}</p>

     </Link>
</SheetClose>


    
     )}


    )}
</nav>


  </SheetClose>

</div>


  
  </SheetContent>

</Sheet>

    </section>
  
  )
}

export default MobileNavbar