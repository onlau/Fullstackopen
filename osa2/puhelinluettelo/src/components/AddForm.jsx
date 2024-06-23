const AddForm = ({adder, name, number, nameHandler, numberHandler}) => {
    return (
        <form onSubmit={adder}>
        <div>
          name: <input 
          value={name}
          onChange={nameHandler}/>
        </div>
        <div>
          number: <input
          value={number}
          onChange={numberHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default AddForm