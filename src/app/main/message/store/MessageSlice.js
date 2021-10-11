/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';
import { currencyString } from 'app/utils/formatter/currencyBrl';

export const getOne = createAsyncThunk('message/getOne', async (uid, { dispatch }) => {
	const response = await ApiService.doGet(`/message/${uid}`);
	// TODO Create getOne BackENd or  Compare uid
	// const response = await ApiService.doGet(`/messages/06758592-70a0-471e-bf42-e3da41792586`);

	// if (!response.success) {
	// 	return response.data;
	// }
	// const { message } = await response;
	const data = await response;
	console.log('getOne', data);
	// const { price } = message;

	// const parsePrice = `${currencyString.format(price)}`;

	// return { ...message }; // , price: parsePrice
	return data;
});

export const saveOne = createAsyncThunk('message/saveOne', async (data, { dispatch }) => {
	const request = { ...data };
	// request.price = parseFloat(data.price);

	const response = await ApiService.doPost('/messages', request);
	if (!response) {
		dispatch(updateResponse(response));
		return data;
	}
	const { message } = await response;

	dispatch(getOne(message.uid));

	return { ...data, message: response.message, success: response.success };
});

export const updateOne = createAsyncThunk('message/updateOne', async ({ data, uid }, { dispatch, getState }) => {
	const request = { ...data };
	/// request.price = parseFloat(data.price);

	const response = await ApiService.doPut(`/message/${uid}`, request);
	const oldState = getState().message;

	if (!response) {
		dispatch(updateResponse(response.data));
		return { ...data, uid, loading: false };
	}

	dispatch(getOne(uid));

	return { ...oldState, message: response.message, success: response.success };
});

const initialState = {
	loading: false,
	title: '',
	detail: ''
};

const messageSlice = createSlice({
	name: 'message',
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

export const { newData, updateResponse, updateLoading } = messageSlice.actions;

export default messageSlice.reducer;
