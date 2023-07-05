import Header from '@/components/Header'
import VerifyComponent from '@/components/VerifyComponent'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic';

export default async function Verify(params) {
  const user = await getCurrentUser()
  if (user) {
    redirect("/")
  }

  return (
    <div className='w-full min-h-screen bg-white text-black p-4 flex flex-col items-center'>
      <Header hidden={true}/>
      <VerifyComponent token={params?.searchParams?.token}/>
    </div>
  )
}
