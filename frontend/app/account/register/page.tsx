import Header from '@/components/Header'
import RegisterComponent from '@/components/RegisterComponent'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Register() {
  const user = await getCurrentUser()
  if (user) {
    redirect("/")
  }

  return (
    <div className='w-full min-h-screen bg-white text-black p-4 flex flex-col items-center'>
      <Header hidden={true}/>
      <RegisterComponent />
    </div>
  )
}
