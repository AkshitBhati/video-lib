import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config';
import "./Profile.css"
import { useUserContext } from '../../context/UserContext';

const Profile = ({ name }) => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    //current user
    const {currentUser} = useUserContext()

    const navigate = useNavigate();

    const signoutHandler = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                setErr('Logout failed');
            });
    };

    return (
        <div className='userCard'>
            <img
                src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                alt='User'
                className='userCard__image'
            />
            <h3 className='userCard__name'>{currentUser.displayName}</h3>
            <button className='userCard__btn' onClick={signoutHandler} disabled={loading}>
                {loading ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
};

export default Profile;
