import SearchIcon from '@/icons/SearchIcon';

const SearchSuggestion = ({
	suggestion,
	input,
	selectSuggestion,
	removeSuggestionsOver
}) => {
	const highlightMatch = (suggestion, input) => {
		const regex = new RegExp(`(${input})`, 'gi');
		return suggestion
			.split(regex)
			.map((part, index) =>
				regex.test(part) ? <b key={index}>{part}</b> : part
			);
	};

	return (
		<button
			className="search-suggestion"
			onClick={() => selectSuggestion(suggestion)}
			onMouseOver={removeSuggestionsOver}
		>
			<SearchIcon />
			{highlightMatch(suggestion, input)}
		</button>
	);
};

export default SearchSuggestion;
