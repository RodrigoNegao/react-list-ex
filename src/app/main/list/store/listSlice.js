/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';
import { currencyString } from 'app/utils/formatter/currencyBrl';

export const getOne = createAsyncThunk('list/getOne', async (id, { dispatch }) => {
	const response = await ApiService.doGet(`/lists/${id}`);
	if (!response.success) {
		return response.data;
	}
	const { list } = await response.data;
	const { price } = list;

	const parsePrice = `${currencyString.format(price)}`;

	return { ...list, price: parsePrice };
});

export const saveOne = createAsyncThunk('list/saveOne', async (data, { dispatch }) => {
	const request = { ...data };
	request.price = parseFloat(data.price);

	const response = await ApiService.doPost('/list', request);
	if (!response.success) {
		dispatch(updateResponse(response.data));
		return data;
	}
	const { list } = await response.data;

	dispatch(getOne(list.id));

	return { ...data, message: response.message, success: response.success };
});

export const updateOne = createAsyncThunk('list/updateOne', async ({ data, id }, { dispatch, getState }) => {
	const request = { ...data };
	request.price = parseFloat(data.price);

	const response = await ApiService.doPut(`/list/${id}`, request);
	const oldState = getState().list;

	if (!response.success) {
		dispatch(updateResponse(response.data));
		return { ...data, id, loading: false };
	}

	dispatch(getOne(id));

	return { ...oldState, message: response.message, success: response.success };
});

const initialState = {
	success: false,
	message: '',
	errorCode: '',
	loading: false,
	title: '',
	description: '',
	price: ''
};

const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		newData: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: 'new',
					title: '',
					description: '',
					price: '',
					success: false,
					loading: false,
					message: '',
					errorCode: ''
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

export const { newData, updateResponse, updateLoading } = listSlice.actions;

export default listSlice.reducer;
