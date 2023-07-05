'use client'
import Header from '@/components/Header'
import { Job } from '@/components/Job';
import SelectComponent from '@/components/SelectComponent';
import { getJobsByFilter } from '@/lib/data';
import { getCurrentUser } from '@/lib/session';
import { useEffect, useState } from 'react';


export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    day: '2-digit',
    month: 'short'
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate
}

export default function Main({ predata, access_token, workTypeData = [], tagData = [], locationdata = [], letter = "E" }) {
  const [data, setData] = useState(predata)

  let body;
  if (data == undefined || data?.length == 0) {
    body = <>
      <div>No jobs available</div>
    </>
  } else {
    body = <>
      {data?.map((job) => (
        <Job title={`${job.position}`} tags={job.tags} features={[job?.workType?.name, job.location, `${job.minSalary} - ${job.maxSalary}`]} id={job['_id']} date={formatDate(`${job.createdAt}`).toString()} />
      ))}
    </>
  }

  useEffect(() => {
    console.log('Data changed')
  }, [data])

  const [workType, setWorkType] = useState('')
  const [location, setLocation] = useState('')
  const [tag, setTag] = useState('')

  const onSearch = async () => {
    try {
      let query = '';

      if (location?.length > 0) {
        query += `location=${location}&`;
      }

      if (workType?.length > 0) {
        query += `workType=${workType}&`;
      }

      if (tag?.length > 0) {
        query += `tag=${tag}&`;
      }

      query = query.slice(0, -1);

      let req = await getJobsByFilter(query)

      if (req.code == 200) {
        setData(req.payload)
      }
    } catch (error) {
      console.log(error)
      alert('Error occurred!')
    }
  }

  return (
    <div className='w-full min-h-screen bg-white text-black p-4 flex flex-col items-center'>
      <Header access_token={access_token} letter={letter} />
      <div className='w-full max-w-6xl flex flex-col justify-center h-min space-y-4 py-14'>
        <div className='text-2xl font-black'>Available Jobs</div>
        <hr />
        <div className='flex space-x-2'>
          <SelectComponent data={workTypeData.map(({ name }) => ({
            value: name,
            label: name,
          }))} onChange={x => 
            setWorkType(x)} />

          <SelectComponent data={tagData.map(({ name }) => ({
            value: name,
            label: name,
          }))} onChange={x => setTag(x)} />

          <SelectComponent data={locationdata.map(({ name }) => ({
            value: name,
            label: name,
          }))} onChange={x => setLocation(x)} />

          <button className='w-40  bg-gray-200' onClick={() => onSearch()} > Search</button>
        </div>
        {body}
      </div>
    </div>
  )
}




