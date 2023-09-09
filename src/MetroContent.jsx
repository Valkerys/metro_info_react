/**
 * MetroContent.jsx
 * Purpose:
 * Component that contains all components in header and controls their layout
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./MetroContent.scss";

function MetroContent ({
	showEBooks = true
}) {

	// const productType = useSelector(state => state.setProductTypeReducer.productType);

	const mount = () => {

		const unmount = () => {};
		return unmount;
	};
	useEffect(mount, []);

	return (
		<div className="metro-content">
			<div>
				History
			</div>

			<div>
				Ccontent
			</div>
		</div>
	);
}

export default MetroContent;
