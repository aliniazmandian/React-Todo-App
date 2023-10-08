import TodoProvider from "./components/Todo-Provider/TodoProvider";
import TodoForm from "./components/Todo-Form/TodoForm";
import style from "./App.module.css";
import TodoList from "./components/Todo-List/TodoList";
import { useEffect, useState } from "react";
import TodoEdit from "./components/Todo-Edit-Modal/TodoEdit";

function App() {
	const [_var, _setVar] = useState({
		y: "",
		opacity: "",
		display: "",
	});

	const modalCloseHandler = () => {
		_setVar({
			y: "-100px",
			opacity: "",
			display: "none",
		});
	};

	const modalOpenHandler = () => {
		_setVar({
			y: "50px",
			opacity: "",
			display: "bloke",
		});
	};

	useEffect(() => {
		document.documentElement.style.setProperty("--display", _var.display);
		document.documentElement.style.setProperty("--y", _var.y);
	}, [_var]);

	return (
		<div className={style.appContainer}>
			<TodoProvider>
				<div className={style.modalBack}></div>

				<div className={style.modal}>
					<TodoEdit closeModal={modalCloseHandler} />
				</div>

				<div>
					<TodoForm />

					<TodoList openModal={modalOpenHandler} />
				</div>
			</TodoProvider>
		</div>
	);
}

export default App;
