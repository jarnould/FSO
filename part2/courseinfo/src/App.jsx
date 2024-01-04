const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part)=> <Part key={part.id} partName={part.name} partExercises={part.exercises} />)}
      <h3>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} </h3>
    </div>
  )
}

const Part = ({partName, partExercises}) => <p>{partName} {partExercises}</p>

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return <Course course={course} />
}

export default App