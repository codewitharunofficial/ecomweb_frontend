import {React, useEffect, useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from './UserMenu';
const MyProfile = () => {

 const [auth] = useAuth();

  return (

   <Layout title='Ecommerce App - My Account'> 
   <div className="container-fluid m-3 p-3">
    <div className="row">
      <div className="col-md-3">
        <UserMenu/>
      </div>
      <h1 className="col-md-9">My-Profile</h1>
    </div>
   </div>
     
    </Layout>
  )
}

export default MyProfile