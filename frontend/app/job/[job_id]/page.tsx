import { getJobsById, getUserRequest } from "@/lib/data";
import Application from "./application";
import { getCurrentUser } from "@/lib/session";

export const dynamic = 'force-dynamic';

export default async function JobDetail(params) {
    const user = await getCurrentUser()

    console.log(params)
    let jobApplication = await getJobsById(params?.params?.job_id)

    console.log(jobApplication?.payload)
    console.log(user?.access_token)
    console.log('^^^^^^^^^^^^')
    let userData = undefined;
    try {
        userData = await getUserRequest(user?.access_token)
        console.log(userData)

    } catch (error) {

    }

    return (
        <Application
            data={jobApplication?.payload}
            access_token={user?.access_token}
            letter={user?.email?.charAt(0)}
            user_data={userData?.payload}
            email_data={user?.email}
        />
    )
}