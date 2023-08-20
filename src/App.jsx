import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

import {FaPaperPlane, FaPen, FaTrash} from "react-icons/fa";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  
  function handleEditInputChange(e) {
    
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  
  function handleUpdateTodo(id, updatedTodo) {
    
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    
    setIsEditing(false);
   
    setTodos(updatedItem);
  }

  
  function handleEditClick(todo) {
    
    setIsEditing(true);
    
    setCurrentTodo({ ...todo });
  }

  return (
    <div className="todolist">
      
      {isEditing ? (
        
        <form onSubmit={handleEditFormSubmit}>
          
          <h2 >Edit Todo</h2>
          
          <label htmlFor="editTodo" className="me-2"><h5>Edit Item: </h5></label>
          
          <input
          className="mb-2 myinput"
            name="editTodo"
            type="text"
            placeholder="Edit your item..."
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          
          <button className="button icon float-end" type="submit">Update</button>
          
          <button className="button icon float-end" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        
        <form onSubmit={handleFormSubmit}>
          
          <h2 className="p-4 ">Todo Lists</h2>
         
          <label htmlFor="todo" className="float-start">Add to-do item: </label>
          
          <input
          className="ms-2 myinput"
          
            name="todo"
            type="text"
            placeholder="Enter your list here.."
            value={todo}
            onChange={handleInputChange}
          />
          
          <button type="submit" className="button icon"><FaPaperPlane />&nbsp;Submit</button>
        </form>
      )}

      <ul className="items  ">
        {todos.map((todo) => (
          <li className="" key={todo.id}>
            {todo.text}
           
            <button className="button  ms-5  me-2 icon" onClick={() => handleEditClick(todo)}> <FaPen/>&nbsp;Edit</button>
            <button className="button icon" onClick={() => handleDeleteClick(todo.id)}><FaTrash/>&nbsp;Delete</button>
            <input className="form-check-input ms-5 " type="checkbox" value="" />
            <label className="form-check-label ms-2" htmlFor="flexCheckDefault">
           completed
             </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;