 return {
    /*(<div className="app-container">
      {students_objects.map((student, index) => (
        <div className="card" key={index}>
          <Greetings name={student.name} />
          <Greetings name={student.rollno} />
          <Greetings name={student.class} />
        </div>
      ))}
    </div>
  );*/
  
}


function App() {
  const students=["Alexio","Rahil","Amaan"];
  const list=[]
  for(const object of students){
    list.push(<Greetings name={object}></Greetings>)
  }
  return   <>
  {list}
  </>
}

*/




const students_objects = [
    {
      name: 'Kutbuddin',
      rollno: "2305020",
      class: "TYBCA-A"
    },
    {
      name: 'Arjun',
      rollno: "2305008",
      class: "TYBCA-A"
    },
    {
      name: 'Alexio',
      rollno: "2305005",
      class: "TYBCA-A"
    }
  ];