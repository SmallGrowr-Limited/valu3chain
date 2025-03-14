import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  city: null,
  loading: false,
  error: null,
  status:null
};

const fetchCitySlice = createSlice({
  name:"fetchCity",
  initialState,
  reducers:{
    fetchCityRequest:(state)=>{
      state.loading = true,
      state.error = null
    },
    fetchCitySuccess:(state, action)=>{
      state.loading = false,
      state.city = action.payload
    },

    fetchCityFailure:(state, action)=>{
      state.loading = false,
      state.error = action.payload
    }
  }
})

export const{
  fetchCityRequest,
  fetchCitySuccess,
  fetchCityFailure,
} = fetchCitySlice.actions

export default fetchCitySlice.reducer

