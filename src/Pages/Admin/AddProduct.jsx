import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantiity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");

  //getting all category

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/category`
      );
      if (data?.success) {
        setCategories(data?.category);
        console.log(categories);
      }
    } catch (error) {
      toast.error("Something Went Wrong While Fetching Categories");
    }
  };

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async(e) => {
           e.preventDefault();

           try {

            const productData = new FormData();
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('quantity', quantity)
            productData.append('category', category)
            productData.append('photo', photo)

            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/new-product`, productData);

            if(data?.success) {
                toast.success(data?.message)
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data?.message)
            }
            
           } catch (error) {
            toast.error("Something Went Wrong While Creating New Product")
           }
  }

  
  

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Add Product</h2>
            <div className="m-1">
              <Select
                bordered={true}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3 w-75"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories.map((e) => (
                  <Option key={e._id} value={e._id}>
                    {e.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-success">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo && (
                  <div className="">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt=""
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3 w-75">
              <form className='p-1' style={{width:'auto'}} >
          <h3 className='text-center mb-2' style={{background:'black', fontFamily: "'Poppins', sans-serif", color:'white',textTransform: 'uppercase'}}>Create A New Product</h3>
    <div className="form-group ">
      <label htmlFor="inputPassword4">Quantity</label>
      <input onChange={(e)=> setQuantiity(e.target.value)} required={true} value={quantity} type="number" className="form-control" placeholder="0-10" />
    </div>
    <div className="form-group ">
    <label htmlFor="inputAddress">Price</label>
    <input onChange={(e)=> setPrice(e.target.value)} required={true} value={price} type="number" className="form-control" placeholder="2999 Rs/-" />
  </div>
    <div className="form-group ">
      <label htmlFor="inputCity">Name</label>
      <input onChange={(e)=> setName(e.target.value)} required={true} value={name} placeholder='Product Name' type="text" className="form-control" />
    </div>
    <div className="form-group ">
      <label htmlFor="productDescription">Description</label>
      <input onChange={(e)=> setDescription(e.target.value)} required={true} value={description} placeholder='Description of the product' type="text" className="form-control" id="inputQuestion" />
    </div>
    <div className="form-group">
      <label htmlFor="Shipping">Shipping</label>
      <Select bordered={true}
      placeholder="Select Shipping"
      size="large"
      className="form-select mmb-3"
      onChange={(value) => setShipping(value)}
      >

<Option value='0'>No</Option>
<Option value='1'>Yes</Option>

      </Select>
    </div>
  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Upload Product</button>
</form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
