import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/auth";
import { redirect, useNavigate } from "react-router-dom";
import * as emoji from "node-emoji";
import toast from "react-hot-toast";
// import DropIn from 'braintree-web-drop-in-react'
import axios from "axios";
import Loader from "../../Components/Layout/Loader";
// import Razorpay from 'razorpay';

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [initiating, setInitiating] = useState(false);

  const [paymentId, setPaymentId] = useState("");

  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((Item) => Item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      toast.success("Item Removed From Cart");
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //calculate total price for cart items

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutHandler = async () => {
    setInitiating(true);
    const {
      data: { key },
    } = await axios.get(`${process.env.REACT_APP_API}/api/get-key`);
    const {
      data: { order },
      data: { Order },
    } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/payment/create-order`,
      { cart, auth }
    );
    //  const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/payment/create-order`, {cart, auth});
    console.log(Order, order);
    setInitiating(false);
    const options = {
      key: key,
      amount: amount,
      currency: "INR",
      name: "Shopyse",
      description: "Test Transaction",
      image: "",
      order_id: order.id,
      handler: async (response) => {
        setPaymentId(response.razorpay_payment_id);
        //  console.log(response);
        const verifyUrl = `${process.env.REACT_APP_API}/api/v1/payment/confirm-payment`;
        const { data } = await axios.post(verifyUrl, {
          response,
          Order_Id: Order?._id,
        });
        if (data?.success) {
          toast.success(
            data?.message + `reference No. ${data?.payment?.paymentId}`
          );
          localStorage.removeItem("cart");
          navigate(`/dashboard/user/orders`);
          console.log(paymentId);
        }
      },
      prefill: {
        name: auth?.user?.name,
        email: auth?.user?.email,
        contact: auth?.user?.phone,
      },
      notes: {
        address: auth?.user?.address,
      },
      theme: {
        color: "#121212",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  console.log(cart);
  return (
    <Layout title={'Shopease - Cart'} >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center bg-secondary text-white p-1 mt-2">
              {auth?.token ? (
                emoji.emojify(`Hello ${auth.user.name} :smile:!!`)
              ) : (
                <p>You're Not Logged in, Please Login To Checkout</p>
              )}
            </h3>
            <h5 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your Cart`
                : "Your Cart Is Empty"}
            </h5>
          </div>
          <div className="row">
            <div className=" col-md-9 mt-3 ">
              {cart?.map((p) => (
                <div
                  className="row mb-2 p-2 card flex-row"
                  key={p._id}
                  style={{ border: "2px solid gray", borderRadius: "3px" }}
                >
                  <div className="flex-0.5">
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                      alt={p.name}
                      height={"200px"}
                      width={"200px"}
                    />
                  </div>
                  <div className="flex-0.5">
                    <h4 className="mt-2">{p.name}</h4>
                    <p>{p.description.slice(0, 30)}...</p>
                    <h6 className="text-primary">
                      Price:{" "}
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h6>
                    <button
                      onClick={() => removeCartItem(p._id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <h4 className="text-center">Cart Summary</h4>
            <hr style={{ borderWidth: "2px", borderColor: "#000" }} />
            {!cart.length ? (
              <h4 className="text-center">
                No Items To Show {emoji.emojify(`:robot:`)}
              </h4>
            ) : (
              <h5>Total: {totalPrice()}</h5>
            )}
            {cart & auth?.user?.address ? (
              <div className="col-md-3 cart-button">
                {auth?.user?.address}
                <button
                  className="btn btn-warning mt-2"
                  onClick={() =>
                    navigate("/dashboard/user/myprofile", {
                      state: "/user/cart",
                    })
                  }
                >
                  Update
                </button>
              </div>
            ) : cart.length > 0 && auth?.user ? (
              <button
                className="btn btn-warning mt-2"
                onClick={() =>
                  navigate("/dashboard/user/myprofile", { state: "/user/cart" })
                }
              >
                Update
              </button>
            ) : (
              <button
                className="btn btn-success mt-2"
                hidden={auth.token}
                onClick={() => navigate("/user/login", { state: "/user/cart" })}
              >
                Login to proceed
              </button>
            )}

            <div className="mt-2">
              <button
                type="submit"
                hidden={!cart.length || !auth.token}
                onClick={checkoutHandler}
                className="btn btn-primary"
              >
                {initiating ? <Loader /> : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
