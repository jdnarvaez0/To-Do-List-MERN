import axios from "axios";

const instance = axios.create({
	baseURL: "https://todo-list-seven-eta-99.vercel.app/api/",
	withCredentials: true,
});

export default instance;
