import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import CreateRecipe from './pages/CreateRecipe/CreateRecipe'
import SavedRecipe from './pages/SavedRecipe/SavedRecipe'
import AppNavbar from './components/AppNavbar/AppNavbar'

const App = () => {
  return (
    <>
      <Router>
        <AppNavbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-recipe' element={<CreateRecipe />} />
          <Route path='/saved-recipe' element={<SavedRecipe />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
