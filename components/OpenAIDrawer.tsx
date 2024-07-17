'use client'
import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { chatCompletion } from '@/lib/actions/openai.actions'


const OpenaiDrawer = ({ amount }: { amount: number }) => {

    // const res = await chatCompletion(amount);
    // const chat = res?.choices[0].message.content;
    // const chatArray = chat.split('#');
    const [data, setdata] = useState([]);
    const chatAi = async (amount: number) => {

        const res = await chatCompletion(amount);
        const chat = res?.choices[0].message.content;
        const chatArray = chat.split('#');
        setdata(chatArray);
    }


    // bg-[#09090b]
    return (
        <div className='flex justify-center cursor-pointer rounded-full border p-2'>


            <Drawer >
                <DrawerTrigger asChild>
                    {/* <Button variant="outline">Open Drawer</Button> */}
                    <Image onClick={() => chatAi(amount)} alt="OpenAI logo" width={32} height={32} src='/icons/openai-logo.svg'></Image>
                </DrawerTrigger>
                <DrawerContent className='gradient-background w-full max-w-md mx-auto'>

                    <div className="gradient-background flex flex-col justify-center items-center mx-auto my-2 px-4 py-3 w-full max-w-sm gap-2 border-solid border-2 rounded-lg border-[#e5e7eb]">
                        <Image src='/icons/openai-logo.svg' alt='Open Ai logo' width={30} height={30} />
                        <DrawerHeader >
                            <DrawerTitle className='flex justify-center items-center text-white'>FinanceWise</DrawerTitle>
                            <DrawerDescription className='flex justify-center items-center text-white'>Empowering Your Financial Decisions with AI</DrawerDescription>
                        </DrawerHeader>
                        <div>
                            <h2 className='text-white font-bold font-sans'>{`Balance: $${amount}`}</h2>
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='text-white'>
                                {data?.map((c: string) => (<p key={Math.random()}>{c}</p>))}
                            </p>
                        </div>

                        <DrawerFooter className='p-2 m-2'>
                            <DrawerClose asChild>
                                <Button onClick={() => setdata([])} className='bg-white min-w-52 max-w-80 font-semibold' variant="outline">Done</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>




        </div>
    )
}

export default OpenaiDrawer;