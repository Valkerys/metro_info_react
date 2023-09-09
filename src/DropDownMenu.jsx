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
	placeHolderText = "Choose An Option"
}) {

	const [routeListOpen, setRouteListOpen] = useState(false);
	const [name, setName] = useState(placeHolderText);

	/////////////

	/**
	 * 
	 * @param {object} routeItem 
	 */
	const callbackClick = (routeItem) => {
		callbackFunc(routeItem);
		setName(routeItem.route_label);
		setRouteListOpen(false);
	};

	/**
	 * 
	 * @param {*} event 
	 * @param {object} routeItem 
	 */
	const onKeyPressRoute = (event, routeItem) => {
		if (event.key === "Enter") {
			callbackClick(routeItem);
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
				Routes
			</div>
			{!routeListOpen &&
				<div
					className="drop-down-menu-choose"
					onClick={() => openList()}
				>
					{name}
				</div>
			}

			{routeListOpen &&
				<div className="drop-down-menu-options">
					{list.map((routeItem, i) => {
						return (
							<ul
								className="drop-down-menu-route"
								key={i}
								tabIndex={0}
								onClick={() => callbackClick(routeItem)}
								onKeyDown={(event) => onKeyPressRoute(event, routeItem)}
							>
								{routeItem.route_label}
							</ul>
						);
					})}
				</div>
			}
		</div>
	);
}

export default DropDownMenu;
