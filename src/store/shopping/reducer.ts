import { Reducer } from "redux";

import { ShoppingListActionTypes, ShoppingListState } from "./types";

export const initialState: ShoppingListState = {
	data: [],
	userName: "",
};

const reducer: Reducer<ShoppingListState> = (state = initialState, action) => {
	console.log("from reducer");
	switch (action.type) {
		case ShoppingListActionTypes.ADD_USER_NAME: {
			console.log(action);
			return {
				userName: action.payload,
				data: [...state.data, action.payload],
			};
		}

		case ShoppingListActionTypes.CREATE_NEW_SHOPPING_LIST: {
			console.log(action);
			var shopItem = {
				id: Math.floor(Math.random() * 10000 + 2),
				title: action.payload,
				subItems: [],
			};

			return {
				userName: state.userName,
				data: [...state.data, shopItem],
			};
		}

		case ShoppingListActionTypes.CREATE_NEW_SUB_ITEM: {
			let index = state.data.findIndex(
				(items) => items.id === action.payload.id,
			);

			var subShopItem = {
				id: Math.floor(Math.random() * 10000 + 2).toString(),
				item: action.payload.item,
			};

			state.data[index].subItems.push(subShopItem);

			return {
				userName: state.userName,
				data: [...state.data],
			};
		}

		case ShoppingListActionTypes.DELETE_SUB_ITEM: {
			let index = state.data.findIndex(
				(items) => items.id === action.payload.shopId,
			);

			let indexForSubItem = state.data[index].subItems.findIndex(
				(items) => items.id === action.payload.subId,
			);

			state.data[index].subItems.splice(indexForSubItem, 1);

			return {
				userName: state.userName,
				data: [...state.data],
			};
		}

		case ShoppingListActionTypes.DELETE_SHOP_LIST: {
			let index = state.data.findIndex(
				(items) => items.id === action.payload.shopId,
			);

			state.data.splice(index, 1);

			return {
				userName: state.userName,
				data: [...state.data],
			};
		}

		case ShoppingListActionTypes.UPDATE_SHOP_TITLE: {
			let index = state.data.findIndex(
				(items) => items.id === action.payload.id,
			);

			state.data[index].title = action.payload.newTitle;

			return {
				userName: state.userName,
				data: [...state.data],
			};
		}

		case ShoppingListActionTypes.UPDATE_SUB_SHOP_ITEM: {
			let index = state.data.findIndex(
				(items) => items.id === action.payload.id,
			);

			let indexForSubItem = state.data[index].subItems.findIndex(
				(items) => items.id === action.payload.subId,
			);

			state.data[index].subItems[indexForSubItem].item =
				action.payload.newItemTitle;

			return {
				userName: state.userName,
				data: [...state.data],
			};
		}

		default: {
			return state;
		}
	}
};

export { reducer as ShopReducer };
