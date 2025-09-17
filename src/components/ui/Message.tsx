import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
type Messages = {
  id:number,
  content:string, 
  offset:number,
  user:{userName:string}
}

export default function Message({message}:{message:Messages}) {
  return (
    <div className={` flex w-auto items-center bg-white transition-all shadow`}>
       
      <div className='flex-1  border-4 border-sky-700 text-center  p-2'>  
        <FontAwesomeIcon icon={faUser} />
        <p  className='font-bold uppercase text-sm'>{message.user.userName}</p>
      </div>

      <p className='w-auto text-wrap  p-2 flex-3 '>{message.content}</p>
    </div>
  )
}
