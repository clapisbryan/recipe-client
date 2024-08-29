import React, { useState } from 'react';
import { login } from '../../../services/apiUserService/apiUserService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [_, setCookies] = useCookies(["access_token"]);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		const response = await login({ username, password });
		setCookies("access_token", response.token);

		localStorage.setItem("userID", response.userID);
		navigate("/");
	}

	return (
		<>
			<div className="card">
				<div className="card-body">
					<h1 className='text-center'>Login</h1>
					<form onSubmit={handleLogin}>
						<div className="mb-3">
							<label htmlFor="username">Username</label>
							<input type="text" name="username" id="username" className="form-control" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
						</div>
						<div className="mb-3">
							<label htmlFor="password">Password</label>
							<input type="text" name="password" id="password" className="form-control" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
						</div>
						<button className="btn btn-primary" type='submit'>Login</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
