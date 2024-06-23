const Person = ({person, del}) => {
    return (
        <li>
            {person.name}, number: {person.number}
            <button onClick = {del}>delete</button>
        </li>
    )
}

export default Person