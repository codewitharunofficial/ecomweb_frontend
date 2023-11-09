import React, { useState, useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useCart } from '../../context/Cart';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import  * as emoji from 'node-emoji';
import toast from 'react-hot-toast';
// import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios';
import Loader from '../../Components/Layout/Loader';
// import Razorpay from 'razorpay';

const Cart = () => {


  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');

  
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
    cart?.map((item) => (total = total + item.price));
    return total.toLocaleString("en-IN", {
      style: 'currency',
      currency: 'INR'
    })
    } catch (error) {
      console.log(error)
    }
  }




  const checkoutHandler = async () => {
         const {data: {key}} = await axios.get(`${process.env.REACT_APP_API}/api/get-key`);
        const {data: {order}} = await axios.post(`${process.env.REACT_APP_API}/api/v1/payment/create-order`, {cart, auth});
        

        const options = {
          key: key, // Enter the Key ID generated from the Dashboard
          amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Shopyse",
          description: "Test Transaction",
          image: "https://instagram.fixc5-2.fna.fbcdn.net/v/t51.2885-19/393164812_243020152085613_3408388935756034719_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fixc5-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=WN4UwOoiTBsAX-u50fK&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDxWdTz4RHJpLYJ7HE0qQpoAEpFhSAm6mvgC0sSQRz5AQ&oe=65516BAA&_nc_sid=8b3546",
          order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `${process.env.REACT_APP_API}/api/v1/payment/confirm-payment`, 
          prefill: {
              name: auth?.user?.name,
              email: auth?.user?.email,
              contact: auth?.user?.phone
          },
          notes: {
              address: auth?.user?.address
          },
          theme: {
              color: "#121212"
          }
      };
      
      const razor = new window.Razorpay(options);
      razor.open();
      

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
            <button onClick={() => removeCartItem(p._id)} className='btn btn-danger'>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <h4 className='text-center'>Cart Summary</h4>
            <hr style={{ borderWidth: '2px', borderColor: '#000'}} />
            {!cart.length ? ( <h4 className='text-center'>No Items To Show {emoji.emojify(`:robot:`)}</h4> ) : (

            <h5>Total: {totalPrice()}</h5>
            )}
            { cart & auth?.user?.address ? (
            <div className="col-md-3">
              {auth?.user?.address}
              <button className='btn btn-warning mt-2' onClick={() => navigate('/dashboard/user/myprofile', {state: '/user/cart'})}>Update</button>
            </div>
          ) : (
           cart & auth?.token ? (
              <button className='btn btn-warning mt-2' onClick={() => navigate('/dashboard/user/myprofile', {state: '/user/cart'})}>Update</button>
            ) : (
              <button className='btn btn-success mt-2' hidden={auth.token} onClick={() => navigate('/user/login', {state: ('/user/cart')})}>Login to proceed</button>
            )
          )}

          <div className="mt-2">
                   
                <button type='submit' hidden={!cart.length || !auth.token} onClick={checkoutHandler} className='btn btn-primary'>Checkout</button>
                

            
          </div>
          </div>
          
          

          </div>
        </div>
    </Layout>
  )
}

export default Cart
