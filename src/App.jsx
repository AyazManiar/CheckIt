import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
  const [todoList, setTodoList] = useState(()=>{
    let todoString = localStorage.getItem("todos")
    return todoString ? JSON.parse(todoString) : []
  });
  const [showFinished, setShowFinished] = useState(()=>{
    let showFinished = localStorage.getItem("showFinished")
    return showFinished ? JSON.parse(showFinished) : true;
  })

  // Save to LocalStorage whenever todoList is updated
  useEffect(() => {
    // Prevent overwriting with an empty array on first load
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  useEffect(()=>{
    localStorage.setItem("showFinished", JSON.stringify(showFinished))
  }, [showFinished])

  // Function to toggle the completed state
  const toggleComplete = (id) => {
    setTodoList((prevItems) =>
      prevItems.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );    
  };
  const deleteTask = (id) => {
    setTodoList((prevItems) => prevItems.filter((todo) => todo.id !== id));
  };
  // editTask
  const editTask = (e, id, setEditText) => {
    const newText = e.target.value;
    setEditText(newText)

    setTodoList((prevItems) =>
      prevItems.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const toggleFinish = () => setShowFinished(prev => !prev);

  

  { console.log(todoList) }
  return (
    <>
      <Navbar todoList={todoList} setTodoList={setTodoList} />
      <div className="todo-list">
        {todoList.length == 0 && <div>No todos to display</div>}
        <input type="checkbox" checked={showFinished} onChange={toggleFinish} name="showFinished" id="showFinished" /> Show Finished
        {todoList
        .filter((e) => !e.isCompleted || showFinished ) // OR
        .map((e) => (
            <Todo
            
              key={e.id}
              todo={e}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
            />
        ))}
      </div>
    </>
  );
}

export default App;
