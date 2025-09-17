'use client'
import Cookies from 'js-cookie';
import ChatUser from "../chatsComponent/ChatUser"
import LoginUser from "../login/LoginUser"
import { CSSProperties, useEffect, useState } from 'react';
import { UseContextHookToken } from '@/hooks/contextConsumer';
import { verifyToken } from '@/services/api';
import { ClipLoader } from 'react-spinners';

 const override: CSSProperties = {
    display: "block",
    margin: "auto",
    width:"80px",
    height:"80px",
    alignItems:"center"
  };

export default  function AsideMenu() {

  const {auth, setAuth} = UseContextHookToken()!
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    // Leer una cookie
    const currenttoken = Cookies.get('token');
    if (!currenttoken) {
      setLoading(false)
      return setAuth({auth:false, token:""})
      
    }
    //comprobar token valido
    verifyToken(currenttoken)
      .then(result => {
        if(result.success ==true){
          setAuth({auth:true, token:currenttoken})
        }else{
          Cookies.remove('token')
          setAuth({auth:false, token:""})
        }
      })
      .catch(() => {
        Cookies.remove('token')
        setAuth({auth:false, token:""})
      })
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    if(isLoading){
      return (
          <ClipLoader 
            color={"#000000"}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )
    }
    if (!auth.auth){
      return (//si no login
        <LoginUser />
      )
    }else {
      return (// si ya inicio sesion chatsUser
        <ChatUser
        />
        )
    }
    

    
  
}
