import { Heart, ShoppingCart } from "lucide-react"

const ProductCard = ({ name, price, imageUrl }) => {
    return (
        <div className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="relative aspect-square overflow-hidden bg-[#F3EEE7]">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                        No Image
                    </div>
                )}

                <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur-sm transition hover:text-red-500">
                    <Heart className="h-4 w-4" />
                </button>
            </div>

            <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-neutral-900">
                    {name}
                </h3>

                <p className="mt-1 text-base font-bold text-neutral-900">
                    ₹{price}
                </p>

                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-800 px-3 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-800 hover:text-white">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard