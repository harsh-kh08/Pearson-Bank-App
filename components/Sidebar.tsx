'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
function Sidebar({ user }: SiderbarProps) {

    const pathName = usePathname();
    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link href="/" className='mb-12 items-center cursor-pointer gap-2 flex'>
                    <Image className='size-[45px] max-xl:size-14' alt='Pearson Logo' src='/icons/pearson.svg' width={34} height={34} />
                    <h1 className='sidebar-logo'>Pearson</h1>
                </Link>

                {sidebarLinks.map(

                    (link) => {

                        const isActive = pathName === link.route || pathName.startsWith(link.route)

                        return (

                            <Link key={link.label} href={link.route} className={cn('sidebar-link', { 'bg-[#c1555f]': isActive })}>
                                {/* <Image src={link.imgURL} width={34} height={34} alt={link.label} /> */}
                                <div className='relative size-6'>
                                    <Image src={link.imgURL} alt={link.label} fill className={cn({ 'brightness-[3] invert-0': isActive })}>

                                    </Image>
                                </div>
                                <p className={cn('sidebar-label', { '!text-white': isActive })}>{link.label}</p>
                            </Link>
                        )
                    }


                )}

            </nav>



            <Footer user={user} />


        </section>
    )
}

export default Sidebar