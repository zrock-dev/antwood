export const stringToJson = (text) => {
	return JSON.parse(text);
};

export const stringToArray = (text) => {
	return JSON.parse(text);
};

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};


export const dateParser = (date) => {
	return new Date(date).toLocaleDateString("en-US", options);
}