const Header = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((el, id) => (
        <Part key={id} name={el.name} exercises={el.exercises} />
      ))}
    </div>
  );
};
const Total = ({ parts }) => (
  <b>total of {parts.reduce((acc, num) => acc + num.exercises, 0)} exercises</b>
);


const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;


