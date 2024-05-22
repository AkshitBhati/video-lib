import React, { useEffect, useState } from 'react';
import note from "../../assets/note.svg";
import load from "../../assets/load.webp";
import "./Home.css";
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config';
import Card from '../../component/card/Card';
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [renderedData, setRenderedData] = useState([]);
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const checkUserAuth = () => {
    if(currentUser){
      navigate("/create");
    } else {
      navigate("/signin");
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      if(currentUser && currentUser.uid) {
        const q = query(collection(db, "caption"), where("user", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      }
      setLoading(false);
    } catch(err) {
      setError('Error fetching data. Please try again later.');
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [currentUser]);

  useEffect(() => {
    // Function to render each card after the given timestamps with a delay
    const renderWithDelay = async () => {
      const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
      let prevTimestamp = 0;
      for (let i = 0; i < sortedData.length; i++) {
        const currentTimestamp = sortedData[i].timestamp;
        const delay = currentTimestamp - prevTimestamp;
        await new Promise(resolve => setTimeout(resolve, delay * 1000)); // Delay by the specified seconds
        setRenderedData(prevData => [...prevData, sortedData[i]]);
        prevTimestamp = currentTimestamp;
      }
    };

    if(data.length > 0) {
      renderWithDelay();
    }
  }, [data]); // Triggered when data changes

  return (
    <div className='home__wrapper'>
      {error ? (
        <div className="error">{error}</div>
      ) : renderedData.length > 0 ? (
          <div className='card'>
            {renderedData.map((item, index) => (
              <Card key={index} url={item.url} caption={item.caption} timestamp={item.timestamp} />
            ))}
          </div>
        ) : (
          <div className="home">
            <img src={note} alt="Image" />
            <p>Get started by creating captions</p>
            <button onClick={checkUserAuth}>Create Caption</button>
          </div>
        )
      }
    </div>
  );
};

export default Home;
