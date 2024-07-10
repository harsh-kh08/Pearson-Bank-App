import AuthForm from "@/components/AuthForm";
import { getLoggedInUser } from "@/lib/appwrite";
import React from "react";

const SignUp = async () => {





    return <section className="flex-center size-full max-sm:px-6">
        <AuthForm type='sign-up'></AuthForm>


    </section>
}

export default SignUp;