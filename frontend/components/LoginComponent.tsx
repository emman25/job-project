'use client'
import React, { useState } from 'react'
import Input from './Input'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { signIn } from "next-auth/react";

export default function LoginComponent() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);


    const onClickLogin = async () => {
        try {
            setIsLoading(true);
            console.log("Launching Login")

            console.log(`${process.env.NEXT_PUBLIC_APP_URL}/`)

            const res = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
            });

            console.log("++++++==?")
            console.log(res)

            if (res?.error) {
                setIsLoading(false);
                if (res.error === "CredentialsSignin") {
                    alert("Your credentials are incorrect");
                } else {
                    alert(res.error);
                }
            }
            
            window.location.reload()
            if (res?.url) router.push(res.url);
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className='w-full max-w-2xl flex flex-col justify-center h-min space-y-4 py-2'>

            <div className='text-2xl font-black'>Login Account</div>
            <div>Fill in the details to get started easily</div>

            <Input label={'Email Address'} type='text' placeholder={'Email'} onChange={x => setEmail(x)} />
            <Input label={'Password'} type='password' placeholder={'Password'} onChange={x => setPassword(x)} />

            <button className='w-full py-4 bg-red-500 rounded-lg' onClick={() => onClickLogin()}>
                Login Account
            </button>

            <div>
                Are you new <Link href={'/account/register'}>Sign up here</Link>
            </div>

        </div>
    )
}
