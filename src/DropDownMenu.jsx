/**
 * DropDownMenu.jsx
 * Purpose:
 * Component that contains all components in header and controls their layout
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./DropDownMenu.scss";

function DropDownMenu ({
	callbackFunc,
	list,
	initialOptionText = "Choose An Option",
	title
}) {

	const [routeListOpen, setRouteListOpen] = useState(false);
	const [initialOption, setInitialOption] = useState(initialOptionText);

	/**
	 * 
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

		setRouteListOpen(false);
		callbackFunc(listItem);
	};

	/**
	 * 
	 * @param {*} event 
	 * @param {object} listItem 
	 */
	const onKeyPressRoute = (event, listItem) => {
		if (event.key === "Enter") {
			callbackClick(listItem);
		}
	};

	/**
	 * 
	 */
	const openList = () => {
		setRouteListOpen(true);
	};

	const mount = () => {

		const unmount = () => {};
		return unmount;
	};
	useEffect(mount, []);

	return (
		<div className="drop-down-menu">
			<div className="drop-down-menu-title">
				{title}
			</div>
			{!routeListOpen &&
				<div
					className="drop-down-menu-choose"
					onClick={() => openList()}
				>
					{initialOption}
				</div>
			}

			{routeListOpen &&
				<div className="drop-down-menu-options">
					{list.map((listItem, i) => {
						let label;
						console.log(listItem);
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
								onKeyDown={(event) => onKeyPressRoute(event, listItem)}
							>
								{label}
							</ul>
						);
					})}
				</div>
			}
		</div>
	);
}

export default DropDownMenu;
