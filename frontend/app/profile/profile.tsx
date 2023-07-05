'use client'
import Header from '@/components/Header'
import Input from '@/components/Input'
import { downloadCV, updateUserReq, uploadCV } from '@/lib/data'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Profile({ data, access_token = undefined, letter = 'E' }) {
  // const [password, setPassword] = useState('')
  const [email, setEmail] = useState(data.email)
  const [name, setName] = useState(data.name)
  const [resume, setResume] = useState(data.cv)

  const [file, setFile] = useState(null);

  const router = useRouter()

  const onSaveProfile = async () => {
    try {
      if (access_token == undefined) {
        alert("Please log in")
        return
      }

      let data = {
        name, email
      }
      console.log('Dpme1')
      let req = await updateUserReq(data, access_token)
      if (req.code == 200) {
        console.log('Dpme')
        if (file != null) {
          await uploadCV(file, access_token)

        }

        window.location.reload()
        alert('Done')

      } else {
        alert(req.message)
      }

    } catch (error) {
      console.log(error)
      alert('Error occurred')
    }
  }

  const onDownloadResume = async () => {
    try {
      let data = await downloadCV(access_token)
      console.log(data)
    } catch (error) {
      console.log(error)
      alert('Error occurred')
    }
  }

  let body;

  if (resume != '') {
    body = <>
      <div>Resume uploaded: {resume} - <button onClick={() => onDownloadResume()}>Click to download</button></div>
    </>
  } else {
    body = <><div></div></>
  }

  return (
    <div className='w-full min-h-screen bg-white text-black p-4 flex flex-col items-center'>
      <Header access_token={access_token} letter={letter} />
      <div className='w-full max-w-6xl flex flex-col justify-center h-min space-y-4 py-2'>
        <div className='space-y-4 w-full flex flex-col'>
          <div className='text-2xl font-black'>
            Profile
          </div>

          <Input value={name} label={'Name'} type='text' placeholder={'Name'} onChange={x => setName(x)} />

          <Input value={email} label={'Email'} type='text' placeholder={'Email'} onChange={x => setEmail(x)} />

          {body}

          <input type="file" className='py-3 outline outline-1 text-black rounded-lg px-4 w-full' onChange={e => setFile(e?.target?.files[0])} />
          <button className='py-4 bg-red-500 text-white rounded-lg' onClick={() => onSaveProfile()}>
            Save
          </button>
        </div>
      </div>
    </div>

  )
}
