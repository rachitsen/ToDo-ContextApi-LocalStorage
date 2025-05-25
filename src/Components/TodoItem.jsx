import React, {useState} from 'react'
import { useTodo } from '../Contexts/ToDoContext';

function TodoItem({ todo }) {  // here we are detructuring props object to directly insert object to todo var

   // bring function from context
   const {updateTodo, deleteTodo, toggleComplete} = useTodo();
    // creating a state var for the edited text of that todo
   const [todoMsg, setTodoMsg] = useState(todo.todo)
   // creating a state var for the todo item that telling do we need to make read only input field or not
   const [isTodoEditable, setIsTodoEditable] = useState(false)


   const editTodo = () =>{
        updateTodo(todo.id,{...todo,todo: todoMsg});
        setIsTodoEditable(false);
   }
   // this function is getting call when we click on check box, it cahnge the complete state of that todo item
   const toggleCompleted = () =>{
    console.log("HI")
        toggleComplete(todo.id);
   }

  return (
    // its is a container where if todo is conpleted where are changing that item colour dynamicaly
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black 
            ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg 
        ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} 
        ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
        {/* this functin take care of edit mode, if item iseditable state is true, it shows input box, make readonly:true, and than onClick it call editTod0, if iseditable is false, than it make input box editable make readOnly false*/}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      {/* Delete Todo Button */}
      {/* using this button we are directly deleting todo */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;