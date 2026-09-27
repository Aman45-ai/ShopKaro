import AllProducts from "../homepage/AllProducts";
import Hero from "../homepage/Hero";
import NewsLetter from "../homepage/NewsLetter";
import TrustStats from "../homepage/TrustStats";
import TrustStrip from "../homepage/TrustStrip";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { useEffect, useState } from "react";
import productApi from "../services/product.service"


const HomePage = () => {
  const [products, setProducts] = useState([])
  const fetchProducts = async() => {
    const response = await productApi.getProductApi()
    setProducts(response.data.allProducts)
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <div className="min-h-screen bg-[#fffbf5]">
      <Navbar cartCount={3} />
      <Hero />
      <TrustStrip />
      <AllProducts products={products} fetchProducts={fetchProducts}/>
      <TrustStats />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default HomePage