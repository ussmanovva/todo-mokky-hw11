import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constans";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import ClipLoader from "react-spinners/ClipLoader";

const TodoWrapper = () => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		setLoading(true);
		try {
			const response = await fetch(BASE_URL);
			if (!response.ok) throw new Error("Что-то пошло не так(");
			const data = await response.json();
			setTodos(data);
		} catch (error) {
			toast.error("Ошибка при загрузке задач");
			console.error("Ошибка:", error);
		} finally {
			setLoading(false);
		}
	};

	const addTask = async (userInput) => {
		if (userInput.trim()) {
			setLoading(true);
			try {
				const response = await fetch(BASE_URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ task: userInput, completed: false }),
				});
				if (!response.ok) throw new Error("Что-то пошло не так(");
				const newTask = await response.json();
				setTodos([...todos, newTask]);
				toast.success("Задача успешно добавлена!");
			} catch (error) {
				toast.error("Ошибка при добавлении задачи");
				console.error("Ошибка:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	const removeTask = async (id) => {
		setLoading(true); // Включаем спиннер
		try {
			await fetch(`${BASE_URL}/${id}`, {
				method: "DELETE",
			});
			setTodos(todos.filter((todo) => todo.id !== id));
			toast.success("Задача успешно удалена!");
		} catch (error) {
			toast.error("Ошибка при удалении задачи");
			console.error("Ошибка:", error);
		} finally {
			setLoading(false);
		}
	};

	const toggleTask = async (id) => {
		const taskToUpdate = todos.find((todo) => todo.id === id);
		if (taskToUpdate) {
			setLoading(true);
			try {
				const response = await fetch(`${BASE_URL}/${id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ completed: !taskToUpdate.completed }),
				});
				if (!response.ok) throw new Error("Что-то пошло не так(");
				const updatedTask = await response.json();
				setTodos(todos.map((todo) => (todo.id === id ? updatedTask : todo)));
				toast.success("Задача успешно обновлена!");
			} catch (error) {
				toast.error("Ошибка при обновлении задачи");
				console.error("Ошибка:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="todo-app">
			<h1>Todo-List</h1>
			<TodoForm addTask={addTask} />
			<hr className="seperator" />
			{loading ? (
				<div className="spinner-container">
					<ClipLoader color="#117aff" loading={loading} size={40} />
				</div>
			) : (
				<TodoList
					todos={todos}
					removeTask={removeTask}
					toggleTask={toggleTask}
				/>
			)}
		</div>
	);
};

export default TodoWrapper;
