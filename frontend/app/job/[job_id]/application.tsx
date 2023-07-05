'use client'
import DragFile from '@/components/DragFile';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { Tag } from '@/components/Tag';
import { createJobApplication, savedJob, uploadApplicationCV, uploadCV } from '@/lib/data';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export interface Job {
    _id: string;
    position: string;
    workType: string;
    tags: string[];
    location: string;
    minSalary: number;
    maxSalary: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
        day: '2-digit',
        month: 'short'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate
}


export default function Application({ data, user_data, email_data, access_token = undefined, letter = 'E' }) {
    const [application, setApplication] = useState(false)
    let body;

    const router = useRouter()

    const [name, setName] = useState(user_data?.name)
    const [email, setEmail] = useState(email_data)
    const [resume, setResume] = useState(data.cv)


    const [file, setFile] = useState(null);


    const onSubmitApplication = async () => {
        try {
            
            let dataSubmit = {
                jobId: data._id,
                email: email
            }

            let req = await createJobApplication(dataSubmit)

            if (req.code == 200) {
                if (file != null) {
                    await uploadCV(file, req.payload)
                }

                alert('Done')

                router.push('/')
            } else {
                alert(req.message)
            }
        } catch (error) {
            alert(error)
            alert('Error occurred')
        }
    }

    const onFavorite = async () => {
        try {
            if (access_token == undefined) {
                alert("Please log in")
                return
            }

            let req = await savedJob(data._id, access_token)
            if (req.code == 200) {
                alert('Done')

                router.refresh()
            } else {
                alert(req.message)
            }

        } catch (error) {
            console.log(error)
            alert('Error occurred')
        }
    }


    if (application == false) {
        body = <>
            <div className='space-y-3'>
                <div className='space-y-2'>
                    <div className='text-lg'>
                        Posted {formatDate(`${data.createdAt}`).toString()}
                    </div>
                    <div className='text-xl md:text-4xl font-bold'>
                        {`${data.position}`}
                    </div>

                    <div className='flex space-x-2 pb-4'>
                        {data?.tags?.map((tag) => (
                            <Tag title={`${tag?.name}`} />

                        ))}
                        <div>{data?.location?.name}</div>
                       <div> {data?.workType?.name}</div>
                    </div>
                </div>

                <div className='flex space-x-4'>
                    <button className='outline outline-1 px-4' onClick={() => { setApplication(true) }}>Apply</button>
                    <button className={`outline outline-1 px-4 ${access_token == undefined ? 'hidden' : 'block'}`} onClick={() => onFavorite()}>Favorite</button>
                </div>

                <div className='py-4'>
                    {data.description}
                </div>
            </div>
        </>
    } else {
        let bodyResume;

        if (resume != undefined || resume?.trim()?.length == 0) {
            bodyResume = <>
                <div>Resume uploaded: {resume}</div>
            </>
        } else {
            bodyResume = <></>
        }

        body = <>
            <div className='space-y-4 flex flex-col'>
                <div className='text-2xl'>
                    Application: Personal Information
                </div>

                <hr />

                <Input value={name} label={'Name'} type='text' placeholder={'Name'} onChange={x => setName(x)} />

                <Input value={email} label={'Email'} type='text' placeholder={'Email'} onChange={x => setEmail(x)} />

                <div className='text-2xl pt-8'>
                    Resume
                </div>

                <hr className='py-2' />
                {bodyResume}
                <input type="file" className='py-3 outline outline-1 text-black rounded-lg px-4 w-full' onChange={e => setFile(e?.target?.files[0])} />

                <button className='bg-red-500 py-4 rounded-lg' onClick={() => onSubmitApplication()}>
                    Submit application
                </button>
            </div>
        </>
    }

    return (
        <div>
            <div className='w-full min-h-screen bg-white text-black p-4 flex flex-col items-center'>
                <Header access_token={access_token} letter={letter} />
                <div className='w-full max-w-4xl flex flex-col justify-center h-min space-y-4 pt-8'>
                    {body}
                </div>
            </div>
        </div>
    )
}
