const Course = ({course}) => {
    const parts = course.parts
    const total = parts.reduce(exSum,0)
    return (
        <div>
            <h3>{course.name}</h3>
            {parts.map(part => <div key={part.id}>{part.name}, {part.exercises} tehtävää.</div>)}
            <div>Tehtäviä yhteensä: {total}</div>
        </div>    
    )
}

function exSum(a,b){
    return a+b.exercises
}

export default Course