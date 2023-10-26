import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from './CategoryForm'
import {Modal} from 'antd';

const AddCategory = () => {

    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('');


    const addCategory = async (e) => {

        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/add-category`, { name });
            console.log(res.data);

            if (res.data.success === true) {
                toast.success(`${name} is  created Successfully`);
                getAllCategories();
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Oops! Something went wrong")
        }

    }

    const getAllCategories = async () => {
           const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/category`);
           if(data?.success) {
            setCategories(data.category)
           }
    }

    useEffect(() => {
      getAllCategories();
      // eslint-disable-next-line
    }, []);
    

    const updateCategory =async (e) => {
        e.preventDefault();

        try {
            
            const {data} =  await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name : updatedName});
            if(data?.success) {
                toast.success(`${name} Is Updated Sucessfully as ${updatedName}`);
                setSelected(null);
                setUpdatedName('');
                setVisible(false);
                getAllCategories();
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error('Something Went Wrong')
        }
    }

    const deleteCategory =async (id) => {


              try {
                
                const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);

                if(data?.success) {
                    toast.success(data?.message)
                    getAllCategories();
                } else {
                    toast.error(data.message)
                }

              } catch (error) {
                toast.error("Something Went Wrong")
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
                        <h4 className='ml-3' >Add Category</h4>
                        <div className="form-group w-75 ml-3">
                            <label htmlFor="inputCity">Name</label>
                            <input onChange={(e) => setName(e.target.value)} required={true} value={name} placeholder='Category Name' type="text" className="form-control" id="inputCategory" />
                        </div>
                        <button onClick={addCategory} className='btn-primary ml-3 mb-3 p-2' type='submit'>Add New Category</button>

                        <table className="table table-bg-dark mt-4">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                                <>
                                {categories.map((e) => {
                                    return <tr>
                                        <td key={e._id}>{e.name}</td>
                                     <td>   <button onClick={() => {setVisible(true); setUpdatedName(e.name); setSelected(e)}} className='btn btn-warning mr-2'>Edit</button>
                                        <button onClick={() => deleteCategory(e._id)} className='btn btn-danger' >Delete</button> </td>
                                    </tr>
                                })}
                                </>
                            </thead>
                        </table>
                    </div>
                 <Modal onCancel={() => setVisible(false)} footer={null} open={visible}> <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={updateCategory} /> </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory