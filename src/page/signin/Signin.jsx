import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { auth } from "../../config";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function for password visibility
  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  // Function for handlechange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //for navigation

  const navigate = useNavigate()

  // Function for signin
  const signin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); 
      
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/")
      setLoading(false); 
    } catch (err) {
      setLoading(false); 
      setError(err.message); 
    }
  };

  return (
    <div className="signup__wrapper">
      <form className="signup__form">
        <h1>Sign In</h1>

        <div className="form__el">
          <label>Email</label>
          <input
            type="text"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div className="form__el">
          <label>Password</label>
          <div className="form__el-password">
            <input
              type={hidePassword ? "text" : "password"}
              id="password"
              onChange={handleChange}
              value={formData.password}
            />
            {hidePassword ? (
              <FaRegEye cursor={"pointer"} onClick={showPassword} />
            ) : (
              <FaRegEyeSlash cursor={"pointer"} onClick={showPassword} />
            )}
          </div>
        </div>

       
 <p style={{ fontSize: "14px" }}>
          New User?{" "}
          <Link
            to="/signup"
            style={{
              textDecoration: "underline",
              color: "rgb(7, 135, 221)",
              cursor: "pointer",
            }}
          >
            Sign Up
          </Link>
        </p>
        <div className="form__el">
          {/* Show loading spinner if loading is true, otherwise show signin button */}
          <button onClick={signin}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                Loading <ClipLoader size={15} color="#fff" />
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

         {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
