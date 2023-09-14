/**
 * DropDownMenu.jsx
 * Purpose:
 * Component that displays a given list of items which range from routes, directions and stops
 */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./DropDownMenu.scss";

function DropDownMenu ({
	callbackFunc,
	list,
	initialOptionText = "Choose An Option",
	title
}) {

	const directionData = useSelector(state => state.setDirectionDataReducer.directionData);
	const stopData = useSelector(state => state.setStopDataReducer.stopData);
	const routeData = useSelector(state => state.setRouteDataReducer.routeData);

	const [listOpen, setListOpen] = useState(false);
	const [initialOption, setInitialOption] = useState(initialOptionText);

	/**
	 * function that handles the callback click once it has been pressed
	 * @param {object} listItem 
	 */
	const callbackClick = (listItem) => {
		if (listItem.route_label) {
			setInitialOption(listItem.route_label);
		} else if (listItem.direction_name) {
			setInitialOption(listItem.direction_name);
		} else if (listItem.description) {
			setInitialOption(listItem.description);
		}

		setListOpen(false);
		callbackFunc(listItem);
	};

	/**
	 * Handle checking if click is outside menu and return last selection
	 * @param {object} event 
	 */
	const handleClickOutside = (event) => {
		// only close menu if click NOT in menu or child element
		const closest = event.target.closest(`#drop-down-menu-${title}`);

		if (!closest) {
			setListOpen(false);
		}
	};

	/**
	 * On Key press if user presses the enter button
	 * @param {*} event 
	 * @param {object} listItem 
	 */
	const onKeyPressOpen = (event) => {
		if (event.key === "Enter") {
			openList();
		}
	};

	/**
	 * On Key press if user presses the enter button
	 * @param {*} event 
	 * @param {object} listItem 
	 */
	const onKeyPressOption = (event, listItem) => {
		if (event.key === "Enter") {
			callbackClick(listItem);
		}
	};

	/**
	 * Function that opens the dropdown list
	 */
	const openList = () => {
		setListOpen(true);
	};

	const mount = () => {
		window.addEventListener("click", handleClickOutside);

		const unmount = () => {
			window.removeEventListener("click", handleClickOutside);
		};
		return unmount;
	};
	useEffect(mount, []);

	useEffect(() => {
		if (title === "Routes" && routeData.route_label) {
			setInitialOption(routeData.route_label);
		}
	}, [routeData]);

	useEffect(() => {
		if (title === "Directions" && directionData.direction_name) {
			setInitialOption(directionData.direction_name);
		}
	}, [directionData]);

	useEffect(() => {
		if (title === "Stops" && stopData.description) {
			setInitialOption(stopData.description);
		}
	}, [stopData]);

	return (
		<div className="drop-down-menu" id={`drop-down-menu-${title}`}>
			<div className="drop-down-menu-title">
				{title}
			</div>
			{!listOpen &&
				<div
					className="drop-down-menu-choose"
					onClick={() => openList()}
					onKeyDown={(event) => onKeyPressOpen(event)}
					id={`drop-down-menu-${title}`}
					tabIndex={0}
				>
					<div className="drop-down-menu-choose-text">
						{initialOption}
					</div>
				</div>
			}

			{listOpen &&
				<div className="drop-down-menu-options" id={`drop-down-menu-${title}`}>
					{list.map((listItem, i) => {
						let label;
						if (listItem.route_label) {
							label = listItem.route_label;
						} else if (listItem.direction_name) {
							label = listItem.direction_name;
						} else if (listItem.place_code) {
							label = listItem.description;
						}

						return (
							<ul
								className="drop-down-menu-route"
								key={i}
								tabIndex={0}
								onClick={() => callbackClick(listItem)}
								onKeyDown={(event) => onKeyPressOption(event, listItem)}
							>
								<div className="drop-down-menu-route-text">
									{label}
								</div>
							</ul>
						);
					})}
				</div>
			}
		</div>
	);
}

export default DropDownMenu;
