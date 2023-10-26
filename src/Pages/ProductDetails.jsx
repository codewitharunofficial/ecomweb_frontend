import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/Cart";

const ProductDetails = () => {
  // const [photo, setPhoto] = useState("");
  const [cart, setCart] = useCart();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [slug, setSlug] = useState("");
  const [shipping, setShipping] = useState();
  const params = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const getTheProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-a-product/${params.slug}`
      );

      if (data?.success) {
        setName(data?.product?.name);
        setPrice(data?.product?.price);
        setSlug(data?.product?.slug);
        setDescription(data?.product?.description);
        setId(data?.product?._id);
        getSimilarProducts(data?.product?._id, data?.product?.category);
        setProduct(data?.product);
        console.log(data?.product?.category);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheProduct();
    //eslint-disable-next-line
  }, []);

  //fetching similar products

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/related-products/${pid}/${cid}`
      );
      console.log(data);
      setRelatedProducts(data?.relatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //    getSimilarProducts();
  //    //eslint-disable-next-line
  // }, []);

  return (
    <Layout>
      <div className="row container m-2">
        <div className="col-md-6" style={{ marginTop: '20px',  border: '1px solid gray', borderRadius: '2px', height: '400px'}}>
          <img
            
            style={{objectFit: 'fir'}}
            width={"520px"}
            height={'400px'}
            src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${id}`}
            alt=""
          />
        </div>
        <div className="col-md-6" style={{ fontWeight: "bold", width: '100%', height: 'auto', marginTop: '20px', padding: '20px', gap: '10px'}}>
          <h1 className="text-center">Product Details</h1>
          <div>
            <h5>Product Name: {name}</h5>
            <h6>
              Price:{" "}
              {price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </h6>
          </div>
          {/* <p>Category: {category?.name}</p> */}
          <p>Product Description: {description}</p>
          <button onClick={() => {setCart([...cart, product]); toast.success('Item Added To Cart'); localStorage.setItem('cart', JSON.stringify([...cart, product]))}} className="btn btn-secondary mb-2">Add To Cart</button>
        </div>
      </div>

      <div className="row container m-2">
        <h4 className="text-center">Similar Products</h4>
        <div className="col-md-12">
          {!relatedProducts ? (
            <p>No Similar Products Found</p>
          ) : (
            relatedProducts.map((p) => (
              <div className="card m-2 col-md-3" key={p._id}>
                <Link to={`/products/${p.slug}`}>
                  <div
                    style={{ borderBottom: "1px solid gray", padding: "10px" }}
                  >
                    <img
                    onClick={() => navigate(`/products/${p.slug}`)}
                      className="card-img-top p-2"
                      src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                      alt={p.name}
                      height={"200px"}
                    />
                  </div>
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{p.name.slice(0, 15)}...</h5>
                  <h5 className="price">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                  <p className="card-text">{p.description.slice(0, 30)}...</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
