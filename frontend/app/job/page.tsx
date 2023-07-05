import { redirect } from 'next/navigation'
import React from 'react'

export default function JobRedirect() {
    redirect("/")
    return (
        <div>Loading</div>
    )
}
