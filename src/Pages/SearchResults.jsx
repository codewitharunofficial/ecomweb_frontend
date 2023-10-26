import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import Loader from "../Components/Layout/Loader";
import { FaShopify } from 'react-icons/fa';
// // import { Checkbox, Radio } from "antd";
// // import {Price} from '../Components/Layout/Price';
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";


const SearchResults = () => {

 const [values, setValues] = useSearch();
 
 

  return (
    <Layout title="Ecommerce - Search-Results">

<h1 className="text-center mb-3" style={{ color: 'black'}}><Link className="navbar-brand" style={{ color: 'black', fontFamily: 'Playfair Display , serif', fontSize: '24px'}} to="/"> <FaShopify />ShopEase</Link></h1>

            <h3 className="text-center">{values?.results?.searchedResults.length < 1 ? `No Results Found For ${values.keyword}` : `Found ${values.results.searchedResults.length} results for '${values.keyword}'`}</h3>

            <div className="row m-2">
                <div className="col-md-3">

                </div>
                <div className="col-md-9">
                    <div className="d-flex flex-wrap">
                { values?.results?.searchedResults.map((p) => (
                
                <div
                  className="card m-3 col-md-3 " key={p._id}
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
        }
        </div>
        </div>
                </div>
    </Layout>
  )
}

export default SearchResults
