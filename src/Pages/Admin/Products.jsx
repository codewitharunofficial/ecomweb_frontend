import React, { useState, useEffect } from 'react'
import AdminMenu from './AdminMenu'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {

    const [product, setProduct] = useState([]);

    const getProducts = async () => {
    
        try {
         const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product`);
         
         if(data?.success) {
           setProduct(data?.products);
         console.log(product)
         } 
        } catch (error) {
            toast.error("Error While Getting Products")
        }
       }
     
     
       useEffect(() => {
         getProducts();
         // eslint-disable-next-line
       }, [])

  return (
    <Layout>
        <div className="row">
            <div className="col-md-3">
              <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className="text-center">All Products</h1>
                <div className="d-flex" style={{ height: '90vh'}}>
                {product.map(p => (
                <Link to={`/dashboard/admin/products/${p?.slug}`} style={{ textDecoration: 'none', color: 'black'}} >
                <div className="card m-2" style={{width: '15rem', height: '21rem', overflow: 'hidden'}}>
                <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`} alt={p.name} height='50%' width={'50%'} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className='price'>{p.price} Rs.</h5>
                  <p className="card-text">{p.description.slice(0, 30)}...</p>
                </div>
              </div>
                </Link>
             ))}
             
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products