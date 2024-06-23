const SearchForm = ({eventHandler, searchTerm}) => {
    return (
    <form>
        <div>find countries: <input
        value={searchTerm}
        onChange={eventHandler}/>
        </div>
    </form>
    )
}

export default SearchForm