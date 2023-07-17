import { createContext, useContext, useEffect, useState } from "react";
import {
	resgisterRequest,
	loginRequest,
	verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setError] = useState([]);
	const [loading, setLoading] = useState(true);

	const signup = async (user) => {
		try {
			const res = await resgisterRequest(user);
			console.log(res.data);
			setUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setError(error.response.data);
			}
			setError([error.response.data.message]);
		}
	};

	const signin = async (user) => {
		try {
			const res = await loginRequest(user);
			console.log(res.data);
			setIsAuthenticated(true);
			setUser(res.data);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setError(error.response.data);
			}
			setError([error.response.data.message]);
		}
	};

	const logout = () => {
		Cookies.remove("token");
		setIsAuthenticated(false);
		setUser(null);
	};

	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setError([]);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	useEffect(() => {
		async function checkLogion() {
			const cookies = Cookies.get();
			if (!cookies.token) {
				setIsAuthenticated(false);
				setLoading(false);
				return setUser(null);
			}
			try {
				const res = await verifyTokenRequest(cookies.token);
				console.log(res);
				if (!res.data) {
					setIsAuthenticated(false);
					setLoading(false);
					return;
				}

				setIsAuthenticated(true);
				setUser(res.data);
				setLoading(false);
			} catch (error) {
				setIsAuthenticated(false);
				setUser(null);
				setLoading(false);
			}
		}
		checkLogion();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signup,
				signin,
				logout,
				loading,
				user,
				isAuthenticated,
				errors,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
