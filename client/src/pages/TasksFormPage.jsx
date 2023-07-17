import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContex";
import { useNavigate, useParams } from "react-router-dom";

const TasksFormPage = () => {
	const { register, handleSubmit, setValue } = useForm();
	const { createTask, getTask } = useTasks();
	const Navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		async function loadTask() {
			if (params.id) {
				const task = await getTask(params.id);
				setValue("title", task.title);
				setValue("description", task.description);
			}
		}
		loadTask();
	}, []);

	const onSubmit = handleSubmit((data) => {
		createTask(data);
		Navigate("/tasks");
	});

	return (
		<div className="bg-zinc-500 max-w-md w-full p-10 rounded-md">
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Title"
					{...register("title")}
					autoFocus
				/>

				<textarea
					id="message"
					rows="4"
					className="block p-2.5 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Description"
					{...register("description")}
				></textarea>

				<button>Save</button>
			</form>
		</div>
	);
};

export default TasksFormPage;
