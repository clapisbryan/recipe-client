import React from 'react'
import Login from './Login/Login'
import Register from './Register/Register'

const Auth = () => {
	return (
		<>
			<div className="container my-5 py-5">
				<div className="row g-5">
					<div className="col-12 col-md-6">
						<Login />
					</div>
					<div className="col-12 col-md-6">
						<Register />
					</div>
				</div>
			</div>
		</>
	)
}

export default Auth
