import { Minus, Plus, Trash2 } from "lucide-react";

/**
 * CartItem
 * Purely presentational — wire up state/handlers yourself.
 * Props:
 * - imageUrl, name, category, variant (string) - variant e.g. "Set of 2", "Ceramic Pot"
 * - price (number) - unit price
 * - quantity (number)
 * - inStock (boolean)
 * - onIncrease / onDecrease / onRemove (fn) - optional, no-op by default
 */
const CartItem = ({
  imageUrl = "",
  name = "Product name",
  category = "",
  variant = "",
  price = 0,
  quantity = 1,
  inStock = true,
  onIncrease = () => {},
  onDecrease = () => {},
  onRemove = () => {},
}) => {
  const lineTotal = price * quantity;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] text-neutral-400">
            Image
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-neutral-900">{name}</h3>
        <p className="truncate text-sm text-neutral-500">
          {category}
          {category && variant && " • "}
          {variant}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-bold text-neutral-900">₹{price}</span>
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              inStock ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                inStock ? "bg-emerald-600" : "bg-red-500"
              }`}
            />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 rounded-md border border-neutral-300">
        <button
          type="button"
          onClick={onDecrease}
          aria-label="Decrease quantity"
          className="flex h-9 w-9 items-center justify-center text-neutral-600"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-8 text-center text-sm font-medium text-neutral-900">{quantity}</span>
        <button
          type="button"
          onClick={onIncrease}
          aria-label="Increase quantity"
          className="flex h-9 w-9 items-center justify-center text-neutral-600"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove item"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-300 text-neutral-500 hover:border-red-300 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <p className="w-20 shrink-0 text-right text-base font-bold text-neutral-900">
        ₹{lineTotal}
      </p>
    </div>
  );
}

export default CartItem