import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AllProducts from "./Pages/AllProducts/AllProducts";
import ProductDetailPage from './Pages/ProductDetailPage/ProductDetailPage'; 

function App() {


  return (
    <div className="App">
  
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
