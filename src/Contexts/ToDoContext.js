import { createContext, useContext } from "react";

// here using createContext we are creating a context "TodoContext"
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "new todo",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, todo) => {},
  toggleComplete: (id) => {},
});

// here we are creating a custom hook where we are returning useContext for the Todo to extract value
export const useTodo = () => {
  return useContext(TodoContext);
};

// here we are exporting a context provider which will wrap other component and create a scope for component to avail values
export const TodoProvider = TodoContext.Provider;
