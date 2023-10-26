import logo from './logo.svg';
import './App.scss';

import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import User from './pages/User';
import Help from './pages/Help';
import Layout from './layouts/Layout';

import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import Books from './pages/Books/Books';
import Profile from './pages/Profile';
import ShoppingCart from './pages/Cart/ShoppingCart';
import CartIcon from './pages/Cart/CartIcon';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* <Route path='/' element={<Layout />}>     // <<< Mind <<<  Add layout

              <Route path='/' element={<Home />} />
              <Route path='/user' element={<User />} />
              <Route path="/help" element={<Help />} />
          </Route> */}

          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/books' element={<Books />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/user' element={<User />} />
              <Route path="/help" element={<Help />} />
              <Route path="/cart" element={<CartIcon/>} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
