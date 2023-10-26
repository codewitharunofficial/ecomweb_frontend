import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../Components/Layout/Loader";
import { FaShopify } from 'react-icons/fa';
import { Checkbox, Radio } from "antd";
import {Price} from '../Components/Layout/Price';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const  [loading, setLoading] = useState(false);


  //get total count

  const getTotal = async () => {
    try {

      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-count`);

      if(data?.success) {
        setTotal(data.total)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTotal();
  }, [])

  const getAllCategories = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/category`);
    if(data?.success) {
     setCategories(data?.category)
     console.log(categories)
    }
}

useEffect(() => {
getAllCategories();
// eslint-disable-next-line
}, []);


//filter by cat

const handleFilter = (value, id) => {
   let all = [...checked]
   if(value) {
    all.push(id)
   } else {
    all = all.filter(c => c!== id)
   }
   setChecked(all)
}


//applying filters to the products

const filters = async () => {
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/product-filters`, {checked, radio});

    if(data?.success){
      setProducts(data?.products)
    }
  } catch (error) {
    console.log(error)
  }
}


  const getAllProducts = async () => {
    try {

      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );

      if (data?.success) {
        setProducts(data.products);
        setLoading(false)
      } else {
        toast.error("Error While Fetching The Page Data");
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
   if(!checked.length || !radio.length) getAllProducts();
    
  }, [checked.length, radio.length]);

  //for filters
  useEffect(() => {
   if(checked.length || radio.length) filters();
    
  }, [checked.length, radio.length]);


  //laoding more products

  const loadMore = async () => {
    try {
      setLoading(true);
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`)
    setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  useEffect(() => {
   if(page === 1) return;
    loadMore();

  }, [page])

  return (
    <Layout title="Ecommerce - HomePage - Best Offers">

<h1 className="text-center mb-3" style={{ color: 'black'}}><Link className="navbar-brand" style={{ color: 'black', fontFamily: 'Playfair Display , serif', fontSize: '24px'}} to="/"> <FaShopify />ShopEase</Link></h1>
          <div className="m-3">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active m-3">
      <img className="d-block w-100" src='https://w7.pngwing.com/pngs/561/897/png-transparent-sony-smartwatch-3-apple-watch-android-watch-electronics-gadget-watch-accessory-thumbnail.png' height={'300px'}  alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://mir-s3-cdn-cf.behance.net/projects/404/e6181e120041777.Y3JvcCw5OTksNzgyLDAsMTA4.png" height={'300px'} alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://mir-s3-cdn-cf.behance.net/projects/404/198196113332619.Y3JvcCw5OTksNzgyLDAsMTA4.png" height={'300px'} alt="Third slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon-primary" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </a>
</div>

          </div>
<hr className="mr-3" style={{borderColor: '#000', borderWidth: '2px', width: '100%' }} />

      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column ml-2">
          {categories?.map((c)=> (
            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
          ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column ml-2">
          <Radio.Group onChange={e => setRadio(e.target.value)}>
            {Price?.map(e => (
              <div key={e._id}>

                <Radio value={e.array}>{e.name}</Radio>
              </div>
            ))}
          </Radio.Group>
          </div>
          <div className="d-flex flex-column">
          <button className="btn btn-danger p-1 mt-2 ml-2 w-50" onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="d-flex flex-wrap ">
            {!products ? (

                <Loader />
              
            ) : (
              products.map((p) => (
                
                  <div
                    className="card m-2 col-md-3" style={{border: '1px solid gray', borderRadius: '2px'}} key={p._id}
                  >
                    <Link to={`/products/${p.slug}`} >
                      <div style={{ borderBottom: '1px solid gray', padding: '10px'}}
>
                    <img
                      className="card-img-top p-2"
                      src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                      alt={p.name}
                      height={'200px'}
                                          />
                    </div>
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{p.name.slice(0, 15)}...</h5>
                      <h5 className="price">{p.price.toLocaleString("en-IN", { style:  "currency", currency: "INR"})}</h5>
                      <p className="card-text">
                        {p.description.slice(0, 30)}...
                      </p>
                    </div>
                  </div>
              ))

            )}
          </div>
          <div className="text-center">
          {products && products.length < total && (
            <button className="btn btn-primary mb-2" onClick={(e) => {e.preventDefault(); setPage(page + 1)}}> {loading ? <Loader/> : "Load More"}  </button>
          )}
        </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default HomePage;
