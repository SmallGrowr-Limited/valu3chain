import { createSlice } from "@reduxjs/toolkit";

// define initial state
const initialState = {
    farmerData: null,
    loading:false,
    error:null
}

const farmerSlice = createSlice({
    name:"farmer",
    initialState,
    reducers:{
        createFarmerProfile:(state, action)=>{
            state.farmerData = action.payload
        },
        setLoading:(state, action)=>{
            state.loading = action.payload
        },
        setError:(state, action)=>{
            state.error = action.payload
        }
    }
})

export const {createFarmerProfile, setLoading, setError} = farmerSlice.actions;
export default farmerSlice.reducer;