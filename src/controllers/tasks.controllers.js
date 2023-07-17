import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
	try {
		console.log("req.user", req.params);
		const tasks = await Task.find({
			user: req.user.id,
		}).populate("user");
		res.json(tasks);
	} catch (error) {
		return res.status(500).json({ message: "Tasks not found" });
	}
};

export const getTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id).populate("user");

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json(task);
	} catch (error) {
		return res.status(404).json({ message: "Task not found" });
	}
};

export const createTask = async (req, res) => {
	const { title, description, date } = req.body;

	try {
		const newTask = new Task({
			title,
			description,
			date,
			user: req.user.id,
		});
		const taskSaved = await newTask.save();
		res.json(taskSaved);
	} catch (error) {
		return res.status(404).json({ message: "Task not saved" });
	}
};

export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json({ message: "Task deleted" });
	} catch (error) {
		return res.status(404).json({ message: "Task not deleted" });
	}
};

export const updateTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(req.params._id, req.body, {
			new: true,
		});

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.json(task);
	} catch (error) {
		return res.status(404).json({ message: "Task not updated" });
	}
};
