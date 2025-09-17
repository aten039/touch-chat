'use client'
import { getMessageChat } from '@/services/api';
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast'
import { io, Socket } from 'socket.io-client'
import Message from '../ui/Message';

type Messages = {
  id:number,
  content:string, 
  offset:number,
  user:{userName:string}
}

export default function ChatComponent({userToken, receiverId}:{userToken:string, receiverId:string}) {

  const [messages, setMessages] = useState<{messages:Messages[], endOffset:number}>({messages:[],endOffset:0 })
  const [socket, setSocket] = useState<Socket | null>(null)
  const [content, setContent] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function addNewMessages({transmiter, content, offset,id}:{transmiter:string, content: string, offset:number, id:number}){
    setMessages(prevState => {
    // Aquí, prevState es el estado actual y más reciente
    const newMessages = [...prevState.messages, {
      content: content,
      offset: offset,
      id: id,
      user:{userName:transmiter}
    }];

    return {
      messages: newMessages,
      endOffset: prevState.endOffset + 1
    }})
  }

  function sendMessages(){
    if(!socket) return
    if(content.trim() == "") return // acomodar que tenga solo espacios en blanco
    socket.emit("chatSend", content, messages.endOffset + 1)
    setContent("")

  }
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessages();
  };
  function handleChange(e:ChangeEvent<HTMLTextAreaElement>){
   setContent(e.target.value)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessages()
    }
  };
  useEffect(() => {

    const options = {
      // Aquí puedes pasar opciones como un token de autenticación
      auth: {
        userToken: userToken,
        receiverId:receiverId,
        offSet:0
      }
    };
    // Conectar
    const socket = io(process.env.NEXT_PUBLIC_URLSOCKET, options);

    setSocket(socket)
    socket.on("connection-established", (idRoom) => {
      // buscar mensajes de ese chat y mostrarlos 
      getMessageChat(userToken , idRoom ).then((responses =>{
        if(!responses.success) throw new Error()
        setMessages({messages:responses.data.Messages , endOffset:responses.data.endOffset})
        
      })).catch( ()=>{
    
        toast.error('ocurrio un error al sincronizar mensajes, intenta recargar la APP')
      })
      
    });


    socket.on("chatReceiver", (content, transmiter, offSet, id)=>{
      
      addNewMessages({transmiter:transmiter, content: content, offset:offSet, id:id})

    })
    return () => {
      socket.disconnect();
    };


  }, [userToken, receiverId]);
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);}
  }, [messages]);

  return (
   
    <div className="flex flex-col h-full">
      <div ref={messagesEndRef} className=' border-10 rounded border-blue-950 p-4 h-full overflow-y-auto bg-w flex flex-col gap-4'>
        {messages.messages?messages.messages.map((msg)=>(<Message key={msg.id} message={msg}/>)):"sin mensaje"}

        <form className=' flex m-1 items-center gap-2' onSubmit={handleFormSubmit} >
          <textarea value={content} onChange={handleChange} onKeyDown={handleKeyDown} className=' overflow-y-auto p-1 h-10 flex-3 border-2  border-blue-200 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'></textarea>
          <input type="submit"  className=' flex-1 cursor-pointer bg-blue-500 text-gray-100 p-2 w-fit  uppercase rounded font-bold hover:bg-blue-600 transition-all'/>
        </form>

      </div>
    </div>
    
    
  )
}
