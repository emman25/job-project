import { getUserRequest } from '@/lib/data'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'
import Profile from './profile'

export default async function Page() {
    const user = await getCurrentUser()
    if (!user) {
        redirect("/account/login")
    }
    let user_data = undefined;
    try {
        user_data = await getUserRequest(user?.access_token)
    } catch (error) {

    }

    console.log(user_data)
    
    return (
        <div>
            <Profile data={user_data?.payload} access_token={user?.access_token} letter={user?.email?.charAt(0)}/>
        </div>
    )
}
