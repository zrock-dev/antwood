const isValidToRequestStorage = () => {
	return typeof window !== 'undefined';
};

export const getItem = (key) => {
	return isValidToRequestStorage()
		? window.localStorage.getItem(key)
		: undefined;
};

export const saveItem = (key, value) => {
	isValidToRequestStorage() && window.localStorage.setItem(key, value);
};

export const editItem = (key, value) => {
	saveItem(key, value);
};

export const deleteItem = (key) => {
	isValidToRequestStorage() && window.localStorage.removeItem(key);
};
