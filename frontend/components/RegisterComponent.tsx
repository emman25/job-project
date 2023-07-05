'use client'
import React, { useState } from 'react'
import Input from './Input'
import Link from 'next/link'
import { registerUserReq } from '@/lib/data'
import { useRouter } from 'next/navigation'

export default function RegisterComponent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const onClickRegister = async () => {
        if (name.trim().length == 0) {
            alert('Fill in name')
            return
        }

        if (email.trim().length == 0) {
            alert('Fill in email')
            return
        }

        if (location.trim().length == 0) {
            alert('Fill in location')
            return
        }

        if (password.trim().length == 0) {
            alert('Fill in password')
            return
        }
        console.log("Click Reg")
        try {
            setIsLoading(true)
            let data = {
                name, email, location, password
            }

            console.log('Register')
            let req = await registerUserReq(data)

            if (req.code == 200) {
                setIsLoading(false)
                setName('')
                setLocation('')
                setEmail('')
                setPassword('')
                alert("Done. Please login")
                router.push('/account/login')
            } else {
                setIsLoading(false)
                alert(req.message)
            }

        } catch (error) {
            setIsLoading(false);
            alert(error)
        }
    }

    return (
        <div className='w-full max-w-2xl flex flex-col justify-center h-min space-y-4 py-2'>

            <div className='text-2xl font-black'>Create Your Account</div>
            <div>Fill in the details to get started easily</div>

            <Input value={name} label={'Name'} type='text' placeholder={'Name'} onChange={x => setName(x)} />
            <Input value={email} label={'Email Address'} type='text' placeholder={'Email'} onChange={x => setEmail(x)} />
            <Input value={location} label={'Location'} type='text' placeholder={'Location'} onChange={x => setLocation(x)} />
            <Input value={password} label={'Password'} type='text' placeholder={'Password'} onChange={x => setPassword(x)} />

            <div>By signing up, I agree to Entrebyte Technologies terms of service and privacy policy</div>

            <button className='w-full py-4 bg-red-500 rounded-lg text-white' onClick={() => onClickRegister()}>
                Create Account
            </button>

            <div>
                Already have an account? <Link href={'/account/login'}>Sign in here</Link>
            </div>

        </div>
    )
}
