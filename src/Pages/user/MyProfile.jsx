import {React, useEffect, useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const MyProfile = () => {


 const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({});
  // const [answer, setAnswer] = useState('');
  const [auth, setAuth] = useAuth();
  // const navigate = useNavigate();


  useEffect(() => {
    const {name, email, phone, address} = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user])


  const handleSubmit = async (e) => {

        e.preventDefault();

        try {
          
          const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`, {name, email, phone, address, password});
          if(data?.success) {
            setAuth({...auth, user: data?.updatedUser});
            let ls = localStorage.getItem("auth")
            ls= JSON.parse(ls);
            ls.user = data.updatedUser
            localStorage.setItem("auth", JSON.stringify(ls))
            toast.success("Profile updated Successfully")
          } else {
            toast.error(data?.message);
          }

        } catch (error) {
          console.log(error)
        }
  }



  return (

   <Layout title='Ecommerce App - My Account'> 
   <div className="container-fluid m-3 p-3">
    <div className="row">
      <div className="col-md-3"
       style={{marginLeft: '-1em'}}
       >
        <UserMenu/>
      </div>
      <div className="col-md-9" style={{marginLeft: '-1em'}}>
      
      <div className='p-4 mb-6' style={{display: 'flex', width:'100%', height:'100%', padding:'20px', marginBottom:'20px', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
    <div className='container col-md-4 col-lg-5 p-4 mb-md-2 mb-lg-3' style={{ display: 'flex', background: '#fefefe', alignItems: 'center', justifyContent:'center', boxShadow: '4px 6px 6px 4px gray'}}>
        <form 
        onSubmit={handleSubmit}
         className='p-1' style={{width:'auto'}} >
          <h3 className='text-center mb-2' style={{background:'black', fontFamily: "'Poppins', sans-serif", color:'white',textTransform: 'uppercase'}}>My Profile</h3>
    <div className="form-group ">
      <label htmlFor="inputEmail4">Email</label>
      <input onChange={(e)=> setEmail(e.target.value)} type="email" value={email} className="form-control" id="inputEmail4" placeholder="Email" />
    </div>
    <div className="form-group ">
      <label htmlFor="inputPassword4">Password</label>
      <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className="form-control" id="inputPassword4" placeholder="Password" />
    </div>
    <div className="form-group ">
    <label htmlFor="inputAddress">Phone</label>
    <input onChange={(e)=> setPhone(e.target.value)} value={phone} type="number" className="form-control" id="inputAddress" placeholder="+911234567890" />
  </div>
  
  <div className="form-group ">
    <label htmlFor="inputAddress2">Address</label>
    <input onChange={(e)=> setAddress(e.target.value)} value={address} type="text" className="form-control" id="phone" placeholder="125/2, Kund-Dahina Road, khol, Rewari, Haryana " />
  </div>
    <div className="form-group ">
      <label htmlFor="inputCity">Name</label>
      <input onChange={(e)=> setName(e.target.value)}  value={name} placeholder='Arun' type="text" className="form-control" id="inputCity" />
    </div>
  <button type="submit" className="btn btn-primary">Update</button>
</form>

    </div>
    </div>

      </div>
    </div>
   </div>
     
    </Layout>
  )
}

export default MyProfile