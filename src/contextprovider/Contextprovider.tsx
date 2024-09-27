"use client"
import { getToken } from '@/serveraction/server.action';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react'
export const AuthContext = createContext({name:""})

const Contextprovider = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
  const [name , setName] = useState<string>("")
  useEffect(()=>{
    // from localstorage
    async function handleToken(){
        const tokens:any = await getToken()
        if(tokens){
        const res = await axios.get(process.env.NEXT_PUBLIC_API_URL+"api/getName",{
            headers:{
                token:tokens
            }
        })
        if(res)
        setName(res.data.name)
        }
    }
    handleToken()

  },[])
  return (
    <AuthContext.Provider value={{name}}>
        {children}
    </AuthContext.Provider>
  )
}

export default Contextprovider