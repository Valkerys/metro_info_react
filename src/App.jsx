/**
 * App.jsx
 * Purpose:
 * Component that renders react-body and all elements below.
 * Also deals with auto authentication, eulas, logging, session timing,
 * languageStrings, and debug info component.
 */
import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setRoutesList } from "./redux/actions";

import MetroHomePage from "./MetroHomePage.jsx";

import './App.scss';

function App() {
	const dispatch = useDispatch();

	/**
	 * Fetches the list of available routes
	 * @returns 
	 */
	const getRoutesData = () => {
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
		getRoutesData();

		if (!window.location.pathname.includes("/metroRoutes")) {
			window.location.pathname = "/metroRoutes";
			return "";
		}

		const unmount = () => {};
		return unmount;
	};
	useEffect(mount, []);

	return (
		<div className="react-body">
			<Routes>
				<Route path="*" component={<MetroHomePage />} />
				<Route path="/metroRoutes/*" element={<MetroHomePage />} />
			</Routes>
		</div>
	);
}

export default App;
