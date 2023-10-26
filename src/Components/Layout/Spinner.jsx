import {React, useEffect, useState} from 'react'
import Layout from './Layout'
import { useNavigate, useLocation } from 'react-router-dom'


const Spinner = ({path="login"}) => {

    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const locate =useLocation();

    useEffect(() =>{
        const interval = setInterval(() => {
            setCount((preValue) => --preValue);
        }, 1000);
        count===0 && navigate(`${path}`, {
            state: locate.pathname
        })
        return ()=> clearInterval(interval);
    }, [count, navigate, locate, path])

    return (
        <Layout>
            
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '70vh'}}>
                <h3>Please Login to access the Dashboard</h3>
            <h4 className='text-center'>Redirecting....To The Login Page In {count}</h4>
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
            


        </Layout>
    )
}

export default Spinner