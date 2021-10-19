import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import message from '../main/messages/store/messageSlice';
import messages from '../main/messages/store/messagesSlice';
import fuse from './fuse';
import i18n from './i18nSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		i18n,
		message,
		messages,
		...asyncReducers
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
