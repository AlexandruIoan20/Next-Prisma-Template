'use client'; 
import { signOut } from 'next-auth/react'

const page = () => {
  return (
    <button
      onClick = { () => signOut () }
    > Test Log Out </button>
  )
}

export default page; 