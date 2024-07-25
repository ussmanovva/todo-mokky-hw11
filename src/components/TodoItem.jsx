import { MdDelete } from "react-icons/md";

const TodoItem = ({ todo, toggleTask, removeTask }) => {
	return (
		<div className={todo.completed ? "todo-row complete" : "todo-row"}>
			<div className="todo-row-main" onClick={() => toggleTask(todo.id)}>
				{todo.task}
			</div>
			<div className="iconsContainer">
				<MdDelete onClick={() => removeTask(todo.id)} />
			</div>
		</div>
	);
};

export default TodoItem;
