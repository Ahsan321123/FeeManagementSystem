import { createReducer } from '@reduxjs/toolkit';


export const rootReducer= createReducer({isAuthenticated:false,

    userName:null,
    campus:null
},{
    login:(state,action)=>{
        state.isAuthenticated = true
        state.userName= action.payload.userName
        state.campus= action.payload.campus
    },
    logout:(state) =>{
        state.isAuthenticated=false
    },
    
})