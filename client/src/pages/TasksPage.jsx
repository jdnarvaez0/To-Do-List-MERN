import { useEffect } from "react";
import { useTasks } from "../context/TasksContex";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
	const { getTasks, tasks } = useTasks();

	useEffect(() => {
		getTasks();
	}, []);

	if (!tasks) return <p>No tienes tareas</p>;

	return (
		<div>
			{tasks.map((task) => (
				<TaskCard key={task._id} task={task} />
			))}
		</div>
	);
};

export default TasksPage;
