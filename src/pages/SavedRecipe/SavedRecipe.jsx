import React, { useEffect, useState } from 'react'
import { getRecipe, getRecipeByUserID, getSavedRecipeByUserId, putRecipeById } from '../../services/apiRecipeService/apiRecipeService';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const SavedRecipe = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const [savedRecipe, setSavedRecipe] = useState([]);

  useEffect(() => {
    fetchSavedRecipe();
  }, [])

  const fetchSavedRecipe = async () => {
    const response = await getSavedRecipeByUserId(userID, cookies);
    setSavedRecipe(response.savedRecipes);
  }

  return (
    <>
      <div className="container">
        <h1>Saved Recipes</h1>
        <div className="row">
          {savedRecipe.map(recipe => {
            return (
              <div className="col-12 col-md-4 mb-3" key={recipe._id}>
                <div className="card">
                  <div className="card-body">
                    <h2>{recipe.name}</h2>
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

export default SavedRecipe
