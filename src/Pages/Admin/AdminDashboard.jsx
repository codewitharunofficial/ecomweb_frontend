import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {

  const [auth] = useAuth();
    
  return (
    <Layout>
   <div className="container fluid m-3 p-3">
    <div className="row">
      <div className="col-md-3">
        <AdminMenu/>
      </div>
      <div className="col-md-9">
        <div className="card w-75 p-3 mt-4">
          <h3>{auth?.user?.name}</h3>
          <h3>{auth?.user?.phone}</h3>
          <h3>{auth?.user?.email}</h3>
          <h3>{auth?.user?.answer}</h3>
          <h3>{auth?.user?.address}</h3>
        </div>
      </div>
      
    </div>
   </div>
    </Layout>
  )
}

export default AdminDashboard