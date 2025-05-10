import Navbar from "./Component/Navbar/Navbar.jsx";
import {BrowserRouter,Routes,Route,} from 'react-router-dom';
import ShopCategory from "./Pages/ShopCategory.jsx";
import Shop from "./Pages/Shop.jsx";
import Product from "./Pages/Product.jsx";
import Cart from "./Pages/Cart.jsx";
import LoginSignup from "./Pages/LoginSignup.jsx";

import './index.css';
import Footer from "./Component/Footer/Footer.jsx";
import men_banner from './Component/assets/banner_mens2.png'
import women_banner from './Component/assets/banner_womens1.png'
import kid_banner from './Component/assets/banner_kids1.png'
import Checkout from "./Pages/Checkout.jsx";

function App() {
  return (
    <div>
 <BrowserRouter>
 <Navbar/>
 <Routes>
  <Route path='/' element={<Shop/>}/>
  <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
  <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
  <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>

  <Route path="/product/:productId" element={<Product/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path="/checkout" element={<Checkout />} />
  <Route path='login' element={<LoginSignup/>}/>
  
 </Routes>
 <Footer/>
 
 </BrowserRouter>

    </div>
    
  );
}

export default App;
