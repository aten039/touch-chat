'use client'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

type User ={
    id:string,
    userName:string,
    email:string
  }

export default function CardUser({user, activePath}:{user:User, activePath:string}) {


  return (
    <Link className={` flex justify-between p-2  items-center  hover:bg-sky-200 transition-all shadow
    ${activePath == user.id?` bg-sky-200`:" bg-white"}`} href={`/chat/${user.id}`}>
      <div className=' text-center flex-1'>
        
        <FontAwesomeIcon icon={faUser} />
        <p>{user.userName}</p>
      </div>
      <p className=' flex-2 text-end'>{user.email}</p>
      
    </Link>
  )
}
