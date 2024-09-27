import { useEffect, useState,useContext } from "react";
import axios from "axios"
// import { getCookie } from "@/app/tasks/page";
import { getCookie } from "@/cookies/Cookie";
export function useNotes(url:string){
  const [notes,setNotes] = useState()
  // console.log(url)
  const token:any = getCookie("token")
  console.log("token is",token)
  useEffect(()=>{
    async function handlesubmission(){
      if(token){
      const res = await axios.get(url,{
        headers:{
          token:token
        }
      })
      if(res)
      setNotes(res.data.notes)
      return 
  }
    }
    handlesubmission()
  },[])
  return notes
}