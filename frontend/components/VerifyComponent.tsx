'use client'
import React, { useState } from 'react'
import Input from './Input'
import Link from 'next/link'
import { updateUserReq, verifyUserReq } from '@/lib/data'
import { useRouter } from 'next/navigation'

export default function VerifyComponent({token}) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    
    const onClickSave = async() => {
        try {
            if(password != confirmPassword){
                alert('Passwords do not match')
                return
            }
            setIsLoading(true)
            let data = {
                password
            }

            let req = await verifyUserReq(token)

            if(req.code == 200){
                setIsLoading(false)
                
                await updateUserReq(data, req.payload)

                setPassword('')
                setConfirmPassword('')

                alert("Complete. Log in")

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

            <div className='text-2xl font-black'>Secure Your Account</div>
            <div>Fill in the details</div>

            <Input value={password} label={'Password'} type='password' placeholder={'Password'} onChange={x => setPassword(x)} />
            <Input value={confirmPassword} label={'ConfirmPassword'} type='password' placeholder={'ConfirmPassword'} onChange={x => setConfirmPassword(x)} />
            
            <button className='w-full py-4 bg-red-500 rounded-lg text-white' onClick={() => onClickSave()}>
                Save
            </button>

        </div>
    )
}
