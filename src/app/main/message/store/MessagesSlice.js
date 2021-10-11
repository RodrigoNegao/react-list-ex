import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';

export const getAll = createAsyncThunk('messages/getMessages', async () => {
	// const response = 0;
	const response = await ApiService.doGet(`/messages/06758592-70a0-471e-bf42-e3da41792586`);

	const data = await response;

	// console.log('1', data);

	return data;
});

const adapter = createEntityAdapter({
	selectId: message => message.uid
});

export const { selectAll, selectById } = adapter.getSelectors(state => state.messages);

const messagesSlice = createSlice({
	name: 'messages',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: adapter.setAll
	}
});

export default messagesSlice.reducer;
