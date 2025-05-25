import React, { useState } from 'react'
import { useTodo } from '../Contexts/ToDoContext';

function TodoForm() {
    const [todo,setTodo] = useState(""); // create a local state to save todo string
    const {addTodo} = useTodo();  // accessing addTodo from context

    // a function called when sumit button is press
    // exit if todo is empty else pass todo object 
    const add = (e)=>{
        e.preventDefault();

        if(!todo) return;

        addTodo({todo:todo, completed:false});
        setTodo("");
    }
  

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) =>  setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm