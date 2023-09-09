/**
 * App.jsx
 * Purpose:
 * Component that renders react-body and all elements below.
 * Also deals with auto authentication, eulas, logging, session timing,
 * languageStrings, and debug info component.
 */
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setRoutesList } from "./redux/actions";

import MetroContent from "./MetroContent.jsx";
import MetroHeader from "./MetroHeader.jsx";

import './App.scss';

function App() {
	const dispatch = useDispatch();

	/**
	 * 
	 * @returns 
	 */
	const getRoutes = () => {
		const url = `${process.env.REACT_APP_METRO_API_URL}/routes`;
		return axios({
			method: "GET",
			url: url,
		}).then(function (response) {
			if (response.status !== 200) {
				dispatch(setRoutesList([]));
				throw new Error(response);
			}

			dispatch(setRoutesList(response.data));
		}).catch((error) => {
			dispatch(setRoutesList([]));
			console.log("ERROR: ", error);
		});
	};

	const mount = () => {
		getRoutes();

		const unmount = () => {};
		return unmount;
	};
	useEffect(mount, []);

	return (
		<div className="react-body">
			<MetroHeader />
			<MetroContent />
		</div>
	);
}

export default App;
