import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { useTodos, useTodosAction } from "../Todo-Provider/TodoProvider";
import style from "./TodoForm.module.css"

const TodoForm = () => {
	const [input, setInput] = useState("");
	const { addTodos } = useTodosAction();
	const todos = useTodos();

	const changeHandler = (e) => {
		setInput(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!input) {
			alert("Please Enter Todo");
			return;
		}

		const newTodo = [...todos,{
			id: new Date().getTime(),
			text: input,
			isCompeleted: false,
		}];

		localStorage.setItem("todos", JSON.stringify(newTodo));
        addTodos(newTodo);
        setInput("")
        
	};

	return (
		<form className={style.form} onSubmit={(e) => submitHandler(e)}>
			<p>Input Todo</p>
            <input  className={style.input} type="text" value={input} onChange={(e) => changeHandler(e)} />
			<button  className={style.btn} type="submit">
				{" "}
				submit
			</button>
		</form>
	);
};

export default TodoForm;
