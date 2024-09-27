"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
const page = () => {
    const [name,setName] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [loading,setLoading] = useState<boolean>()
    const router = useRouter()
    async function handleclick(){
        try{
        if(name.length==0 || password.length==0)
            return
            setLoading(true)
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL+"api/auth/signup",{username:name,password:password})
           
            if(res){
                setLoading(false)
                router.push("/signin")
            }

        }
        catch(err:any){
          alert("Username does not exists...")
            console.log(err.message)
        }
        }
  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-950">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign up to create an account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-400  tracking-wide">Username</label>
        <div className="mt-2">
          <input id="email" name="name" value={name} type="text"  required  onChange={(e)=>{
            setName(e.target.value)
          }}
           className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   placeholder:text-gray-400  sm:text-sm sm:leading-6 text-center" placeholder='enter your name'/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-400 tracking-wide">Password</label>
          
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-offset-0   placeholder:text-gray-400   sm:text-sm sm:leading-6 text-center" placeholder='password' />
        </div>
      </div>

      <div>
        <button onClick={async (e)=>{
            e.preventDefault()
            await handleclick()
            }} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading?"Signing up...":"Sign up"}</button>
      </div>
    </form>
    <div className='p-3 text-center mt-3'>
        <label className='text-gray-500'>Already have an account? </label>
        <Link href = "/signin" className='text-indigo-600'>Sign in</Link>
    </div>
   
  </div>
</div>
  )
}

export default page