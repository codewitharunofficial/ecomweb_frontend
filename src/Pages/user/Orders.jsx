import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from './UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment';
import { emojify } from 'node-emoji'

const Orders = () => {

  const [orders, setOrders] = useState([]);
 

  const [auth] = useAuth();


  const getOrders = async () => {
    try {

      const { data: {Order} } = await axios.post(`${process.env.REACT_APP_API}/api/v1/orders/all-orders`, {userId: auth?.user?._id});
      if (Order) {
           setOrders(Order);
           console.log(orders);
      }

    } catch (error) {
      console.log(error)
    }

    
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token])

  return (
    <Layout title='Ecommerce App - Orders'>
      <div className="wrapper-fluid m-md-3 p-3" >
        <div className="row user">
          <div className="col-md-3 menu " >
            <UserMenu />
          </div>

          <div className="col-md-7 ml-md-5 mt-3 order" >
          <h3 className="text-center mb-4">
            All Orders
          </h3>
          {
            orders.length > 0 ? (
              orders?.map((o, i) => {
                return <div className="border-shadow" key={i._id}>
                   <table className='table mt-4'>
                     <thead>
                       <tr>
                         <th className='col-1'>#</th>
                         <th className='col-1'>Status</th>
                         <th className='col-1'>Buyer</th>
                         <th className='col-1'>Date</th>

                       </tr>
                     </thead>
                     
                     <tbody>
                       <tr>
                         <td>{i + 1}</td>
                         <td>{o.status}</td>
                         <td>{o?.buyers?.name}</td>
                         <td>{moment(o?.createdAt).fromNow()}</td>

                       </tr>
                     </tbody>
                   </table>
                   {o?.products?.map(p => (
                <div className="row mb-2 p-2 card flex-row" key={p._id} style={{border: '2px solid gray', borderRadius: '3px'}}>
                  <div className="col-md-6" >
                    <img
                    
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                      alt={p.name}
                      height={'200px'}
                      width={'200px'}
                                          />
                      </div>
                  <div className="col-md-6">
                    <h4 className='mt-2'>{p.name}</h4>
                    <p>{p.description.slice(0,30)}...</p>
                    <h6 className='text-primary'>
              Price:{" "}
              {p.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </h6>
            <p style={{color: o?.payment === "Completed" ? "green" : "red"}} >Payment: {o?.payment}</p>
            <p>Quantity: {o?.products?.length}</p>
            {/* <button onClick={() => removeCartItem(p._id)} className='btn btn-danger'>Remove</button> */}
                  </div>
                </div>
              ))}
                 </div>
     })
            ) : (
              <div className='container d-flex col-md-9' style={{justifyContent: 'center', alignItems: 'center',}} >
                <h3 className='text-center'>Nothing to Show { emojify(' :disappointed: !!')} Shop Now {emojify(' :handshake: ')} </h3>
              </div>
            )
          }
         
          
         
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders