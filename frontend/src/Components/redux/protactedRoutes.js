import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'



export const ProtactedRoutes = ({isAuthenticated,children }) => {
    
if(!isAuthenticated){
    return <Navigate to ='/stafflogin'/>
}
  return <Outlet/>
}


