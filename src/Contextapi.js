import React from "react"
import { useState } from "react";
const api=React.createContext({
    token:'',
    login:(token)=>{},
    logout:()=>{}
    
})
export const ContextApi=(props)=>{
    const initialValue=localStorage.getItem('token');
    const [token,setToken]=useState(initialValue)
    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem('token', token);    
     }
    const logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('token');
     }
     const contextValue={
        token:token,
        login:loginHandler,
        logout:logoutHandler
     }
     return (
        <api.Provider value={contextValue}>
            {props.children }
        </api.Provider>
     )
}
export default api