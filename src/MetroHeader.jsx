/**
 * ProductPicker.jsx
 * Purpose:
 * Component that contains all components in header and controls their layout
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./MetroHeader.scss";

function MetroHeader ({
	showEBooks = true
}) {

	const routeData = useSelector(state => state.setRouteDataReducer.routeData);

	const mount = () => {

		const unmount = () => {};
		return unmount;
	};
	useEffect(mount, []);

	const routeTitle = routeData ? routeData.route_label : "";

	return (
		<div className="metro-header">
			<img src="https://www.metrotransit.org/img/MetroTransitLogo.svg" alt="" />
			<div className="metro-header-title">
				{routeTitle}
			</div>
			<div className="metro-header-title">
				Real-time Departures
			</div>
		</div>
	);
}

export default MetroHeader;
