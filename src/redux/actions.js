// actions.js

export const SET_DIRECTION_DATA = "SET_DIRECTION_DATA";
export const SET_DIRECTION_LIST = "SET_DIRECTION_LIST";
export const SET_ROUTE_DATA = "SET_ROUTE_DATA";
export const SET_ROUTES_LIST = "SET_ROUTES_LIST";
export const SET_STOP_DATA = "SET_STOP_DATA";
export const SET_STOP_HISTORY = "SET_STOP_HISTORY";

export const setDirectionData = (directionData) => {
	return {
		type: SET_DIRECTION_DATA,
		payload: directionData
	};
};

export const setDirectionList = (directionList) => {
	return {
		type: SET_DIRECTION_LIST,
		payload: directionList
	};
};

export const setRouteData = (routeData) => {
	return {
		type: SET_ROUTE_DATA,
		payload: routeData
	};
};

export const setRoutesList = (routesList) => {
	return {
		type: SET_ROUTES_LIST,
		payload: routesList
	};
};

export const setStopData = (stopData) => {
	return {
		type: SET_STOP_DATA,
		payload: stopData
	};
};

export const setStopHistory = (stopHistory) => {
	return {
		type: SET_STOP_HISTORY,
		payload: stopHistory
	};
};
