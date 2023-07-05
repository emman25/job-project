import { SavedJob } from '@/components/SavedJob';
import { getSavedJobs } from '@/lib/data';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react'
import SavedJobs from './saved_jobs';

export default async function page() {
    const user = await getCurrentUser()
    if (!user) {
        redirect("/account/login")
    }
    let user_data = undefined;
    try {
        user_data = await getSavedJobs(user?.access_token)
    } catch (error) {
        console.log(error)
    }

    let data = user_data?.payload

    console.log(data)
    
    return (
        <SavedJobs data={data} access_token={user?.access_token} letter={user?.email?.charAt(0)} />
    )
}
