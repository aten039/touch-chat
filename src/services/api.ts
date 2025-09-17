

export function verifyToken(token:string){
   
    return fetch(process.env.NEXT_PUBLIC_URLBACKEND + "/verify", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
    }).then(response => {
      if (!response.ok) {
        // If the HTTP response is not successful, throw an error.
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
}

export function loginOrRegister(formData:{email:string, password:string, userName?:string}){

  return fetch(process.env.NEXT_PUBLIC_URLBACKEND + '/rol', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(formData)
    
  }).then(  response =>{
   
      return response.json();
  })
}

export function getUserForChat(token:string){
  return fetch(process.env.NEXT_PUBLIC_URLBACKEND + '/users', {
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then( response => {
    return response.json()
  })
}

export function getMessageChat(token:string, chatId:string){
  
  return fetch(process.env.NEXT_PUBLIC_URLBACKEND + '/messages', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body:JSON.stringify({chatId:chatId})
  }).then( response => {
    return response.json()
  })
}