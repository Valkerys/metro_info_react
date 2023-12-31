/**
 * index.js
 * Purpose:
 * Entry point for the application
*/

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App.jsx";
import store from "./redux/index.js";

const root = createRoot(document.getElementById('root'));

root.render(
	<Provider store={store} key="ProviderKey">
		<BrowserRouter key="BrowserRouterKey">
			<App />
		</BrowserRouter>
	</Provider>,
);
