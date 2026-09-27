import { Heart, Pen, ShoppingCart, Trash, X, Save, ImagePlus } from "lucide-react";
import { useState } from "react";
import productApi from "../services/product.service";
import { toast } from "sonner";

const AllProducts = ({ products,fetchProducts }) => {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    price: "",
    image: null
  })
  const [previewImage, setPreviewImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const startEditing = (product) => {
    setEditingId(product._id)
    setEditData({
      title: product.title,
      description: product.description,
      price: product.price,
      image: null
    })
    setPreviewImage(`http://localhost:3000/${product.image}`)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditData({
      title: "",
      description: "",
      price: "",
      image: null
    })
    setPreviewImage("")
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setEditData({
        ...editData,
        image: file
      })
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setEditData({
      ...editData,
      [name]: value
    })
  }

  const handleSave = async (id) => {
    try {
      setIsLoading(true)

      const formData = new FormData()

      formData.append("title", editData.title)
      formData.append("description", editData.description)
      formData.append("price", editData.price)

      if (editData.image) {
        formData.append("image", editData.image)
      }

      const response = await productApi.editProductApi(formData, id)

      toast.success(response.data.message || "Product updated successfully")

      setEditingId(null)
      setEditData({
        title: "",
        description: "",
        price: "",
        image: null
      })
      setPreviewImage("")

      window.location.reload()
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.response?.data ||
        "Something went wrong!"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
            All Products
          </h2>
          <p className="text-sm text-neutral-500">
            Everything you need at one place.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex w-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white"
          >
            {editingId === product._id ? (
              <div className="flex flex-col gap-4 p-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={editData.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-400">
                      <ImagePlus className="h-8 w-8" />
                    </div>
                  )}

                  <label className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1 rounded-md bg-white px-2 py-1.5 text-xs font-medium text-neutral-700 shadow">
                    <ImagePlus className="h-3.5 w-3.5" />
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-neutral-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-neutral-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full resize-none rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-neutral-700">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleChange}
                      className="w-full rounded-md border border-neutral-300 py-2 pl-7 pr-3 text-sm outline-none focus:border-emerald-800"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="flex w-1/2 items-center justify-center gap-1 rounded-md border border-neutral-300 py-2 text-xs font-medium text-neutral-700 transition hover:border-red-700 hover:text-red-700"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSave(product._id)}
                    className="flex w-1/2 items-center justify-center gap-1 rounded-md bg-emerald-800 py-2 text-xs font-medium text-white transition hover:bg-emerald-900 disabled:opacity-60"
                  >
                    <Save className="h-3.5 w-3.5" />
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative aspect-square w-full bg-neutral-100">
                  {product.image ? (
                    <img
                      src={`http://localhost:3000/${product.image}`}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                      Image placeholder
                    </div>
                  )}

                  <button
                    type="button"
                    aria-label="Toggle wishlist"
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
                  >
                    <Heart className="h-3.5 w-3.5 text-neutral-500" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-1 p-3">
                  <h3 className="truncate text-sm font-semibold text-neutral-900">
                    {product.title}
                  </h3>

                  <p className="line-clamp-2 text-xs text-neutral-500">
                    {product.description}
                  </p>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base font-bold text-neutral-900">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="flex w-full items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEditing(product)}
                      className="mt-2 flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-300 py-2 text-xs font-medium text-neutral-700 transition hover:border-emerald-800 hover:text-emerald-800"
                    >
                      <Pen className="h-3.5 w-3.5" />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="mt-2 flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-300 py-2 text-xs font-medium text-neutral-700 transition hover:border-red-800 hover:text-red-800"
                      onClick={async () => {
                        try {
                          const response = await productApi.deleteProductApi(product._id)
                          await fetchProducts()
                          toast.success(response.data.message)
                        } catch (error) {
                          toast.error(error.response?.data?.message || "Something went wrong!")
                        }
                      }}
                    >
                      <Trash className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default AllProducts