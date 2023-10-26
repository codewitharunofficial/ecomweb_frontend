import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaShopify } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../../Pages/Forms/SearchInput';
import { useCart } from '../../context/Cart';
import {Badge} from 'antd';

const Header = () => {

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogOut = () => {
    setAuth({
      ...auth, user: null, token: ""
    })
    localStorage.clear();
    toast.success("You've Logged Out Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,114,121,1) 0%, rgba(0,212,255,1) 100%)' }}>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <Link className="navbar-brand" to="/"> <FaShopify />ShopEase</Link>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            
            <li className="nav-item mr-3 mt-1">
              <SearchInput />
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            
                {!auth.user ? (<>
                  <li>
                    <NavLink className="nav-link" to="/user/login">Login</NavLink>
                  </li></>) :

                  (<> <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {auth?.user?.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <NavLink className="dropdown-item" to={`dashboard/${auth?.user?.role === 1? 'admin' : 'user'}`}>Dashboard</NavLink>
                        <NavLink onClick={handleLogOut} className="dropdown-item" to="/user/login">LogOut</NavLink>
                      </li>
                    </div></li>     </>)}

            <li className="nav-item">
              <Badge className='mt-1' count = {cart?.length} showZero >
              <NavLink className="nav-link" to="/user/cart">Cart</NavLink>
              </Badge>
            </li>

          
            </ul>
        </div>
      </nav>



    </>
  )
}

export default Header
