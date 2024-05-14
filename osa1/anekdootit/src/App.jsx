import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const PickAnecdote = () => {
    let index=Math.floor(Math.random()*anecdotes.length)
    setSelected(index==selected ? index-1 : index)    //Estetään saman anekdootin valinta 2 kertaa putkeen.
  }

  const VoteAnecdote = () => {
    const newVotes = {...votes}
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0,1:0,2:0,3:0,4:0,5:0,
    6:0,7:0
  })
  let mostVotes=0;
  let index=0;
  for (const i in votes){
    if (votes[i]>mostVotes){
      index=i
      mostVotes=votes[i]
    }
  }

  return (
    <div>
      <div>
        <Header text="Anecdote of the day"/>
        {anecdotes[selected]}
        <Text text={"has "+votes[selected]+" votes"}/>
      </div>
      <div>
        <Button HandleClick={()=>PickAnecdote()} text="next anecdote"/>
        <Button HandleClick={()=>VoteAnecdote()} text="vote"/>
      </div>
      <div>
        <Header text="Anecdote with most votes"/>
        {anecdotes[index]}
        <Text text={"has "+mostVotes+" votes"}/>
      </div>
    </div>
  )
}

const Text = ({text}) => <div>{text}</div>

const Header = ({text}) => <h1>{text}</h1>

const Button = ({HandleClick, text}) => {
  return (
    <button onClick={HandleClick}>
      {text}
    </button>
  )
}
export default App