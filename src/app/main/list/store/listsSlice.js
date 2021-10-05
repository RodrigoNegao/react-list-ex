import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';

export const getAll = createAsyncThunk('lists/getLists', async () => {
	const response = await ApiService.doGet('/lists');
	const data = await response.data;

	return data.lists;
});

const adapter = createEntityAdapter({
	selectId: list => list.uid
});

export const { selectAll, selectById } = adapter.getSelectors(state => state.lists);

const listsSlice = createSlice({
	name: 'lists',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: adapter.setAll
	}
});

export default listsSlice.reducer;
