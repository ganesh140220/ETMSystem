import { createSlice } from "@reduxjs/toolkit";

const obj=createSlice({
    name:'myobj',
    initialState:{id:0,nm:""},
    reducers:{
        incremental:(state,action)=>{return {id:action.payload}},
        decremental:(state)=>{return {id:state.id-1}}
    }
})
export const{incremental,decremental}=obj.actions
export default obj.reducer