import React from 'react'
import { useNavigate } from 'react-router-dom'

const DeleteWarningFrom = ({ handleDelete, slug}) => {

  const navigate = useNavigate();

  return (
    <>
        <div className="col-md-9">
                        <h4>Delete Product??</h4>
                        <div className="form-group">
                            <p>Do You Really Want To Delete This Product?
                            </p>
                            <p className='text-danger'>Warning: By Clicking 'Yes' You would loose all the details following this product from the database</p>
                        </div>
                        <button onClick={handleDelete} className='btn-danger mr-2' type='submit'>Yes</button>
                        <button onClick={() => navigate(`/dashboard/admin/products/${slug}`)} className='btn-primary' type='submit'>No</button>
    </div>
    </>
  )
}

export default DeleteWarningFrom