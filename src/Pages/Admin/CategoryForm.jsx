import React from 'react'

const CategoryForm = ({value, setValue, handleSubmit}) => {
  return (
    <>
        <div className="col-md-9">
                        <h4>Edit Category</h4>
                        <div className="form-group">
                            <label htmlFor="inputCity">New Name</label>
                            <input onChange={(e) => setValue(e.target.value)} required={true} value={value} placeholder='Category Name' type="text" className="form-control" id="inputCategory" />
                        </div>
                        <button onClick={handleSubmit} className='btn-primary' type='submit'>Save Changes</button>
    </div>
    </>
  )
}

export default CategoryForm