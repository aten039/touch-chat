'use client'
import { UseContextHookToken } from '@/hooks/contextConsumer'
import { getUserForChat } from '@/services/api'
import React, { CSSProperties,  useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import CardUser from '../ui/CardUser'
import { ClipLoader } from 'react-spinners'
import { usePathname } from 'next/navigation'

type users ={
    id:string,
    userName:string,
    email:string
  }
const override: CSSProperties = {
    display: "block",
    margin: "auto",
    width:"80px",
    height:"80px",
    alignItems:"center"
  };
export default function ChatUser() {

  const [activePath, setActivePath] = useState('')

  const pathname = usePathname()

  useEffect(()=>{
    setActivePath(pathname.split('/')[2])
  },[pathname])
  
  const {auth} = UseContextHookToken()!
  const [isLoading, setLoading] = useState(false)
  const [users, setUsers] = useState<users[]>([])

  useEffect(()=>{

    setLoading(true)
    getUserForChat(auth.token)
    .then( result =>{

      if (!result?.success){
        return toast.error("ha ocurrido un error al encontrar usuarios.")
      }
      setUsers(result?.data)
      setLoading(false)
    })
    .catch( ()=>{
      toast.error("ha ocurrido un error al encontrar usuarios.")
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className=' w-full p-2'>
      
      <h1 className=' text-center text-2xl font-bold text-blue-950 mt-4 mb-4'>Selecciona un chat y empieza a chatear </h1>

      {isLoading?(
          <ClipLoader
            color={"#000000"}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />):
          (
          <>
            {users.length<1?(
              <div>
                Ha ocurrido un error al encontrar usuarios, intenta reiniciar la aplicación...
              </div>)
            :(
              <>
                {users.map( user=>(
                  <CardUser
                    activePath={activePath}
                    key={user.id}
                    user={user}
                  />
                ))}
              </>
            )}
        </>
          
        )
      }
      
    </div>
  )
}
