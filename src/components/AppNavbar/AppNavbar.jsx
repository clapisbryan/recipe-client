import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'

const AppNavbar = () => {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const handleLogout = () => {
		setCookies("access_token", "");
		localStorage.removeItem("userID");
		navigate("/auth");
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">Recipes</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" aria-current="page" to="/create-recipe">Create Recipe</Link>
							</li>
							{!cookies.access_token ?
								<li className="nav-item">
									<Link className="nav-link" aria-current="page" to="/auth">Login/Register</Link>
								</li> :
								<>
									<li className="nav-item">
										<Link className="nav-link" aria-current="page" to="/saved-recipe">Saved Recipe</Link>
									</li>
									<button className="btn btn-danger btn-sm my-1" onClick={handleLogout}>Logout</button>
								</>
							}
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}

export default AppNavbar
