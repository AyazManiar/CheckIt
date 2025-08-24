import { useState } from 'react'
import './Navbar.css'
// import { v4 as uuidv4 } from "uuid";

// #B898E8, #3094fe

const Navbar = ({todoList, setTodoList}) => {
  
  const [text, setText] = useState("")
  
  const changeText = (e)=>{
    setText(e.target.value)
  }

  const addTodo = ()=>{
    if(text.trim()!=""){
      const todo = {id: Date.now(), text: text, isCompleted: false}
      setTodoList([...todoList, todo])
      setText("")
    }
  }
  const addTodoEnter = (e)=>{
    if (e.key === 'Enter'){
        addTodo()
    }
  }

  return (
    <nav className='flex'>
      <div className="logo cursor-pointer">Task List</div>
      <div className="add">
        <input type="text" value={text} onChange={changeText} onKeyDown={addTodoEnter} name="addTask" id="addTask" placeholder='Add your Task'/>
        <button onClick={addTodo} className='flex justify-center align-middle'>
          <img src="/add_icon.svg" alt="add"/>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
