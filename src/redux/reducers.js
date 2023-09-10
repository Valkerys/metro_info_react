// reducers.js
import { combineReducers } from "redux";
import {
	SET_DIRECTION_DATA,
	SET_ROUTE_DATA,
	SET_ROUTES_LIST,
	SET_STOP_DATA,
	SET_STOP_TABLE_DATA,
	SET_STOP_HISTORY
} from "./actions.js";

const setDirectionDataInitialState = {
	directionData: {}
};

const setDirectionDataReducer = (state = setDirectionDataInitialState, action = {}) => {
	let returnState;
	switch (action.type) {
		case SET_DIRECTION_DATA:
			returnState = {
				...state,
				directionData: action.payload
			};
			return returnState;
		default:
			return state;
	}
};

const setRouteDataInitialState = {
	routeData: {}
};

const setRouteDataReducer = (state = setRouteDataInitialState, action = {}) => {
	let returnState;
	switch (action.type) {
		case SET_ROUTE_DATA:
			returnState = {
				...state,
				routeData: action.payload
			};
			return returnState;
		default:
			return state;
	}
};

const setRoutesListInitialState = {
	routesList: []
};

const setRoutesListReducer = (state = setRoutesListInitialState, action = {}) => {
	let returnState;
	switch (action.type) {
		case SET_ROUTES_LIST:
			returnState = {
				...state,
				routesList: action.payload
			};
			return returnState;
		default:
			return state;
	}
};

const setStopDataInitialState = {
	StopData: {}
};

const setStopDataReducer = (state = setStopDataInitialState, action = {}) => {
	let returnState;
	switch (action.type) {
		case SET_STOP_DATA:
			returnState = {
				...state,
				stopData: action.payload
			};
			return returnState;
		default:
			return state;
	}
};

const setStopTableDataInitialState = {
	stopTableData: {}
};

const setStopTableDataReducer = (state = setStopTableDataInitialState, action = {}) => {
	let returnState;
	switch (action.type) {
		case SET_STOP_TABLE_DATA:
			returnState = {
				...state,
				stopTableData: action.payload
			};
			return returnState;
		default:
			return state;
	}
};

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
	setDirectionDataReducer,
	setRouteDataReducer,
	setRoutesListReducer,
	setStopDataReducer,
	setStopTableDataReducer,
	setStopHistoryReducer,
});
