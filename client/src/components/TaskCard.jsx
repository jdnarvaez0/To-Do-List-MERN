import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContex";

const TaskCard = ({ task }) => {
	const { deleteTask } = useTasks();

	return (
		<div className="bg-zinc-800 max-w-full p-10 rounded-md ">
			<h1 className="text-2xl font-bold">{task.title}</h1>
			<div>
				<button
					onClick={() => {
						deleteTask(task._id);
					}}
				>
					Delete
				</button>
				<Link to={`/tasks/${task._id}`}>Edit</Link>
			</div>
			<p className="text-slate-300">{task.description}</p>
			{/* <p>{task.date.toLocalString()}</p> */}
		</div>
	);
};

export default TaskCard;
