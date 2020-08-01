export interface ShoppingItems {
	id: string;
	title: string;
	subItems: Array<SubShopItem>;
}

interface SubShopItem {
	id: string;
	item: string;
}

export enum ShoppingListActionTypes {
	CREATE_NEW_SHOPPING_LIST = "@@shop/CREATE_NEW_SHOPPING_LIST",
	ADD_USER_NAME = "@@shop/ADD_USER_NAME",
	CREATE_NEW_SUB_ITEM = "@@shop/CREATE_NEW_SUB_ITEM",
	DELETE_SUB_ITEM = "@@shop/DELETE_SUB_ITEM",
	DELETE_SHOP_LIST = "@@shop/DELETE_SHOP_LIST",
	UPDATE_SHOP_TITLE = "@@shop/UPDATE_SHOP_TITLE",
	UPDATE_SUB_SHOP_ITEM = "@@shop/UPDATE_SUB_SHOP_ITEM",
}

export interface ShoppingListState {
	readonly data: Array<ShoppingItems>;
	readonly userName?: string;
}
