import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';



const Login = () => {

  const [auth, setAuth] = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =  useNavigate();
  const locate = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
    console.log(res.data);
    try {
      if (res.data.success === true) {
        toast.success(res?.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(locate.state ||`/`);
      } else {
        toast.error(res?.data.message)
        
      }

    } catch (error) {
      console.log(error)
      toast.success(res?.data.message);
    }
  }


  return (
    <Layout title="Ecommerce App - Log In">
      <div className='p-4 mb-6' style={{ display: 'flex', width: 'auto', height: '100%', padding: '20px', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <div className='login-container col-md-4 col-lg-5' style={{display:'flex',background:'#fefefe',  height: '60vh', justifyContent: 'center', alignItems:'center',boxShadow: '4px 6px 6px 4px gray'}}>
          <form onSubmit={handleSubmit} className='p-4'>
            <h3 className='text-center mb-4' style={{background:'black', fontFamily: "'Poppins', sans-serif", color:'white', textTransform:'uppercase'}} >Log In Here</h3>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input onChange={(e) => setEmail(e.target.value)} required={true} type="email" className="form-control" id="exampleInputEmail1" value={email} aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} required={true} type="password" className="form-control" value={password} id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Keep Logged In</label>
            </div>
            <button type="submit" className="btn btn-success mt-3 mr-2">Log In</button>
            <button onClick={()=>{navigate('/user/forgot-password')}} type="submit" className="btn btn-primary mt-3">Forgot Passowrd?</button>
            <button onClick={()=>{navigate('/user/signup')}} type="submit" className="btn btn-warning mt-3 ml-md-2 ml-lg-2">Sign Up</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login