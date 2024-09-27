"use client"
import React, { useContext, useState } from 'react'
import Tableview from "@/components/Tableview"
import Groupview from "@/components/Groupview"
import { Button } from '@/components/ui/button'

import { Table } from 'lucide-react';
import { SquareKanban } from 'lucide-react';
import { AuthContext } from '@/contextprovider/Contextprovider'
import { removeToken } from '@/serveraction/server.action'
import { useRouter } from 'next/navigation'
const page = () => {
    const [popup,setPopup] = useState<boolean>(true)
  const { name } = useContext(AuthContext);
  const router = useRouter()
  return (
    <>
    <main className='flex flex-col min-h-screen w-full bg-gray-950 text-white'>
<div className='sticky top-0 z-50 bg-gray-950'>

    <div className='flex h-[50px] justify-between items-center border-b-slate-600 border-b-[0.1px] p-8 '>
        <span className='font-extrabold text-3xl max-sm:text-xl'><span className='text-blue-500 tracking-wide font-extrabold'>Task</span> Manager</span>
        <div className='flex items-center gap-4'>
          <p>{name.charAt(0).toUpperCase()+name.substring(1)}</p>
        <Button variant="outline" className="bg-blue-700 text-gray-100 border-blue-700 hover:bg-blue-600 hover:text-gray-100" onClick={async()=>{
          await removeToken()
          router.push("/")
        }}>
            
            Logout
          </Button>
        </div>
    </div>
    </div>
    <section className='flex-1 p-3 '>
        <div className='flex justify-center items-center p-8'>
          
            <div className='flex gap-10'>
                <Button className='bg-blue-700 hover:bg-blue-600' onClick={()=>{setPopup(true)}}><span className='flex gap-3 items-center justify-center'><Table/>All</span></Button>
                <Button className='bg-blue-700 hover:bg-blue-600' onClick={()=>{setPopup(false)}}> <span className='flex gap-3 items-center justify-center'><SquareKanban/>Group</span></Button>
                
            </div>
        </div>
        {popup?<Tableview/>:<Groupview/>}
    </section>

    </main>
    </>
  )
}

export default page