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

export default Course