import {createSlice} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const auth=createSlice({
    name:'auth',
    initialState: {token: localStorage.getItem("token") || null,theme:false},
    reducers:{
        login:(state,action)=>{    
            state.token=action.payload
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
        toggle:(state)=>{
          state.theme=!state.theme
        }
    }
})
const store = configureStore({
    reducer: {
      auth: auth.reducer,
    },
  });
export const authActions=auth.actions;
export default store;