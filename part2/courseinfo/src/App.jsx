const Header = ({courseName}) => <h2>{courseName}</h2>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part)=> <Part key={part.id} partName={part.name} partExercises={part.exercises} />)}
      <h3>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercices</h3>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App