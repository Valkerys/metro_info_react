/**
 * MetroContent.jsx
 * Purpose:
 * Component that handle all intake of data and fetches i based on URL or user input
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import axios from "axios";

import { setRouteData, setDirectionData, setStopData, setStopTableData } from "./redux/actions";

import DropDownMenu from "./DropDownMenu.jsx";
import MetroContentTable from "./MetroContentTable.jsx";

import "./MetroContent.scss";

function MetroContent () {
	const dispatch = useDispatch();

	const matchBasic = useMatch({
		path: "/",
		end: true,
		caseSensitive: true
	});
	const matchRoute = useMatch({
		path: "/metroRoutes/routeId/:routeId",
		end: true,
		caseSensitive: true
	});
	const matchDirection = useMatch({
		path: "/metroRoutes/routeId/:routeId/direction/:directionId",
		end: true,
		caseSensitive: true
	});
	const matchStop = useMatch({
		path: "/metroRoutes/routeId/:routeId/direction/:directionId/stop/:stopId",
		end: true,
		caseSensitive: true
	});

	let match = matchBasic;
	if (matchRoute || matchDirection || matchStop) {
		match = matchRoute || matchDirection || matchStop;
	}

	const directionData = useSelector(state => state.setDirectionDataReducer.directionData);
	const routeData = useSelector(state => state.setRouteDataReducer.routeData);
	const routesList = useSelector(state => state.setRoutesListReducer.routesList);
	const stopData = useSelector(state => state.setStopDataReducer.stopData);

	const [directionList, setDirectionList] = useState([]);
	const [stopList, setStopList] = useState([]);

	/**
	 * Fetches direction data based on route and direction id
	 * @param {objects} directionItem 
	 * @returns 
	 */
	const getDirectionData = (directionItem) => {
		const url = `${process.env.REACT_APP_METRO_API_URL}/stops/${routeData.route_id}/${directionItem.direction_id}`;

		return axios({
			method: "GET",
			url: url,
		}).then(function (response) {
			setStopList(response.data);
		}).catch((error) => {
			console.log("ERROR: ", error);
		});
	};

	/**
	 * Fetches stop based on route, direction id and route place code
	 * @param {*} stopItem 
	 * @returns 
	 */
	const getStopData = (stopItem) => {
		const url = `${process.env.REACT_APP_METRO_API_URL}/${routeData.route_id}/${directionData.direction_id}/${stopItem.place_code}`;

		return axios({
			method: "GET",
			url: url,
		}).then(function (response) {
			dispatch(setStopTableData(response.data));
		}).catch((error) => {
			console.log("ERROR: ", error);
		});
	};

	/**
	 * Fetches route data based on route id
	 * @param {object} routeItem 
	 * @returns 
	 */
	const getRouteData = (routeId) => {
		const url = `${process.env.REACT_APP_METRO_API_URL}/directions/${routeId}`;

		return axios({
			method: "GET",
			url: url,
		}).then(function (response) {
			setDirectionList(response.data);
		}).catch((error) => {
			console.log("ERROR: ", error);
		});
	};

	/**
	 * Route callback that handles change in route value or user input
	 * @param {object} routeItem 
	 */
	const routeCallback = (routeItem) => {
		if (routeData.route_id !== routeItem.route_id) {
			dispatch(setRouteData(routeItem));
			setDirectionList([]);
			setStopList([]);
			dispatch(setDirectionData({}));
			dispatch(setStopData({}));
			dispatch(setStopTableData({}));
		} else {
			dispatch(setDirectionData({}));
		}
	};

	/**
	 * Route callback that handles change in direction value or user input
	 * @param {*} directionItem 
	 */
	const directionCallback = (directionItem) => {
		if (directionData.direction_name !== directionItem.direction_name) {
			dispatch(setDirectionData(directionItem));
			dispatch(setStopData({}));
			dispatch(setStopTableData({}));
			setStopList([]);
		}
	};

	/**
	 * Route callback that handles change in stop value or user input
	 * @param {*} stopItem 
	 */
	const stopCallback = (stopItem) => {
		document.getElementById("metro-content-table").scrollIntoView();
		dispatch(setStopData(stopItem));

		if (window.history.replaceState) {
			const newurl = window.location.protocol + "//" + window.location.host + `/metroRoutes/routeId/${routeData.route_id}/direction/${directionData.direction_id}/stop/${stopItem.place_code}`;
			window.history.replaceState({path:newurl}, '', newurl);
		}
	};

	/**
	 * Checks if object is empty
	 * @param {*} objectName 
	 * @returns 
	 */
	const isObjectEmpty = (objectName) => {
		return (
			objectName &&
			(Object.keys(objectName).length === 0) &&
			(objectName.constructor === Object)
		);
	};

	/**
	 * Function that returns a direction object based on given id or false
	 * @param {*} objectName 
	 * @returns 
	 */
	const findDirectionData = (directionId) => {
		for (let i = 0; i < directionList.length; i++) {
			const direction = directionList[i];

			if (direction.direction_id === parseInt(directionId)) {
				return direction;
			}
		}
		return false;
	};

	/**
	 * Function that returns a stop object based on given id or false
	 * @param {*} objectName 
	 * @returns 
	 */
	const findStopData = (stopId) => {
		for (let i = 0; i < stopList.length; i++) {
			const stop = stopList[i];

			if (stop.place_code === stopId) {
				return stop;
			}
		}
		return false;
	};

	/**
	 * Function that returns a route object based on given id or false
	 * @param {*} objectName 
	 * @returns 
	 */
	const findRouteData = (routeId) => {
		for (let i = 0; i < routesList.length; i++) {
			const route = routesList[i];

			if (route.route_id === routeId.toString()) {
				return route;
			}
		}
		return false;
	};

	const mount = () => {
		window.addEventListener('popstate', function(event) {
			window.location = window.location.pathname;
		}, false);

		const unmount = () => {
			window.removeEventListener('popstate', function(event) {
				window.location = window.location.pathname;
			}, false);
		};
		return unmount;
	};
	useEffect(mount, []);

	useEffect(() => {
		if (match && match.params.routeId) {
			const returnRouteData = findRouteData(match.params.routeId);

			if (returnRouteData) {
				routeCallback(returnRouteData);
			}
		}
	}, [routesList]);

	useEffect(() => {
		if (match && match.params.directionId && (directionList.length > 0)) {
			const returnDirectionData = findDirectionData(match.params.directionId);

			if (returnDirectionData) {
				directionCallback(returnDirectionData);
			}
		}
	}, [directionList]);

	useEffect(() => {
		if (match && match.params.stopId && (stopList.length > 0)) {
			const returnStopData = findStopData(match.params.stopId);

			if (returnStopData) {
				stopCallback(returnStopData);
			}
		}
	}, [stopList]);

	useEffect(() => {
		if (!isObjectEmpty(routeData)) {
			getRouteData(routeData.route_id);
		}
	}, [routeData]);

	useEffect(() => {
		if (!isObjectEmpty(directionData)) {
			getDirectionData(directionData);
		}
	}, [directionData]);

	useEffect(() => {
		if (!isObjectEmpty(stopData) && (stopData !== undefined)) {
			getStopData(stopData);
		}
	}, [stopData]);

	return (
		<div className="metro-content">
			<div className="metro-content-dropdowns">
				{(routesList.length > 0) &&
					<DropDownMenu
						callbackFunc={routeCallback}
						initialOptionText="Choose A Route"
						list={routesList}
						title="Routes"
					/>
				}

				{(directionList.length === 0) &&
					<div className="metro-content-dropdowns-placeholder" />
				}

				{(directionList.length > 0) &&
					<DropDownMenu
						callbackFunc={directionCallback}
						initialOptionText="Choose A Direction"
						list={directionList}
						title="Directions"
					/>
				}


				{(stopList.length === 0) &&
					<div className="metro-content-dropdowns-placeholder" />
				}

				{(stopList.length > 0) &&
					<DropDownMenu
						callbackFunc={stopCallback}
						initialOptionText="Choose A Stop"
						list={stopList}
						title="Stops"
					/>
				}
			</div>

			<MetroContentTable />
		</div>
	);
}

export default MetroContent;
