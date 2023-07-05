import Header from '@/components/Header'
import LoginComponent from '@/components/LoginComponent'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Login() {
  const user = await getCurrentUser()
  if (user) {
    redirect("/")
  }

  return (
    <div className='w-full min-h-screen bg-white text-black p-4 flex flex-col items-center'>
      <Header hidden={true}/>
      <LoginComponent />
    </div>
  )
}
