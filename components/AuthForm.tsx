'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

import { z } from "zod"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { authFormSchema } from '@/lib/utils'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'



const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    /*
useForm: This is a hook from react-hook-form that initializes and returns an object with various properties and methods to manage the form state and handle form submission.
<z.infer<typeof formSchema>>: This is TypeScript syntax that infers the type of the form data from the formSchema using z.infer. This ensures that the form values adhere to the schema defined by formSchema.
resolver: zodResolver(formSchema): This uses zodResolver from @hookform/resolvers/zod to integrate Zod schema validation with react-hook-form. The formSchema is the Zod schema that defines the shape and validation rules for the form data.



    */

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {


            // Sign Up with App write & crate Plaid Token
            // We can create new account with App write
            // And we can crate Plaid token so we can start linking our bank account

            if (type === 'sign-up') {


                const userData = {
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    city: data.city!

                }


                const newUser = await signUp(userData); /* We will use form data object and will signup using signUp function which will
                helps us sign up through Appwrite */

                setUser(newUser); // This will redirect or load this component again as this setState function
                // gets executed as it is a hook and use re-render lifecycles.

            }

            if (type == 'sign-in') {

                const response = await signIn({
                    email: data.email,
                    password: data.password
                }); /* For SignIn, we only need two fields email and password so we will extract from the form data object */

                if (response) router.push('/')  /* If we got response back, we will route over to home page */



            }

        } catch (error) {
            console.log(error);
        }

        finally {
            setIsLoading(false);
        }

        setIsLoading(false);
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className='cursor-pointer flex item-center gap-1'>
                    <Image src='/icons/pearson.svg' width={34} height={34} alt='Pearson Logo' />
                    <h1 className='text-26 font-ibm-plex-serif font-medium text-[#c1555f]'>Pearson</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>

                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>{user ? 'Link Account' :
                        type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Link your account to get started' : 'Please enter your details'}
                    </p>

                </div>


            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    <PlaidLink user={user} variant='primary' />
                </div >
            ) : <>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        {type === 'sign-up' && (

                            <>
                                <div className='flex gap-4'>
                                    <CustomInput

                                        control={form.control} name='firstName' placeholder='ex. John' label='First Name'

                                    />
                                    <CustomInput
                                        control={form.control} name='lastName' placeholder='ex. Doe' label='Last Name'
                                    />
                                </div>


                                <CustomInput
                                    control={form.control} name='address1' placeholder='Enter your specific address' label='Address'
                                />
                                <CustomInput
                                    control={form.control} name='city' placeholder='ex: London' label='City'
                                />

                                <div className='flex gap-4'>
                                    <CustomInput
                                        control={form.control} name='state' placeholder='ex:NY' label='State'
                                    />

                                    <CustomInput
                                        control={form.control} name='postalCode' placeholder='ex: 11101' label='Postal Code'
                                    />

                                </div>

                                <div className='flex gap-4'>
                                    <CustomInput

                                        control={form.control} name='dateOfBirth' placeholder='yyyy-mm-dd' label='Date Of Birth'

                                    />
                                    <CustomInput
                                        control={form.control} name='ssn' placeholder='ex: 1234' label='SSN'
                                    />
                                </div>


                            </>

                        )}


                        <CustomInput control={form.control} name='email' placeholder='Enter your email' label='Email' />

                        <CustomInput control={form.control} name='password' placeholder='Enter your password' label='Password' />
                        <div className='flex flex-col gap-4 w-full'>
                            <Button disabled={isLoading} type="submit" className='form-btn gradient-background'>{isLoading ? (<><Loader2 className='animate-spin' /> &nbsp;
                                Loading ...</>) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}</Button>

                        </div>

                    </form>
                </Form>

            </>}

            <footer className='flex justify-center gap-1 font-medium'>
                <p className='text-14 font-medium text-gray-600'>{type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}</p>
                <Link className='form-link font-medium' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>{type === 'sign-in' ? "Sign Up" : "Sign In"}</Link>
            </footer>


        </section >
    )
}

export default AuthForm