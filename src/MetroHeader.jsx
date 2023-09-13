/**
 * MetroHeader.jsx
 * Purpose:
 * Component that contains the header for the metro routes website
 */

import React from "react";
import { useSelector } from "react-redux";

import "./MetroHeader.scss";

function MetroHeader () {

	const routeData = useSelector(state => state.setRouteDataReducer.routeData);

	const routeTitle = routeData ? routeData.route_label : "";

	return (
		<div className="metro-header">
			<img
				className="metro-header-logo"
				src="https://www.metrotransit.org/img/MetroTransitLogo.svg"
				alt=""
			/>
			<div className="metro-header-title center">
				{routeTitle}
			</div>
			<div className="metro-header-title">
				Real-time Departures
			</div>
		</div>
	);
}

export default MetroHeader;
