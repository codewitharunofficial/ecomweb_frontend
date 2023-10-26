// import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import About from'./Pages/About';
import Policy from './Pages/Policy';
import Contact from './Pages/Contact';
// import Layout from './Components/Layout/Layout';
import PageNoteFound from './Pages/PageNotFound';
import Login from './Pages/Authentication/Login';
import SignUp from './Pages/Authentication/SignUp';
import Dashboard from './Pages/user/Dashboard';
import ProtectedRoute from './Components/Layout/Routes/ProtectedRoute';
import ForgotPassword from './Pages/Authentication/ForgotPassword';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminRoute from './Components/Layout/Routes/AdminRoute';
import MyProfile from './Pages/user/MyProfile';
import Orders from './Pages/user/Orders';
import AddCategory from './Pages/Admin/AddCategory';
import AddProduct from './Pages/Admin/AddProduct';
import AllUsers from './Pages/Admin/AllUsers';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import ProductDetails from './Pages/ProductDetails';
import SearchResults from './Pages/SearchResults';
import Cart from './Pages/user/Cart';


function App() {
  return (
    <>
    <Routes>
      <Route path='/about'  element={ <About />} />
      <Route path='/products/:slug'  element={ <ProductDetails />} />
      <Route path='/policy'  element={ <Policy/> } />  
      <Route path='/dashboard'  element={ <ProtectedRoute/> } >
      <Route path='user'  element={ <Dashboard/> } />
      <Route path='user/myprofile'  element={ <MyProfile/> } />
      <Route path='user/orders'  element={ <Orders/> } />

        </Route>
      <Route path='/dashboard'  element={ <AdminRoute /> } >
      <Route path='admin'  element={ <AdminDashboard/> } />
      <Route path='admin/add-category'  element={ <AddCategory/> } />
      <Route path='admin/add-product'  element={ <AddProduct/> } />
      <Route path='admin/products/:slug'  element={ <UpdateProduct/> } />
      <Route path='admin/products'  element={ <Products/> } />
      <Route path='admin/users'  element={ <AllUsers/> } />
        </Route>
  
      <Route path='/contact'  element={ <Contact />} />
      <Route path='*'  element={ <PageNoteFound />} />
      <Route path='/'  element={ <HomePage />} />
      <Route path='/search'  element={ <SearchResults />} />
      <Route path='/user/login'  element={ <Login />} />
      <Route path='/user/forgot-password'  element={ <ForgotPassword />} />
      <Route path='/user/signup'  element={ <SignUp />} />
      <Route path='/user/cart'  element={ <Cart />} />
    </Routes>
      
    </>
  );
}

export default App;
