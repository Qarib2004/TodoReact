import React, { useReducer, useState } from 'react';


const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'EDIT_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  const handleEditStart = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  };

  const handleEditSubmit = () => {
    if (editText.trim()) {
      dispatch({
        type: 'EDIT_TODO',
        payload: { id: editingId, text:editText },
      });
      setEditingId(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>

     
      <form onSubmit={handleAddTodo} className="flex mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>

    
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center bg-gray-100 p-3 rounded-md">
            {editingId === todo.id ? (
              
              <div className="flex flex-grow items-center">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow p-1 mr-2 border rounded"
                />
                <button
                  onClick={handleEditSubmit}
                  className="text-green-500 mr-2"
                >
                  yes
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-red-500"
                >
                  no
                </button>
              </div>
            ) : (
             
              <>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  className={`mr-3 ${todo.completed ? 'text-green-500' : 'text-gray-300'}`}
                >
                  yes
                </button>
                <span
                  className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleEditStart(todo)}
                  className="text-blue-500 mr-2"
                >
                  redact
                </button>
                <button
                  onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                  className="text-red-500"
                >
                  delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      
      {todos.length > 0 && (
        <div className="mt-4 text-center text-gray-600">
          {todos.filter((todo) => !todo.completed).length} items left
        </div>
      )}
    </div>
  );
};

export default TodoApp;
