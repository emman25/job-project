import React from 'react'
import Main from './main'
import { getAllJobs, getLocations, getTags, getWorkType } from '@/lib/data'
import { getCurrentUser } from '@/lib/session'

export default async function page() {
    const user = await getCurrentUser()
    let access_token = user?.access_token

    console.log("--------------------")
    console.log(access_token)
    console.log("--------------------")
    let jobsData = undefined
    let workTypeData = undefined
    let tagData = undefined
    let locationdata = undefined
    try {
        jobsData = await getAllJobs()
        workTypeData = await getWorkType()
        tagData = await getTags()
        locationdata = await getLocations()

    } catch (error) {
        console.log(error)
    }

    return (
        <Main
            predata={jobsData?.payload}
            access_token={access_token}
            letter={user?.email?.charAt(0)}
            workTypeData={workTypeData?.payload}
            tagData={tagData?.payload}
            locationdata={locationdata?.payload}
        />
    )
}
