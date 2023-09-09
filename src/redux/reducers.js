// reducers.js
import { combineReducers } from "redux";
import {
	SET_STOP_HISTORY
} from "./actions.js";

//////////////////////////////

const setStopHistoryInitialState = {
	stopHistory: []
};

const setStopHistoryReducer = (state = setStopHistoryInitialState, action = {}) => {
	let returnState;
	switch (action.type) {
		case SET_STOP_HISTORY:
			returnState = {
				...state,
				stopHistory: action.payload
			};
			sessionStorage.setItem("stopHistory", JSON.stringify(returnState));
			return returnState;
		default:
			return state;
	}
};

//////////////////////////////

const getInitialState = () => {
	let result = {};

	let sessionData = sessionStorage.getItem("stopHistory");
	result.setStopHistoryReducer = sessionData ? JSON.parse(sessionData) : setStopHistoryInitialState;

	return result;
};

export const initialState = getInitialState();

export const reducers = combineReducers({
	setStopHistoryReducer,
});
