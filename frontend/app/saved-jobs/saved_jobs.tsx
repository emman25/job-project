'use client'
import Header from '@/components/Header'
import { SavedJob } from '@/components/SavedJob'
import { unsaveJob } from '@/lib/data'
import { useRouter } from 'next/navigation'
import { formatDate } from '../main'

export default function SavedJobs({ data, access_token,letter = 'E' }) {
  const router = useRouter()

  const onButtonClick = async () => {
    try {
      if (access_token == undefined) {
        alert("Please log in")
        return
      }

      let req = await unsaveJob(data._id, access_token)
      if (req.code == 200) {

        router.refresh()
        alert('Done')
      } else {
        alert(req.message)
      }

    } catch (error) {
      console.log(error)
      alert('Error occurred')
    }
  }

  let body;
  if (data?.length == 0) {
    body = <>
      <div>Nothing saved at this moment</div>
    </>
  } else {
    body = <>
      {data?.map((job) => (
        <SavedJob title={`${job.position}`}
          onButtonClick={(x) => onButtonClick(x)} tags={job.tags} features={[job?.workType?.name, job?.location?.name, `${job.minSalary} - ${job.maxSalary}`]} id={job['_id']} date={formatDate(`${job.createdAt}`).toString()} />
      ))}
    </>
  }

  return (
    <div className='w-full min-h-screen bg-white text-black p-4 flex flex-col items-center'>
      <Header access_token={access_token} letter={letter} />
      <div className='w-full max-w-6xl flex flex-col justify-center h-min space-y-4 py-14'>
        <div className='text-2xl font-black'>Saved Jobs</div>
        <hr />
        {body}
      </div>
    </div>
  )
}

