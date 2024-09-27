"use server"

import { cookies } from "next/headers"

export async function getToken(){
    try{
        const token = cookies().get("token")
        console.log(token?.value)
        return token?.value
    }
    catch(err){
        console.log(JSON.stringify(err))
    }
}
export async function removeToken(){
    try{
        cookies().delete("token")
        return
    }
    catch(e){
        console.log(JSON.stringify(e))
    }
}