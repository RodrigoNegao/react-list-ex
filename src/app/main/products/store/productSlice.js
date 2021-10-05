/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';
import { currencyString } from 'app/utils/formatter/currencyBrl';

export const getOne = createAsyncThunk('product/getOne', async (uid, { dispatch }) => {
	const response = await ApiService.doGet(`/message/${uid}`);
	// TODO Create getOne BackENd or  Compare uid
	// const response = await ApiService.doGet(`/messages/06758592-70a0-471e-bf42-e3da41792586`);

	// if (!response.success) {
	// 	return response.data;
	// }
	const { product } = await response;
	// const { price } = product;

	// const parsePrice = `${currencyString.format(price)}`;

	return { ...product }; // , price: parsePrice
});

export const saveOne = createAsyncThunk('product/saveOne', async (data, { dispatch }) => {
	const request = { ...data };
	// request.price = parseFloat(data.price);

	const response = await ApiService.doPost('/products', request);
	if (!response) {
		dispatch(updateResponse(response));
		return data;
	}
	const { product } = await response;

	dispatch(getOne(product.uid));

	return { ...data, message: response.message, success: response.success };
});

export const updateOne = createAsyncThunk('product/updateOne', async ({ data, uid }, { dispatch, getState }) => {
	const request = { ...data };
	/// request.price = parseFloat(data.price);

	const response = await ApiService.doPut(`/products/${uid}`, request);
	const oldState = getState().product;

	if (!response) {
		dispatch(updateResponse(response.data));
		return { ...data, uid, loading: false };
	}

	dispatch(getOne(uid));

	return { ...oldState, message: response.message, success: response.success };
});

const initialState = {
	// success: false,
	// message: '',
	// errorCode: '',
	loading: false,
	title: '',
	detail: '',
	price: ''
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		newData: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					uid: 'new',
					title: '',
					detail: '',
					price: '',
					// success: false,
					loading: false
					// message: '',
					// errorCode: ''
				}
			})
		},
		clearState: (state, action) => initialState,
		updateState: (state, action) => {
			return { ...state, ...action.payload };
		},
		updateResponse: (state, action) => {
			state.success = action.payload.success;
			state.message = action.payload.message;
		},
		updateLoading: (state, action) => {
			state.loading = action.payload;
		}
	},
	extraReducers: {
		[getOne.fulfilled]: (state, action) => action.payload,
		[saveOne.fulfilled]: (state, action) => action.payload,
		[updateOne.fulfilled]: (state, action) => action.payload
	}
});

export const { newData, updateResponse, updateLoading } = productSlice.actions;

export default productSlice.reducer;
