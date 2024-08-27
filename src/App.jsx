import './App.css'
import ProductDetails from './components/DetailPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import ProductCard from './components/ProductCard'
import ProductList from './components/Products';
import Navbar from './components/NavBar';
import CartPage from './components/Cart';
const productData = {
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
};

function App() {

  return (
    <>
      <div >
      <Router>
        <Navbar/>
      <div className='main-app'>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
       
      </div>
    </>
  )
}

export default App
