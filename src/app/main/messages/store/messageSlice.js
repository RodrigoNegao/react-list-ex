/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';

export const getOne = createAsyncThunk('message/getOne', async (uid, { dispatch }) => {
	const response = await ApiService.doGet(`/message/${uid}`);
	const message = await response;

	return { ...message };
});

export const saveOne = createAsyncThunk('message/saveOne', async (data, { dispatch }) => {
	const request = { ...data }; // , uid:

	const response = await ApiService.doPost('/message', request);
	if (response.error) {
		dispatch(updateResponse(response.data));
		return data;
	}

	return { ...data, message: 'Ta salvo Oxi', success: 'Ok' };
});

export const updateOne = createAsyncThunk('message/updateOne', async ({ data, uid }, { dispatch, getState }) => {
	const request = { ...data };
	console.log(request);

	const response = await ApiService.doPut(`/message/${uid}`, request);
	const oldState = getState().message;

	if (response.error) {
		dispatch(updateResponse(response.data));
		return { ...data, uid, loading: false };
	}

	dispatch(getOne(uid));

	return { ...oldState, message: 'Ta salvo Oxi', success: 'Success' };
});

export const deleteOne = createAsyncThunk('message/deleteOne', async ({ data, uid }, { dispatch, getState }) => {
	const request = { ...data };
	console.log(request);

	const response = await ApiService.doDelete(`/message/${uid}`);

	return { message: 'Ta salvo Oxi', success: 'Success' };
});

const initialState = {
	message: '',
	loading: false,
	title: '',
	description: ''
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
					description: '',
					loading: false,
					message: ''
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
