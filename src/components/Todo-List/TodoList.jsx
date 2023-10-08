import {
	useEditTodosAction,
	useTodos,
	useTodosAction,
} from "../Todo-Provider/TodoProvider";
import style from "./TodoList.module.css";

import {
	BiCalendarEdit,
	BiCalendarAlt,
	BiCalendarCheck,
	BiCalendarX,
} from "react-icons/bi";

const TodoList = ({ openModal }) => {
	const todos = useTodos();
	const { addTodos, deletTodo } = useTodosAction();
	const { addEditTodo } = useEditTodosAction();

	const compeletHandler = (id) => {
		const index = todos.findIndex((todo) => todo.id === id);

		const updatedTodo = { ...todos[index] };
		updatedTodo.isCompeleted = !updatedTodo.isCompeleted;

		const updatedTodos = [...todos];
		updatedTodos[index] = updatedTodo;

		addTodos(updatedTodos);
	};

	const editHandler = (id) => {
		const index = todos.findIndex((todo) => todo.id === id);
		const forEditTodo = { ...todos[index] };
		addEditTodo(forEditTodo);

		openModal();
	};

	const deletHandler = (id) => {
		const updatedTodo = todos.filter((todo) => todo.id !== id);
		deletTodo(updatedTodo);
	};

	const renderTodos = () => {

		if (!todos.length) {
			return (
				<div className={style.container}>
				<h3>Empty Todos List</h3>	
				</div>
			);
		}

		return (
			<div className={style.container}>
				{todos.map((t) => {
					return (
						<div
							key={t.id}
							className={`${style.todoContainer} ${
								t.isCompeleted === true && style.TodoCompleted
							}`}
						>
							<div className={style.text}>
								<p>{t.text}</p>
							</div>

							<div className={style.btnContainer}>
								<button
									className={`${style.btn} 
								${t.isCompeleted === true && style.btnTrue}  `}
									onClick={() => compeletHandler(t.id)}
								>
									{t.isCompeleted ? <BiCalendarCheck /> : <BiCalendarAlt />}
								</button>

								<button className={style.btn} onClick={() => editHandler(t.id)}>
									<BiCalendarEdit />
								</button>

								<button
									onClick={() => deletHandler(t.id)}
									className={`${style.btn}
								${style.btnClose}  `}
								>
									<BiCalendarX />
								</button>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	return <div>{ renderTodos()}</div>
	
};



export default TodoList;
