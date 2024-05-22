import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./Signup.css"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Function for password visibility
    const showPassword = () => { 
        setHidePassword(!hidePassword);
    }

    // Function for handle change
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
    }

    //for navigating

    const navigate = useNavigate()


    // Creating user and authenticating it
    const createUser = async (e) => {
        e.preventDefault();
        try {
            if (formData.username === "" || formData.email === "" || formData.password === "") {
                setError("Please fill in all fields.");
                return; 
            }
    
            setLoading(true);
            const userData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                
            };
    
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    
            // Set display name to username
            await updateProfile(userCredential.user, {
                displayName: formData.username
            });
    
            // Add user data to Firestore
            await addDoc(collection(db, "users"), userData);
            navigate("/signin")
            // Reset form data and loading state
            setFormData({});
            setLoading(false);
            setError(""); 
        } catch (err) {
            setLoading(false);
            if (err.code === "auth/invalid-email") {
                setError("Invalid email address. Please provide a valid email.");
            } else {
                setError(err.message);
            }
        }
    }

    return (
        <div className='signup__wrapper'>
            <form className="signup__form">
                <h1>Sign Up</h1>

                <div className='form__el'>
                    <label>Username</label>
                    <input 
                        type="text" 
                        id='username' 
                        onChange={handleChange}
                        value={formData.username || ''}
                    />
                </div>

                <div className='form__el'>
                    <label>Email</label>
                    <input 
                        type="text" 
                        id='email'
                        onChange={handleChange}
                        value={formData.email || ''}
                    />
                </div>

                <div className='form__el'>
                    <label>Password</label>
                    <div className='form__el-password'>
                        <input 
                            type={hidePassword ? "text" : "password"} 
                            id='password'
                            onChange={handleChange}
                            value={formData.password || ''}
                        />
                        {hidePassword ? 
                            <FaRegEye cursor={"pointer"} onClick={showPassword}/> : 
                            <FaRegEyeSlash cursor={"pointer"} onClick={showPassword}/>
                        }
                    </div>
                </div>

                <p style={{ fontSize: "14px" }}>Already a user? <Link to={"/signin"}> <span style={{ textDecoration: "underline", color: "rgb(7, 135, 221)", cursor: "pointer" }}>Sign in </span> </Link></p>

                <div className='form__el'>
                    <button onClick={createUser}>
                        {loading ? (
                            <>
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                    Loading <ClipLoader size={15} color="#fff" />
                                </span>
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </div>

                {error && <p style={{color:"red", fontSize:"15px"}}>{error}</p>}    
            </form>
        </div>
    );
}

export default Signup;
