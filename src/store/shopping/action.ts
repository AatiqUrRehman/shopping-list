import { ShoppingListActionTypes, ShoppingItems } from "./types";

import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { ApplicationState } from "../index";

export type AppThunk = ThunkAction<
	void,
	ApplicationState,
	null,
	Action<string>
>;

export const createNewShopList: ActionCreator<ThunkAction<
	void,
	ApplicationState,
	ShoppingItems,
	Action<string>
>> = (item) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ShoppingListActionTypes.CREATE_NEW_SHOPPING_LIST,
			payload: item,
		});
	};
};

export const createNewSubItem: ActionCreator<ThunkAction<
	void,
	ApplicationState,
	ShoppingItems,
	Action<string>
>> = (item) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ShoppingListActionTypes.CREATE_NEW_SUB_ITEM,
			payload: item,
		});
	};
};

export const deleteSubItems: ActionCreator<ThunkAction<
	void,
	ApplicationState,
	ShoppingItems,
	Action<string>
>> = (item) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ShoppingListActionTypes.DELETE_SUB_ITEM,
			payload: item,
		});
	};
};

export const saveUserName: ActionCreator<ThunkAction<
	void,
	ApplicationState,
	ShoppingItems,
	Action<string>
>> = (item) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ShoppingListActionTypes.ADD_USER_NAME,
			payload: item,
		});
	};
};

export const deleteShopList: ActionCreator<ThunkAction<
	void,
	ApplicationState,
	ShoppingItems,
	Action<string>
>> = (item) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ShoppingListActionTypes.DELETE_SHOP_LIST,
			payload: item,
		});
	};
};

export const updateShopListTitle: ActionCreator<ThunkAction<
	void,
	ApplicationState,
	ShoppingItems,
	Action<string>
>> = (item) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ShoppingListActionTypes.UPDATE_SHOP_TITLE,
			payload: item,
		});
	};
};

export const updateSubShopItemTitle: ActionCreator<ThunkAction<
	void,
	ApplicationState,
	ShoppingItems,
	Action<string>
>> = (item) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ShoppingListActionTypes.UPDATE_SUB_SHOP_ITEM,
			payload: item,
		});
	};
};
