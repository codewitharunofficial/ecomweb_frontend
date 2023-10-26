import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div>
            <div className="text-center">
                <div className="list-group">
                    <h4>DashBoard</h4>
                    <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users</NavLink>
                    <NavLink to="/dashboard/admin/add-category" className="list-group-item list-group-item-action">Add-Category</NavLink>
                    <NavLink to="/dashboard/admin/add-product" className="list-group-item list-group-item-action">Add Product</NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
                    
                </div>
            </div>
        </div>
    )
}

export default AdminMenu