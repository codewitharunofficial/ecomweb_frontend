import React from 'react'
import AdminMenu from './AdminMenu'
import Layout from '../../Components/Layout/Layout'

const AllUsers = () => {
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <h1 className="col-md-9">
                    All Users
                </h1>
            </div>
        </div>
    </Layout>
  )
}

export default AllUsers