import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();
const TodoEditContex = createContext();
const TodoEditContexDispatcher = createContext();
const TodoContextDispatcher = createContext();

const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [editTodo, setEditTodo] = useState({});

	

    useEffect(() => {
        const setFirstTodos=JSON.parse(localStorage.getItem("todos"))||[]
        setTodos(setFirstTodos);
    }, []);

	return (
		<TodoContext.Provider value={todos}>
			<TodoEditContex.Provider value={editTodo}>
				<TodoEditContexDispatcher.Provider value={setEditTodo}>
					<TodoContextDispatcher.Provider value={setTodos}>
						{children}
					</TodoContextDispatcher.Provider>
				</TodoEditContexDispatcher.Provider>
			</TodoEditContex.Provider>
		</TodoContext.Provider>
	);
};

export default TodoProvider;

export const useTodos = () => useContext(TodoContext);
export const useEditedTodo = () => useContext(TodoEditContex);

export const useEditTodosAction = () => {
    const setTodo = useContext(TodoEditContexDispatcher)
    
    const addEditTodo = (forEditTodo) => {
        setTodo(forEditTodo)
    }

    return {addEditTodo}
}
export const useTodosAction = () => {
	const setTodos = useContext(TodoContextDispatcher);

	const addTodos = (updatedTodo) => {
        setTodos(updatedTodo);
        localStorage.setItem("todos",JSON.stringify(updatedTodo))
	};

	const deletTodo = (updatedTodo) => {
		setTodos(updatedTodo);
        localStorage.setItem("todos",JSON.stringify(updatedTodo))
	}

	return { addTodos,deletTodo };
};
