import React, { useState } from "react";
import "./Create.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";
import { ClipLoader } from "react-spinners";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //current user
  const { currentUser } = useUserContext()
  

  // Function for handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //navigation
  const navigate = useNavigate()

  // Function for creating the captions
  const createCaptionsWithTimestamps = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.timestamp > 120) {
      setError("The timestamp cannot exceed 120 seconds.");
      setLoading(false);
      return;
    }

    if (!formData.url || !formData.caption || !formData.timestamp) {
      setError("Fields cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        url: formData.url,
        caption: formData.caption,
        timestamp: formData.timestamp,
        user : currentUser.uid
      };

      await addDoc(collection(db, "caption"), userData);
      navigate("/")
      setFormData({}); 
      setLoading(false);
      setError(""); 
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="caption__wrapper">
      <h1>Create Caption</h1>

      <form className="caption__form" onSubmit={createCaptionsWithTimestamps}>
        <div className="form__feilds">
          <label>Enter Video URL</label>
          <input
            type="text"
            placeholder="Video URL"
            id="url"
            onChange={handleChange}
            value={formData.url }
          />
        </div>

        <div className="form__feilds">
          <label>Enter Caption</label>
          <input
            type="text"
            placeholder="Enter Caption"
            id="caption"
            onChange={handleChange}
            value={formData.caption}
          />
        </div>

        <div className="form__feilds">
          <label>Timestamp in seconds <span style={{fontSize:"12px", color:"gray"}}>(max 120)</span></label>
          <input
            type="number"
            placeholder="Enter Timestamp"
            id="timestamp"
            onChange={handleChange}
            value={formData.timestamp }
          />
        </div>

        <div className="form__feilds">
          <button type="submit" disabled={loading}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                Loading <ClipLoader size={15} color="#fff" />
              </span>
            ) : (
              "Create"
            )}
          </button>
        </div>

        {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Create;
