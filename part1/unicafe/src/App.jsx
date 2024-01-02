import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick} >{text}</button>
const Display = ({text, number}) => <p>{text} {number}</p>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total=good+neutral+bad;


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text="good"/>
      <Button onClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button onClick={() => setBad(bad+1)} text="bad"/>
      <h1> Statistics</h1>
      <Display text="good" number={good} />
      <Display text="neutral" number={neutral} />
      <Display text="bad" number={bad} />
      <Display text="all" number={total} />
      <Display text="average" number={(good*1+bad*-1)/total} />
      <Display text="positive" number={String(good/total*100)+" %"} />
    </div>
  )
}

export default App