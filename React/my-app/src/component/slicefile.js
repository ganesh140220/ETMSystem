import { createSlice } from "@reduxjs/toolkit";

const obj=createSlice({
    name:'myobj',
    initialState:{obj:{},teamobj:{},projobj:{}},
    reducers:{
        setobj:(state,action)=>{state.obj = action.payload; },
        setteamobj:(state,action)=>{state.teamobj = action.payload; },
        setprojobj:(state,action)=>{state.projobj = action.payload; }
    }
})
export const{setobj,setteamobj,setprojobj}=obj.actions
export default obj.reducer