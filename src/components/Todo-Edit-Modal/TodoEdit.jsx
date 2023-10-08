import { useState } from "react";
import {
	useEditedTodo,
	useTodos,
	useTodosAction,
} from "../Todo-Provider/TodoProvider";
import style from "./TodoEdit.module.css";

import { BiCalendarPlus, BiWindowClose } from "react-icons/bi";

const TodoEdit = ({ closeModal }) => {
	const [input, setInput] = useState();
	const todo = useEditedTodo();
	const todos = useTodos();
	const { addTodos } = useTodosAction();

	const changeHandler = (e) => {
		const updatedInput = e.target.value;
		setInput(updatedInput);
	};

	const updateHandler = (id) => {
		if (!input) {
			alert("Please Input Todo");
			return;
		}

		const index = todos.findIndex((todo) => todo.id === id);
		const updatedTodo = { ...todos[index] };
		console.log(updatedTodo);
		updatedTodo.text = input;
		const updatedTodos = [...todos];
		updatedTodos[index] = updatedTodo;
		addTodos(updatedTodos);
	};

	const closeHandler = () => {
		setInput("");
		closeModal()
	};

	return (
		<div className={style.modal}>
			<p>Edit Todo</p>

			<div>
				<textarea
					onChange={(e) => changeHandler(e)}
					value={input}
					className={style.text}
					name=""
					id=""
					cols="30"
					rows="1"
				></textarea>
			</div>

			<div className={style.btnContainer}>
				<button
					className={`  ${style.btn} ${style.btnTrue} `}
					onClick={() => updateHandler(todo.id)}
				>
					<BiCalendarPlus />
				</button>

				<button
					className={`  ${style.btn} ${style.btnClose} `}
					onClick={() =>closeHandler()}
				>
					<BiWindowClose />
				</button>
			</div>
		</div>
	);
};

export default TodoEdit;
