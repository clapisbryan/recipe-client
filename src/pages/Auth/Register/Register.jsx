import React, { useState } from 'react'
import { register } from '../../../services/apiUserService/apiUserService';
import Swal from 'sweetalert2'

const Register = () => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		const response = await register({ username, password });

		console.log(response);
		if (response.message == "User already exist!") {
			Swal.fire({
				title: "Registration",
				text: response.message,
				icon: "error"
			});
			setUsername("");
			setPassword("");
		} else {
			Swal.fire({
				title: "Registration",
				text: response.message,
				icon: "success"
			});
			setUsername("");
			setPassword("");
		}

	}

	return (
		<>
			<div className="card">
				<div className="card-body">
					<h1 className='text-center'>Register</h1>
					<form onSubmit={handleRegisterSubmit}>
						<div className="mb-3">
							<label htmlFor="username">Username</label>
							<input type="text" name="username" id="username" className="form-control" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
						</div>
						<div className="mb-3">
							<label htmlFor="password">Password</label>
							<input type="password" name="password" id="password" className="form-control" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
						</div>
						<button className="btn btn-primary" type='submit'>Register</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Register
