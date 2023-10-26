import React from 'react'
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {


    const [values, setValues] = useSearch();
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {


        e.preventDefault();

        try {
            
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/search/${values.keyword}`);
            setValues({...values, results: data})
            console.log(values);
            navigate('/search')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
  <input value={values.keyword} onChange={(e) => setValues({...values, keyword: e.target.value})} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
</form>

    </div>
  )
}

export default SearchInput