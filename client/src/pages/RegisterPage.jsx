import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signup, isAuthenticated, errors: registerErrors } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/tasks");
		}
	}, [isAuthenticated]);

	const onSubmit = handleSubmit(async (values) => {
		signup(values);
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
			<form onSubmit={onSubmit}>
				<div className="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
					<div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
						{registerErrors.map((error, i) => (
							<div key={i} className=" bg-red-500 p-2 text-white ">
								{error}
							</div>
						))}

						<div>
							<h1 className="text-xl font-semibold text-gray-800 dark:text-white">
								Register
							</h1>
							<p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
								Already have an account ?{" "}
								<Link
									to="/login"
									className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400"
								>
									Sign in
								</Link>{" "}
							</p>
						</div>

						<div className="mt-8 space-y-8">
							<div className="space-y-6">
								<input
									className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
									placeholder="Your Username"
									type="text"
									{...register("username", { required: true })}
								/>

								{errors.username && (
									<p className="text-red-500 text-xs">Username is required</p>
								)}

								<input
									className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
									placeholder="Your Email"
									type="email"
									{...register("email", { required: true })}
								/>

								{errors.email && (
									<p className="text-red-500 text-xs mt-0">Email is required</p>
								)}

								<input
									className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
									placeholder="Your Password"
									type="password"
									{...register("password", { required: true })}
								/>
							</div>

							{errors.password && (
								<p className="text-red-500 text-xs">Password is required</p>
							)}

							<button
								className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
								type="submit"
							>
								Register
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterPage;
