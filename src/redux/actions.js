// actions.js

export const SET_STOP_HISTORY = "SET_STOP_HISTORY";

export const setStopHistory = (stopHistory) => {
	return {
		type: SET_STOP_HISTORY,
		payload: stopHistory
	};
};
