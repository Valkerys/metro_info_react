/**
 * MetroContent.jsx
 * Purpose:
 * Component that contains all components in header and controls their layout
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setRouteData, setDirectionList, setDirectionData, setStopData, setStopList } from "./redux/actions";

import DropDownMenu  from "./DropDownMenu.jsx";

import "./MetroContent.scss";

function MetroContent ({
	showEBooks = true
}) {
	const dispatch = useDispatch();

	const directionData = useSelector(state => state.setDirectionDataReducer.directionData);
	const directionList = useSelector(state => state.setDirectionListReducer.directionList);
	const routeData = useSelector(state => state.setRouteDataReducer.routeData);
	const routesList = useSelector(state => state.setRoutesListReducer.routesList);
	const stopData = useSelector(state => state.setStopDataReducer.stopData);
	const stopList = useSelector(state => state.setStopListReducer.stopList);

	/**
	 * 
	 * @param {objects} directionItem 
	 * @returns 
	 */
	const getDirectionData = (directionItem) => {
		const url = `${process.env.REACT_APP_METRO_API_URL}/stops/${routeData.route_id}/${directionItem.direction_id}`;

		return axios({
			method: "GET",
			url: url,
		}).then(function (response) {
			dispatch(setStopList(response.data));
		}).catch((error) => {
			console.log("ERROR: ", error);
		});
	};

	/**
	 * 
	 * @param {*} stopItem 
	 * @returns 
	 */
	const getStopData = (stopItem) => {
		const url = `${process.env.REACT_APP_METRO_API_URL}/${routeData.route_id}/${directionData.direction_id}/${stopItem.place_code}`;

		return axios({
			method: "GET",
			url: url,
		}).then(function (response) {
			console.log(response.data);
			// dispatch(setDirectionList(response.data));
		}).catch((error) => {
			console.log("ERROR: ", error);
		});
	};

	/**
	 * Axios call to get selected Route direction data
	 * @param {object} routeItem 
	 * @returns 
	 */
	const getRouteData = (routeItem) => {
		const url = `${process.env.REACT_APP_METRO_API_URL}/directions/${routeItem.route_id}`;

		return axios({
			method: "GET",
			url: url,
		}).then(function (response) {
			dispatch(setDirectionList(response.data));
		}).catch((error) => {
			console.log("ERROR: ", error);
		});
	};

	/**
	 * 
	 * @param {object} routeItem 
	 */
	const routeCallback = (routeItem) => {
		if (routeData.route_id !== routeItem.route_id) {
			dispatch(setRouteData(routeItem));
			dispatch(setDirectionList([]));
			dispatch(setStopList([]));
			dispatch(setDirectionData({}));
		} else {
			dispatch(setDirectionData({}));
		}
	};

	/**
	 * 
	 * @param {*} directionItem 
	 */
	const directionCallback = (directionItem) => {
		if (directionData.direction_name !== directionItem.direction_name) {
			dispatch(setDirectionData(directionItem));
			dispatch(setStopList([]));
		}
	};

	/**
	 * 
	 * @param {*} stopItem 
	 */
	const stopCallback = (stopItem) => {
		dispatch(setStopData(stopItem));
	};

	/**
	 * 
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

	const mount = () => {

		const unmount = () => {};
		return unmount;
	};
	useEffect(mount, []);

	useEffect(() => {
		if (!isObjectEmpty(routeData)) {
			getRouteData(routeData);
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

			<div className="metro-content-table">
				Table
			</div>
		</div>
	);
}

export default MetroContent;
