import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './page/signup/Signup'
import { useUserContext } from "./context/UserContext"
import Signin from './page/signin/Signin'
import Navbar from './component/navbar/Navbar'
import Profile from "./page/profile/Profile"
import Create from './page/create/Create'
import Queue from './page/queue/Queue'
import Home from './page/home/Home'
import Card from './component/card/Card'

const App = () => {

  
  return (
    <>
    <Navbar />
    <Routes>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/signin' element={<Signin />}/>
    <Route path='/profile' element={<Profile />}/>
    <Route path='/create' element={<Create />}/>
    <Route path='/queue' element={<Queue />}/>
    <Route path='/' element={<Home />}/>
    <Route path='/card' element={<Card />}/>
    
     </Routes>
    </>
  )
}

export default App
