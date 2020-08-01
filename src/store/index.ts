import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { ShopReducer } from "./shopping/reducer";
import { ShoppingListState } from "./shopping/types";
import { RouterState } from "connected-react-router";

export interface ApplicationState {
	shop: ShoppingListState;
	router: RouterState;
}

export const createRootReducer = (history: History) =>
	combineReducers({
		shop: ShopReducer,
		router: connectRouter(history),
	});
