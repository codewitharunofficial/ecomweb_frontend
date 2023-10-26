import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from './UserMenu'

const Orders = () => {
  return (
    <Layout title='Ecommerce App - Orders'>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <h1 className="col-md-9">
                    All Orders
                </h1>
            </div>
        </div>
    </Layout>
  )
}

export default Orders