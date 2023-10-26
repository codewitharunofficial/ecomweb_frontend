import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUp = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name, email, password, phone, address, answer});
    console.log(res.data);
    try {
      
      if(res.data.success === true) {
        toast.success(res.data.message)
        navigate('/user/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Oops! Something Went Wrong');
    }
}


  return (
    <Layout title='Ecommerce App - Sign Up'>
    <div className='p-4 mb-6' style={{display: 'flex', width:'auto', height:'100%', padding:'20px', marginBottom:'20px', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
    <div className='container col-md-4 col-lg-5 p-4 mb-md-2 mb-lg-3' style={{ display: 'flex', background: '#fefefe', alignItems: 'center', justifyContent:'center', boxShadow: '4px 6px 6px 4px gray'}}>
        <form onSubmit={handleSubmit} className='p-1' style={{width:'auto'}} >
          <h3 className='text-center mb-2' style={{background:'black', fontFamily: "'Poppins', sans-serif", color:'white',textTransform: 'uppercase'}}>Register Here</h3>
    <div className="form-group ">
      <label htmlFor="inputEmail4">Email</label>
      <input onChange={(e)=> setEmail(e.target.value)} required={true} type="email" value={email} className="form-control" id="inputEmail4" placeholder="Email" />
    </div>
    <div className="form-group ">
      <label htmlFor="inputPassword4">Password</label>
      <input onChange={(e)=> setPassword(e.target.value)} required={true} value={password} type="password" className="form-control" id="inputPassword4" placeholder="Password" />
    </div>
    <div className="form-group ">
    <label htmlFor="inputAddress">Phone</label>
    <input onChange={(e)=> setPhone(e.target.value)} required={true} value={phone} type="number" className="form-control" id="inputAddress" placeholder="+911234567890" />
  </div>
  
  <div className="form-group ">
    <label htmlFor="inputAddress2">Address</label>
    <input onChange={(e)=> setAddress(e.target.value)} required={true} value={address} type="text" className="form-control" id="phone" placeholder="125/2, Kund-Dahina Road, khol, Rewari, Haryana " />
  </div>
    <div className="form-group ">
      <label htmlFor="inputCity">Name</label>
      <input onChange={(e)=> setName(e.target.value)} required={true} value={name} placeholder='Arun' type="text" className="form-control" id="inputCity" />
    </div>
    <div className="form-group ">
      <label htmlFor="inputQuestion">Answer</label>
      <input onChange={(e)=> setAnswer(e.target.value)} required={true} value={answer} placeholder='Your First School Name?' type="text" className="form-control" id="inputQuestion" />
      <small>The Above Feild is for security</small>
    </div>
  <button type="submit" className="btn btn-primary">Sign Up</button>
</form>

    </div>
    </div>
    </Layout>
  )
}

export default SignUp