import { ChevronRight } from "lucide-react";
import AddProductForm from "../addProductPage/AddProductForm";
import LivePreviewCard from "../addProductPage/LivePreviewCard";
import Navbar from "../layout/Navbar.jsx"
import { useState } from "react";


const AddProductPage = () => {
  const [price,setPrice] = useState("")
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState("")
  return (
    <div className="min-h-screen bg-[#efefef]">
      <Navbar variant="dashboard" cartCount={3} activeLink="Add Product" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center gap-1.5 text-sm text-neutral-500">
          <a href="#" className="hover:text-neutral-800">
            Home
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-neutral-900">Add Product</span>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Add New Product</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Fill in the details below to list your product on ShopKaro.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <AddProductForm setPrice={setPrice} setDescription={setDescription} setTitle={setTitle} setImage={setImage}/>
          <LivePreviewCard price={price} description={description} title={title} image={image} />
        </div>
      </div>
    </div>
  );
}

export default AddProductPage