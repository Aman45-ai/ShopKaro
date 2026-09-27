import { Tag, FileText, IndianRupee, UploadCloud } from "lucide-react";
import { useForm } from 'react-hook-form'
import productApi from "../services/product.service"
import { toast } from "sonner";
import { useState } from "react";

const AddProductForm = ({
  setPrice,
  setDescription,
  setTitle,
  setImage,
  onCancel = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  })

  const imageField = register("image", {
    required: {
      value: true,
      message: "Image is required"
    }
  })

  const titleField = register('title', {
    required: {
      value: true,
      message: "Product Title is required!"
    },
    minLength: {
      value: 3,
      message: "Product title must be atleast 3 characters long!"
    }
  })

  const descriptionField = register('description', {
    required: {
      value: true,
      message: "Product Description is required!"
    },
    minLength: {
      value: 20,
      message: "Product Description must be atleast 20 characters long!"
    }
  })

  const priceField = register('price', {
    required: {
      value: true,
      message: "Price is required!"
    },
    pattern: {
      value: /^[1-9]\d*$/,
      message: "Price must be an Integer and Greater than 0!"
    }
  })

  const onSubmit = async(data) => {
    try {
      console.log(data)
      setIsLoading(true)
      const formData = new FormData()
      formData.append("image",data.image[0])
      formData.append("title",data.title)
      formData.append("description",data.description)
      formData.append("price",data.price)
      const response = await productApi.createProductApi(formData)
      toast.success(response.data.message)
      reset()
    }catch(error){
      toast.error(error.response?.data?.message || error.response?.data || "Something went wrong!")
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-xl border border-neutral-200 bg-white p-6"
    >
      <div>
        <p className="text-sm font-semibold text-neutral-900">Product Image</p>
        <p className="mb-3 text-xs text-neutral-500">Upload a clear and attractive image of your product</p>
        <div className="relative flex items-start gap-4">
          <input
            type="file"
            id="image"
            accept="image/*"
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            {...imageField}
            onChange={(e)=>{
              imageField.onChange(e)
              const file = e.target.files[0]
              if(file){
                const url = URL.createObjectURL(file)
                setImage(url)
              }
            }}
          />
          <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-8 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800/10 text-emerald-800">
              <UploadCloud className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-neutral-800">Drag & drop an image here</span>
            <span className="text-xs text-neutral-500">or click to browse</span>
          </div>
        </div>
        {errors.image && <p className="text-red-600 font-semibold">{errors.image.message}</p>}
      </div>

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-neutral-900">
          Product Title
        </label>
        <div className="flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3">
          <Tag className="h-4 w-4 shrink-0 text-neutral-400" />
          <input
            {...titleField}
            id="title"
            type="text"
            maxLength={100}
            placeholder="Enter product title"
            className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-neutral-400"
            onChange={(e)=>{
              titleField.onChange(e)
              setTitle(e.target.value)
            }}
          />
        </div>
        {errors.title && <p className="text-red-600 font-semibold">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-neutral-900">
          Product Description
        </label>
        <div className="flex items-start rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2.5">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
          <textarea
            {...descriptionField}
            id="description"
            rows={4}
            maxLength={500}
            placeholder="Describe your product in detail..."
            className="w-full resize-none bg-transparent px-2 text-sm outline-none placeholder:text-neutral-400"
            onChange={(e)=>{
              descriptionField.onChange(e)
              setDescription(e.target.value)
            }}
          />
        </div>
        {errors.description && <p className="text-red-600 font-semibold">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="mb-1.5 block text-sm font-semibold text-neutral-900">
          Price (₹)
        </label>
        <div className="flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3">
          <IndianRupee className="h-4 w-4 shrink-0 text-neutral-400" />
          <input
            {...priceField}
            id="price"
            type="number"
            min="0"
            placeholder="Enter product price"
            className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-neutral-400"
            onChange={(e)=>{
              priceField.onChange(e)
              setPrice(e.target.value)
            }}
          />
        </div>
        {errors.price && <p className="text-red-600 font-semibold">{errors.price.message}</p>}
      </div>

      <div className="flex justify-end gap-3 border-t border-neutral-100 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`flex items-center gap-2 rounded-md bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 ${isLoading?"opacity-60 cursor-not-allowed":"opacity-100 cursor-pointer"}`}
          disabled={isLoading}
        >
          {isLoading?"🛍️ Adding Product":"🛍️ Add Product"}
        </button>
      </div>
    </form>
  );
}

export default AddProductForm