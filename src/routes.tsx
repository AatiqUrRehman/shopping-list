import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import EditShop from "./components/EditShop/EditShop";

import HomePage from "./components/ShopingLists";
import EnterName from "./components/EnterUsername/EnterUsername";

const Routes: React.SFC = () => (
	<div>
		<Switch>
			<Route exact path="/" render={() => <EnterName />} />

			<Route
				exact
				path="/shoping-lists"
				render={() => (
					<Navbar>
						<HomePage />
					</Navbar>
				)}
			/>

			<Route
				exact
				path="/edit-shop"
				render={() => (
					<Navbar>
						<EditShop />
					</Navbar>
				)}
			/>
		</Switch>
	</div>
);

export default Routes;
