import { useState,useEffect } from 'react'
import './App.css'
import { TodoProvider } from './Contexts/ToDoContext';
import {TodoForm, TodoItem} from './Components'

function App() {
  
  // creating a state variable which store arry od todo object.
  const [todos,setTodos] = useState([]);

  // this are the declaration of functions which we define in Context
  // here are passing todo object to this function
  const addTodo = (todo) => // here are passing todo object to this function
  {
        setTodos((prev)=> [{id:Date.now(), ...todo}, ...prev]  ) // here we are addig new todo object tp previous array, in which we spreading object key:value using ...
  }
  // this is function where we are passing id of a todo object
  // here we are filtering prev state(that is previous array) and filtering all those lement whose id is not match, it is creating new array and returning
  const deleteTodo = (id) =>{
     setTodos((prev)=> prev.filter((todo) => todo.id !== id))
  }
  // this function is use to update old todo, by getting to id, todo
  // we are mapping and getting each todo element, futer checking id of todo, if it matches add newTodo to the array creating by map function. 
  const updateTodo = (id,todo) =>{
      setTodos((prev)=>  prev.map((eachTodo)=>(eachTodo.id === id ? todo: eachTodo)))
  }
// this function is use to update old todo, by toggeling complete state by id
// we are mapping and getting each todo element, futer checking id of todo, if it matches add newTodo to the array creating by map function. 
   const toggleComplete = (id) =>{
       setTodos((prev)=>  prev.map((eachTodo)=>(eachTodo.id === id ? {...eachTodo, completed:!eachTodo.completed}: eachTodo))) 
  }

// when this app render this useEffect or this function run 
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos")); // through this we are retriving string from local and convert it to JSON here (array)
  // ok so suppose we are loading this component or our apllication so we are assuring that the todo array which we receive from localstorage is updated to our state variable 
  if(todos && todos.length > 0){
    setTodos(todos);
  }
}, [])
// another useEffect render when there is any change in todos(state variable), we are updating it into local storage again
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos])




  return (
    // adding a provide or wrapper component that providing context variable access to child component
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>

    <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
           </h1>
            <div className="mb-4">{/* Todo form goes here */}
               <TodoForm/>    {/*adding todo form which take input to add new task */}
            </div>
             <div className="flex flex-wrap gap-y-3">
      {/*Loop and Add TodoItem here */}
              {
                todos.map( (todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem  todo={todo}/>
                </div>
              ) )
              }
            </div>
          </div>
    </div>

    </TodoProvider>
  )
}

export default App
