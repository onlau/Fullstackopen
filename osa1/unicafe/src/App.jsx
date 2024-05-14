import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const average=good+bad+neutral==0 ? 0 : (good-bad)/(good+bad+neutral)
  const positive=good+bad+neutral==0 ? 0 : good/(good+bad+neutral)*100

  if (good+bad+neutral==0) {
    return (
      <div>      
        <Header text="give feedback"/>
        <Button handleClick={() => setGood(good+1)} text="good"/>
        <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
        <Button handleClick={() => setBad(bad+1)} text="bad"/>
        <Header text="statistics"/>
        <Text text="No feedback given"/>
      </div>
    )
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <Header text="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral} average={average} positive={positive}/>
    </div>
  )
}

const Statistics = (props) =>(
  <div>
    <table>
      <tbody>
        <StatisticLine text="good" number={props.good}/>
        <StatisticLine text="neutral" number={props.neutral}/>
        <StatisticLine text="bad" number={props.bad}/>
        <StatisticLine text="average" number={props.average}/>
        <StatisticLine text="positive" number={props.positive+" %"}/>
      </tbody>
    </table>
  </div>
)

const Text = ({text}) => <p>{text}</p>

const StatisticLine = ({text, number}) => {
  return (
  <tr>
    <td>
      {text}
    </td>
    <td>
      {number}
    </td>
  </tr>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

export default App