import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, answer, newPassword });
        console.log(res.data);
        try {
          if (res.data.success === true) {
            toast.success(res?.data.message);
            navigate('/user/login');
          } else {
            toast.error(res?.data.message)
            
          }
    
        } catch (error) {
          console.log(error)
          toast.success(res?.data.message);
        }
      }

    return (

        <Layout>
            <div className='p-4 mb-6' style={{ display: 'flex', width: 'auto', height: '100%', padding: '20px', marginBottom: '20px', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                <div className='d-flex col-md-4 col-lg-6 p-4' style={{ display: 'flex', background: '#fefefe', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 6px 6px 4px gray' }}>

                    <div className="form-group " style={{}}>
                        <h4 className='text-center mt-2 mb-4' style={{ background: '#000', color: 'white', fontFamily: "'Poppins', sans-serif" }}>RESET PASSWORD</h4>
                        <label htmlFor="inputEmail4">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} required={true} type="email" value={email} className="form-control" id="inputEmail4" placeholder="Email" />
                        <div className="form-group ">
                            <label htmlFor="inputQuestion">Answer</label>
                            <input onChange={(e) => setAnswer(e.target.value)} required={true} value={answer} placeholder='Your First School Name?' type="text" className="form-control" id="inputQuestion" />
                            <small>The Above Feild is for security</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">New Password</label>
                            <input onChange={(e) => setNewPassword(e.target.value)} required={true} type="password" className="form-control" value={newPassword} id="exampleInputPassword1" placeholder="Enter Your New Password" />
                        </div>
                        <button onClick={handleSubmit} type="submit" className="btn btn-success mt-4">Update</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword