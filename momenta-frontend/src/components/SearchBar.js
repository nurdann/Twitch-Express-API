
const SearchBar = ({setChannel}) => {
    const updateQuery = (event) => {
        event.preventDefault();
        const searchValue = document.getElementById('search-input')?.value;
        setChannel(searchValue);
    };

    return (
    <header className="search-field">
        <form>
            <input type="text" id="search-input" placeholder="Enter channel name..." />
            <button id="search-button" onClick={updateQuery}>Search</button>
        </form>
    </header>
    )
};

export default SearchBar;