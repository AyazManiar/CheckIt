import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  // Load data from LocalStorage on first render
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodoList(JSON.parse(todoString));
    }
  }, []);

  // Save to LocalStorage whenever todoList is updated
  useEffect(() => {
    if (todoList.length > 0) {
      // Prevent overwriting with an empty array on first load
      localStorage.setItem("todos", JSON.stringify(todoList));
    }
  }, [todoList]);

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
  // editTask: used from another file
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
