import React from 'react'
import { z } from "zod"


import { zodResolver } from "@hookform/resolvers/zod"
import { Control, FieldPath, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
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
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

declare interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>
    placeholder: string
    label: string
}

const CustomInput = ({ control, name, placeholder, label }: CustomInputProps) => {
    return (

        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>{label} </FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input type={name === 'password' ? 'password' : 'text'} placeholder={placeholder} className='input-class'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2'></FormMessage>
                    </div>

                </div>
            )}
        />

    )
}


export default CustomInput