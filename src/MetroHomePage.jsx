/**
 * MetroHomePage.jsx
 * Purpose:
 * Component that contains all components fo the metro home page
 */

import React from "react";

import MetroHeader from "./MetroHeader.jsx";
import MetroContent from "./MetroContent.jsx";

import "./MetroHomePage.scss";

function MetroHomePage () {

	return (
		<div className="">
			<MetroHeader />
			<MetroContent />
		</div>
	);
}

export default MetroHomePage;
