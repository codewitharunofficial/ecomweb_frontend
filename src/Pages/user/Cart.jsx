import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useCart } from '../../context/Cart';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import  * as emoji from 'node-emoji';
import { FaRemoveFormat } from 'react-icons/fa';
import Item from 'antd/es/list/Item';
import toast from 'react-hot-toast';
// import { FaSmile } from 'react-icons/fa';

const Cart = () => {


  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();


  const removeCartItem = (pid) => {
     try {
      
      let myCart = [...cart]
      let index = myCart.findIndex(Item => Item._id === pid)
      myCart.splice(index, 1);
      setCart(myCart);
      toast.success("Item Removed From Cart");
      localStorage.setItem('cart', JSON.stringify(myCart))

     } catch (error) {
      console.log(error)
     }
  }

  //calculate total price for cart items

  const totalPrice = () => {
    try {
      let total = 0
    cart?.map((item) => {total = total + item.price});
    return total.toLocaleString("en-IN", {
      style: 'currency',
      currency: 'INR'
    })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Layout>
        <div className="container">
          <div className="row">
         <div className="col-md-12">
          <h3 className='text-center bg-secondary text-white p-1 mt-2'>
            {auth?.token ? emoji.emojify(`Hello ${auth.user.name} :smile:!!`) : ( <p>You're Not Logged in, Please Login To Checkout</p> )}
          </h3>
          <h5 className='text-center'>{cart?.length > 0 ? `You have ${cart.length} items in your Cart` : "Your Cart Is Empty"}</h5>
         </div>
            <div className="row">
          <div className="col-md-9 mt-3">
              {cart?.map(p => (
                <div className="row mb-2 p-2 card flex-row" style={{border: '2px solid gray', borderRadius: '3px'}}>
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
            <button onClick={() => removeCartItem(p._id)} className='btn btn-danger'>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <h4 className='text-center'>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr style={{ borderWidth: '2px', borderColor: '#000'}} />
            <h5>Total: {totalPrice()}</h5>
          </div>
          
          </div>
        </div>
    </Layout>
  )
}

export default Cart
