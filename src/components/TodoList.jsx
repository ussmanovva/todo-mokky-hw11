import TodoItem from "./TodoItem";

const TodoList = ({ todos, removeTask, toggleTask }) => {
	return (
		<div>
			{todos.map((todo) => (
				<TodoItem
					todo={todo}
					key={todo.id}
					removeTask={removeTask}
					toggleTask={toggleTask}
				/>
			))}
		</div>
	);
};

export default TodoList;
