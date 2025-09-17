'use client'
import ChatComponent from "@/components/logicalLAyout/ChatComponent"
import { redirect, useParams } from 'next/navigation'
import { UseContextHookToken } from '@/hooks/contextConsumer';
import { useEffect, useState } from "react";

export default function PageChat() {

  
  const params = useParams();

  const [receiverId, setReceiverId] = useState("")
 
  useEffect(()=>{
    const id = params.receiverId
    if(!id ) redirect('/')
    setReceiverId(id as string)

  },[params])

  const {auth} = UseContextHookToken()!
    if (!auth.auth ){
    return redirect('/')
  }
  
  return (
    <div>
      <ChatComponent
        userToken={auth.token}
        receiverId={receiverId}
      />
    </div>
  )
}
