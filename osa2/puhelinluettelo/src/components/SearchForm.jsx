const SearchForm = ({showFunction, eventHandler, searchTerm, setSearchTerm}) => {
    return (
        <form onSubmit={showFunction}>
        <div>search: <input
        value={searchTerm}
        onChange={eventHandler}/>
        </div>
        <div> 
        <button type="submit">search</button>
        <button type="submit" onClick={() => setSearchTerm('')}>show all</button>
        </div>
    </form>
    )
}

export default SearchForm