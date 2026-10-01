import { Lock, Truck, ShieldCheck, PackageCheck } from "lucide-react";

/**
 * OrderSummary
 * Purely presentational — wire up state/handlers yourself.
 * Props:
 * - itemCount (number)
 * - subtotal / discount / shipping (number)
 * - onCheckout / onContinueShopping (fn) - optional, no-op by default
 */
const OrderSummary = ({
  itemCount = 0,
  subtotal = 0,
  discount = 0,
  shipping = 0,
  onCheckout = () => {},
  onContinueShopping = () => {},
}) => {
  const total = subtotal - discount + shipping;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="text-xl font-bold text-neutral-900">Order Summary</h2>

      <div className="mt-4 flex flex-col gap-3 border-b border-neutral-100 pb-4 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal ({itemCount} items)</span>
          <span className="font-medium text-neutral-900">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Discount</span>
          <span className="font-medium text-emerald-700">- ₹{discount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span className="font-medium text-neutral-900">₹{shipping.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <span className="text-lg font-bold text-neutral-900">Total</span>
        <span className="text-2xl font-bold text-neutral-900">₹{total.toLocaleString()}</span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-800 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        <Lock className="h-4 w-4" />
        Proceed to Checkout
        <span aria-hidden>→</span>
      </button>

      <button
        type="button"
        onClick={onContinueShopping}
        className="mt-3 w-full rounded-md border border-neutral-300 py-3 text-sm font-medium text-neutral-700"
      >
        Continue Shopping
      </button>

      <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <Truck className="h-5 w-5 text-emerald-800" />
          <p className="text-xs font-medium text-neutral-700">Free Shipping</p>
          <p className="text-[11px] text-neutral-400">On orders above ₹499</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="h-5 w-5 text-emerald-800" />
          <p className="text-xs font-medium text-neutral-700">Secure Payment</p>
          <p className="text-[11px] text-neutral-400">Your data is safe</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <PackageCheck className="h-5 w-5 text-emerald-800" />
          <p className="text-xs font-medium text-neutral-700">Easy Returns</p>
          <p className="text-[11px] text-neutral-400">7 days return policy</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary