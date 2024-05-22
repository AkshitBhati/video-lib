import React from 'react'
import user from "../../assets/user.png"
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

const Navbar = () => {
    const { currentUser } = useUserContext()
    const navigate = useNavigate()

    const navigateUser = () => {
        if(currentUser){
            navigate("/profile")
        }
        else{
            navigate("/signup")
        }
    }  
  return (
    <div className='navbar__wrapper'>
      <div className="navbar__content">
        <Link to="/" style={{textDecoration:"none"}}><div className='navbar__name'>
            <h2>Video Lib</h2>
        </div></Link>

        <div className='navbar__options'>
            <Link to="/create" style={{color:"gray", textDecoration:"none"}}><p>Create-Caption</p></Link>
            
        </div>

        <div className='navbar__user' onClick={navigateUser}>
            <img src={user} alt="user" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
