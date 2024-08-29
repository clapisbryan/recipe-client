import React, { useEffect, useState } from 'react'
import { getRecipe, getRecipeByUserID, putRecipeById } from '../../services/apiRecipeService/apiRecipeService';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const Home = () => {

	const [cookies, _] = useCookies(["access_token"]);
	const userID = useGetUserID();
	const [recipe, setRecipe] = useState([]);
	const [savedRecipe, setSavedRecipe] = useState([]);

	useEffect(() => {
		fetchRecipe();
		if (cookies.access_token) fetchSavedRecipe();
	}, [])

	const fetchRecipe = async () => {
		const response = await getRecipe();
		setRecipe(response);
	}

	const fetchSavedRecipe = async () => {
		const response = await getRecipeByUserID(userID, cookies);
		console.log(response);
	}

	const saveRecipe = async (recipeID) => {
		if (savedRecipe.includes(recipeID)) {
			console.log("Already saved")
		} else {
			const response = await putRecipeById({ recipeID, userID, cookies });
			setSavedRecipe(response.savedRecipe);
		}
	}
	const isRecipeSaved = (id) => savedRecipe.includes(id);
	return (
		<>
			<div className="container">
				<h1 className='text-center'>Recipes</h1>
				<div className="row">
					{recipe.map(recipe => {
						return (
							<div className="col-12 col-md-4 mb-3" key={recipe._id}>
								<div className="card">
									<div className="card-body">
										<h2>{recipe.name}</h2>
										{cookies.access_token &&
											<button
												className={`btn btn-sm ${isRecipeSaved(recipe._id) ? "btn-secondary" : "btn-primary"}`}
												onClick={() => saveRecipe(recipe._id)}
												disabled={isRecipeSaved(recipe._id)}
											>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
										}
										<div className="instruction">
											<p>{recipe.instruction}</p>
										</div>
										<div className='text-center'>
											<img src={recipe.imageUrl} alt={recipe.name} className='img-fluid mx-auto w-100' style={{ height: "160px", objectFit: "cover" }} />
										</div>
										<p>Cooking Time: {recipe.cookingTime}</p>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default Home
