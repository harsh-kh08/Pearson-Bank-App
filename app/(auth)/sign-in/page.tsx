import AuthForm from "@/components/AuthForm";
import React from "react";
/* We will not create form using <form> tag as we would not be able to propogate that form across 
 different pages. */

const SignIn = () => {
    return <section className="flex-center size-full max-sm:px-6">
        <AuthForm type='sign-in'></AuthForm>


    </section>
}

export default SignIn;