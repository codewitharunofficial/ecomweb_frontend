import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from './UserMenu';

const Dashboard = () => {
const [auth] = useAuth();

  return (
    <Layout>
   <div className="container fluid m-3 p-3">
    <div className="row">
      <div className="col-md-2 dashboard menu">
        <UserMenu/>
      </div>
      <div className="col-md-8 profile">
        <div className="card card-profile w-75 p-3 mt-3 ml-md-4">
          <h3>{auth?.user?.name}</h3>
          <h3>{auth?.user?.phone}</h3>
          <h3>{auth?.user?.email}</h3>
          <h3>{auth?.user?.answer}</h3>
        </div>
      </div>
      
    </div>
   </div>
    </Layout>
  )
}

export default Dashboard