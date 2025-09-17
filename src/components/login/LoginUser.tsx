'use client'
import { UseContextHookToken } from '@/hooks/contextConsumer'
import React, {CSSProperties, useState } from 'react'
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { loginOrRegister } from '@/services/api';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const override: CSSProperties = {
      display: "block",
      margin: "auto",
      width:"80px",
      height:"80px",
      alignItems:"center"
    };

export default function LoginUser() {

  const {setAuth} = UseContextHookToken()!
  const [isLoading, setLoading] = useState(false)

  const [formData, setformData] = useState({email:"", password:"", userName:""})
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleOnChange  = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setformData( {...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)
    loginOrRegister(formData)
    .then(result => {
      if(!result?.success){
        setLoading(false)
        return toast.error(result?.error)
      }

      Cookies.set('token', result.data)
      setAuth({auth:true, token:result.data})
      setLoading(false)
      toast.success("Bienvenido a Touch")
    })
    .catch(()=> {
      toast.error("ha ocurrido un error, intenta nuevamente. si el error persiste, reinicia la aplicación.")
      setLoading(false)
    })
    
  }
  return (
    <div className=' m-auto mt-5 p-10 w-3/4 bg-gray-100 rounded-2xl shadow-2xl'>
     
      <form className=' flex flex-col gap-6' 
            onSubmit={handleSubmit}>

          <label className=' text-xl font-bold text-center' >Inicia sesión o registrate en Touch.</label>
          <label className=' text-sm text-gray-400'>*Si ya posees una cuenta, ingresa tu email y tu Contraseña. <br/>*Si no posees una cuenta ingresa todos los datos y seras registrado automaticamente.</label>

          <input 
            name='email' 
            onChange={handleOnChange}
            value={formData.email}
            className=' flex-1 border-2 p-1 border-blue-200 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500' 
            type="email" 
            placeholder='Email' 
            max={20}
          />
          <div className="relative">
            <input
              name="password"
              onChange={handleOnChange}
              value={formData.password}
              className="w-full flex-1 border-2 p-2 pr-10 border-blue-200 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          
          <input 
            name='userName' 
            onChange={handleOnChange}
            value={formData.userName}
            className=' flex-1 border-2 p-1 border-blue-200 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500' 
            type="text" 
            placeholder='Nombre de usuario'
            max={10}
          />
          {isLoading?(
            <ClipLoader 
              color={"#000000"}
              loading={isLoading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ):(
            <input 
              className=' cursor-pointer bg-blue-500 text-gray-100 p-3 w-fit m-auto uppercase rounded font-bold mt-2 hover:bg-blue-600 transition-all' 
              type='submit' 
              value="Empezar a chatear"
           />
          )}
         

      </form>
    </div>
  )
}
