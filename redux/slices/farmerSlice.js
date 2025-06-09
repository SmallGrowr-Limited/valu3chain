import { createSlice } from "@reduxjs/toolkit";

// define initial state
const initialState = {
    farmerData: null,
    loading:false,
    error:null,
    allFarmers:[],
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
        },
        getAllFarmers:(state, action)=>{
            state.allFarmers = action.payload
        }
    }
})

export const {createFarmerProfile, setLoading, setError, getAllFarmers} = farmerSlice.actions;
export default farmerSlice.reducer;