import { Eye, Heart } from "lucide-react";

const LivePreviewCard = ({
  image,
  title,
  price,
  description,
}) => {
  return (
    <div className="rounded-xl border border-emerald-800/15 bg-emerald-800/5 p-6">
      <div className="mb-4 flex items-center gap-2 text-emerald-800">
        <Eye className="h-4 w-4" />
        <p className="text-sm font-semibold">Live Preview</p>
      </div>
      <p className="mb-4 text-xs text-neutral-500">
        This is how your product will appear on the product listing page.
      </p>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="relative aspect-4/3 w-full bg-neutral-100">
          {image ? (
            <img src={image} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
              Image placeholder
            </div>
          )}
          <button
            type="button"
            aria-label="Wishlist"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90"
          >
            <Heart className="h-4 w-4 text-neutral-500" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-neutral-900">{title||"Title"}</h3>
          <p className="mt-1 text-base font-bold text-neutral-900">₹{price||0}</p>
          <p className="mt-2 text-sm text-neutral-500">{description||"This is a short preview of your product description. It will appear like this on the product listing page."}</p>
        </div>
      </div>
    </div>
  );
}

export default LivePreviewCard