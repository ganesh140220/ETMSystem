import { createSlice } from "@reduxjs/toolkit";

const obj=createSlice({
    name:'myobj',
    initialState:{obj:{},teamobj:{},projobj:{},clientobj:{},allprojobj:{},pwd:"",uid:""},
    reducers:{
        setobj:(state,action)=>{state.obj = action.payload; },
        setteamobj:(state,action)=>{state.teamobj = action.payload; },
        setprojobj:(state,action)=>{state.projobj = action.payload; },
        setclientobj:(state,action)=>{state.clientobj = action.payload; },
        setallprojobj:(state,action)=>{state.allprojobj = action.payload; },
        setpwd:(state,action)=>{state.pwd = action.payload; },
        setusername:(state,action)=>{state.uid = action.payload; },
        
        
    }
})
export const{setobj,setteamobj,setprojobj,setclientobj,setallprojobj,setpwd,setusername}=obj.actions
export default obj.reducer