import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';

export const getAll = createAsyncThunk('products/getProducts', async () => {
	// const response = await ApiService.doGet('/products');
	const response = await ApiService.doGet(`/messages/06758592-70a0-471e-bf42-e3da41792586`);

	const data = await response;

	// console.log('2', data);

	return data;
});

const adapter = createEntityAdapter({
	selectId: product => product.uid
});

export const { selectAll, selectById } = adapter.getSelectors(state => state.products);

const productsSlice = createSlice({
	name: 'products',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: adapter.setAll
	}
});

export default productsSlice.reducer;
