import {createSlice} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const auth=createSlice({
    name:'auth',
    initialState: {token: localStorage.getItem("token") || null},
    reducers:{
        login:(state,action)=>{
            console.log(action.payload)
            state.token=action.payload
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
          },
    }
})
const store = configureStore({
    reducer: {
      auth: auth.reducer,
    },
  });
export const authActions=auth.actions;
export default store;