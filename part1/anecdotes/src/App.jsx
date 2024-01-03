import { useState } from 'react'

const Anecdote = ({header, anecdote}) => {
  return (
    <div>
    <h1>{header}</h1>
    <p>{anecdote}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
  const [points,setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleClickNext = () => {
    setSelected(Math.floor(Math.random()* anecdotes.length))
  }

  const handleClickVote = () => {
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy) 
  }

  const mostVotedAnecdote =() => {
    let maxIndex = 0
    
    for (let i=0, max=0; i<points.length; i++) {
      if(points[i]>max) {
        maxIndex=i
        max=points[maxIndex]
      }
    }

    return anecdotes[maxIndex]
  }

   return (
    <div>
      <Anecdote header="Anectode of the day" anecdote={anecdotes[selected]} /> 
      <div>
        <button onClick={handleClickNext}>next anecdote</button>
        <button onClick={handleClickVote}>vote</button>
      </div>
      {points.every(elem => elem === 0) ? null : (
          <Anecdote header="Anectode with most votes" anecdote={mostVotedAnecdote()} /> 
        ) 
      }
    

    </div>
  )
}



export default App
