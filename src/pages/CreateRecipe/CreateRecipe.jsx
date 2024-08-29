import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../services/apiRecipeService/apiRecipeService';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';


const CreateRecipe = () => {
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipe({
      ...recipe,
      [name]: value
    })
  }
  const handleIngredientsChange = (e, idx) => {
    const { value } = e.target;

    const ingredients = recipe.ingredients;
    ingredients[idx] = value;

    setRecipe({
      ...recipe,
      ingredients
    })
  }

  const addIngredients = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""]
    })
  }

  console.log(recipe);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await createRecipe(recipe, cookies);
    console.log("Recipe Created", response);
    navigate("/");
  }

  return (
    <>
      <div className="container my-5">
        {cookies.access_token ?
          <>
            <h2>Create Recipe</h2>
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label className='form-label'>Name</label>
                <input type="text" className='form-control' name="name" id="name" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className='form-label w-100'>Ingredients</label>
                {recipe.ingredients.map((ingredients, index) => {
                  return <input type="text" name="ingredients" id="ingredients" className='form-control mb-2' key={index} value={ingredients} onChange={(e) => handleIngredientsChange(e, index)} />
                })}
                <button className="btn btn-primary btn-sm" type='button' onClick={addIngredients}>Add Ingredients</button>
              </div>
              <div className="mb-3">
                <label className='form-label'>Instruction</label>
                <textarea name="instruction" id="instruction" className='form-control' onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className='form-label'>Image Url</label>
                <input type="text" className='form-control' name="imageUrl" id="imageUrl" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className='form-label'>Cooking Time</label>
                <input type="text" className='form-control' name="cookingTime" id="cookingTime" onChange={handleChange} />
              </div>

              <button className="btn btn-primary" type='submit'>Create Recipe</button>
            </form>
          </> : <>
            <h5>You Need to Login/Register to Create Recipe</h5></>
        }
      </div>
    </>
  )
}

export default CreateRecipe
