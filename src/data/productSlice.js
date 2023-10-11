import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productList from '../data/productList.json'
const fetchAllProducts = createAsyncThunk('fetch-all-products', async(apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})

const productSlice = createSlice({
    name: 'products',
    initialState:{ data: [], fetchStatus: ''},
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.data = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchAllProducts.pending, (state) => {
            state.fetchStatus = 'pending'
        }).addCase(fetchAllProducts.rejected, (state) => {
            //adding product list to fetch if api is unable to do so
            state.data = productList.products
            state.fetchStatus = 'error'
        })
    }
})

export default productSlice