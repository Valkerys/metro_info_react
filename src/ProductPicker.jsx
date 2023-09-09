/**
 * ProductPicker.jsx
 * Purpose:
 * Component that contains all components in header and controls their layout
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setProductType } from "./redux/actions";
import { haveRole, roles } from "shared-frontend/dist/CookieManager";
import Logger, { actionNames, logTypes } from "shared-frontend/dist/Logger";
import { tools } from "./ToolPage";
import { mouseDownRemoveFocus } from "shared-frontend/dist/Utilities";

import eBooksCILogo from "./assets/ebook_ci_logo.png";
import pgLogo from "./assets/pg_logo.png";
import pgnLogo from "./assets/pgn_logo.png";

import "./ProductPicker.scss";

function ProductPicker ({
	showEBooks = true
}) {
	const dispatch = useDispatch();

	const productType = useSelector(state => state.setProductTypeReducer.productType);
	const selectedTool = useSelector(state => state.setSelectedToolReducer.selectedTool);

	/**
	 * Callback on button click to set the product type (app id)
	 * @param {int} type 
	 * @public
	 */
	const setProductTypeAndLog = (type) => {
		dispatch(setProductType(type));

		let logType = "";
		switch (selectedTool) {
			case tools.disableArticles:
				logType = logTypes.adminDisableArticlesTool;
				break;
			case tools.linkProducts:
				logType = logTypes.adminLinkProductsTool;
				break;
			case tools.loginInfo:
				logType = logTypes.adminLoginInfoTool;
				break;
			case tools.reports:
				logType = logTypes.adminReportsTool;
				break;
			case tools.products:
				logType = logTypes.adminSubscriptionsTool;
				break;
			default:
				return;
		}

		let actionType = "";
		switch (type) {
			case 2:
				actionType = actionNames.pebbleGo;
				break;
			case 3:
				actionType = actionNames.pebbleGoNext;
				break;
			case 14:
				actionType = actionNames.ebook;
				break;
			default:
				return;
		}
		Logger.logEvent(logType, {
			action_name: actionType,
			product_name: "Admin Tool",
		});
	};

	let pebbleGoClassName = "product-button";
	let pebbleGoNextClassName = "product-button";
	let eBooksClassName = "product-button";

	switch (productType) {
		case 2:
			pebbleGoClassName += " selected";
			break;
		case 3:
			pebbleGoNextClassName += " selected";
			break;
		case 14:
			eBooksClassName += " selected";
			break;
		default:
			return;
	}

	const mount = () => {
		if (productType !== 2) {
			dispatch(setProductType(2));
		}

		const unmount = () => {};
		return unmount;
	};
	useEffect(mount, []);

	return (
		<div className="product-picker">
			{(haveRole(roles.pebbleGo) || haveRole(roles.adminUser)) &&
				<button
					aria-label="Pebblego Product Button"
					className={pebbleGoClassName}
					onClick={() => setProductTypeAndLog(2)}
					onMouseDown={mouseDownRemoveFocus}
					id="product-picker-pebblego-button"
				>
					<img className="pgo-graphic" src={pgLogo} alt="" role="img"/>
				</button>
			}
			{(haveRole(roles.pebbleGoNext) || haveRole(roles.adminUser)) &&
				<button
					aria-label="Pebblego Next Product Button"
					className={pebbleGoNextClassName}
					onClick={() => setProductTypeAndLog(3)}
					onMouseDown={mouseDownRemoveFocus}
					id="product-picker-pebblegonext-button"
				>
					<img className="pgn-graphic" src={pgnLogo} alt="" role="img"/>
				</button>
			}
			{(haveRole(roles.books) || haveRole(roles.adminUser)) && showEBooks &&
				<button
					aria-label="Capstone Interactive Books Product Button"
					className={eBooksClassName}
					onClick={() => setProductTypeAndLog(14)}
					onMouseDown={mouseDownRemoveFocus}
					id="product-picker-ebook-button"
				>
					<img className="ebook-graphic" src={eBooksCILogo} alt="" role="img"/>
				</button>
			}
		</div>
	);
}

export default ProductPicker;
