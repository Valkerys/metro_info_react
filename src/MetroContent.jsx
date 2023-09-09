/**
 * MetroContent.jsx
 * Purpose:
 * Component that contains all components in header and controls their layout
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setRouteData, setDirectionList, setDirectionData, setStopData } from "./redux/actions";

import DropDownMenu  from "./DropDownMenu.jsx";

import "./MetroContent.scss";

function MetroContent ({
	showEBooks = true
}) {
	const dispatch = useDispatch();

	const routeData = useSelector(state => state.setRouteDataReducer.routeData);
	const routesList = useSelector(state => state.setRoutesListReducer.routesList);
	const directionList = useSelector(state => state.setDirectionListReducer.directionList);

	const [routeListOpen, setRouteListOpen] = useState(false);

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
			console.log(response.data);
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
		dispatch(setRouteData(routeItem));
	};

	/**
	 * 
	 * @param {*} directionItem 
	 */
	const directionCallback = (directionItem) => {
		console.log(directionItem);
	};

	/**
	 * 
	 * @param {*} stopItem 
	 */
	const stopCallback = (stopItem) => {
		console.log(stopItem);
	};

	const mount = () => {

		const unmount = () => {};
		return unmount;
	};
	useEffect(mount, []);

	useEffect(() => {
		getRouteData(routeData);
	}, [routeData]);

	return (
		<div className="metro-content">
			<DropDownMenu
				callbackFunc={routeCallback}
				list={routesList}
				placeHolderText="Choose A Route"
			/>
		</div>
	);
}

export default MetroContent;
