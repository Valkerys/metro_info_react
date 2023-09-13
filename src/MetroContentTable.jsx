/**
 * MetroContentTable.jsx
 * Purpose:
 * Component that displays the data for a stop and if empty, shows a map
 */

import React from "react";
import { useSelector } from "react-redux";

import metroMap from "./assets/metro_map.png";

import "./MetroContentTable.scss";

function MetroContentTable () {

	const directionData = useSelector(state => state.setDirectionDataReducer.directionData);
	const stopData = useSelector(state => state.setStopDataReducer.stopData);
	const stopTableData = useSelector(state => state.setStopTableDataReducer.stopTableData);

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

	if (isObjectEmpty(stopTableData)) {
		return (
			<div className="metro-content-table" id="metro-content-table">
				<div className="metro-content-table-header">
					<div className="metro-content-table-header-title">
						<div className="metro-content-table-header-stop-name">
							Metro Route
						</div>
					</div>

					<div className="metro-content-table-header-stop-number">
						{`Stop #: N/A`}
					</div>
				</div>

				<div className="metro-content-table-data-titles">
					<div className="metro-content-table-data-titles-text">
						Route
					</div>
					<div>
						Destination
					</div>
					<div className="metro-content-table-data-titles-text right">
						Departure time
					</div>
				</div>

				<div className="metro-content-table-content-empty">
					<img
						className="metro-content-table-content-empty-map"
						src={metroMap}
						alt=""
					/>
					No Stop Selected
				</div>
			</div>
		);
	}

	return (
		<div className="metro-content-table" id="metro-content-table">
			<div className="metro-content-table-header">
				<div className="metro-content-table-header-title">
					<div className="metro-content-table-header-stop-name">
						{stopData.description}
					</div>
					{`Going ${directionData.direction_name}`}
				</div>

				<div className="metro-content-table-header-stop-number">
					{`Stop #: ${stopTableData.stops[0].stop_id}`}
				</div>
			</div>

			<div className="metro-content-table-data-titles">
				<div className="metro-content-table-data-titles-text">
					Route
				</div>
				<div>
					Destination
				</div>
				<div className="metro-content-table-data-titles-text right">
					Departure time
				</div>
			</div>

			<div className="metro-content-table-content">
				{stopTableData.departures.map((departureItem, i) => {
					return (
						<ul
							className={`metro-content-table-content-item ${(i % 2 === 0) ? "" : "white"} ${((stopTableData.departures.length - 1) === i) ? "last" : ""}`}
							key={i}
							tabIndex={0}
						>
							<div className="metro-content-table-content-item-route-name">
								{departureItem.route_short_name}
							</div>
							<div className="metro-content-table-content-item-destination">
								{departureItem.description}
							</div>
							<div className="metro-content-table-content-item-departure">
								{departureItem.departure_text}
							</div>
						</ul>
					);
				})}
			</div>

		</div>
	);
}

export default MetroContentTable;
