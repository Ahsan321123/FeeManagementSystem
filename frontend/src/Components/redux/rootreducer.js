import { createReducer } from '@reduxjs/toolkit';


export const rootReducer= createReducer({isAuthenticated:false,

    userName:null,
    campus:null,
    role:null,

},{
    login:(state,action)=>{
        state.isAuthenticated = true
        state.userName= action.payload.userName
        state.campus= action.payload.campus
        
    },
    logout:(state) =>{
        state.isAuthenticated=false
    },
    setRole:(state,action )=>{
        state.role="admin"
        state.userName=action.payload.userName
        
    }
    
})