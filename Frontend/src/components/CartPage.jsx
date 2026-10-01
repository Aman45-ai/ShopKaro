import { ChevronRight } from "lucide-react";
import Navbar from "../layout/Navbar";
import CartItem from "../cart/CartItem";
import OrderSummary from "../cart/OrderSummary";
import ProductCard from "../cart/ProductCard";



const sampleCartItems = [
  {
    id: 1,
    name: "Modern Table Lamp",
    category: "Home Decor",
    variant: "Minimalist Design",
    price: 1299,
    quantity: 1,
    inStock: true,
    imageUrl: "",
  },
  {
    id: 2,
    name: "Ceramic Coffee Mug Set",
    category: "Kitchen & Dining",
    variant: "Set of 2",
    price: 599,
    quantity: 2,
    inStock: true,
    imageUrl: "",
  },
  {
    id: 3,
    name: "Indoor Plant Pot",
    category: "Home Decor",
    variant: "Ceramic Pot",
    price: 399,
    quantity: 1,
    inStock: true,
    imageUrl: "",
  },
];

const recommendedProducts = [
  { name: "Ambient Desk Lamp", price: "1,499", imageUrl: "" },
  { name: "Decorative Vase", price: "899", imageUrl: "" },
  { name: "Ceramic Bowl Set", price: "799", imageUrl: "" },
  { name: "Plant Pot with Stand", price: "549", imageUrl: "" },
  { name: "Scented Candle", price: "449", imageUrl: "" },
  { name: "Minimal Mug", price: "349", imageUrl: "" },
];

const CartPage = () => {
  const subtotal = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-1.5 text-sm text-neutral-500">
          <a href="#" className="hover:text-neutral-800">
            Home
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-neutral-900">Cart</span>
        </div>

        {/* Heading */}
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Shopping Cart</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Review your items and proceed to checkout
            </p>
          </div>
          <p className="text-sm text-neutral-500">{sampleCartItems.length} items</p>
        </div>

        {/* Cart items + order summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-4">
            {sampleCartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>

          <OrderSummary itemCount={sampleCartItems.length} subtotal={subtotal} discount={100} shipping={40} />
        </div>

        {/* Recommendations */}
        <div className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">You might also like</h2>
              <p className="text-sm text-neutral-500">Based on your cart items</p>
            </div>
            <a href="#" className="flex items-center gap-1 text-sm font-medium text-emerald-800">
              View All
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {recommendedProducts.map((product, i) => (
              <ProductCard key={product.name ?? i} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage