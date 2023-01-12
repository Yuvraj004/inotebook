import React,{useEffect,useCallback} from 'react'
import {useNavigate} from 'react-router-dom';

function Logout() {
    let navigate =useNavigate();
    const logResult = useCallback(() => {
        return 2 + 2;
      }, []);
    useEffect(() => {
        localStorage.removeItem('token');
        navigate('/login');
    }, [logResult, navigate]);
    return (
    <div>Logout</div>
    )
}

export default Logout