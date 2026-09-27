import { ShieldCheck, RefreshCcw, BadgeCheck, Truck } from "lucide-react";

const defaultItems = [
  { icon: ShieldCheck, title: "Secure Payments", subtitle: "100% safe & encrypted" },
  { icon: RefreshCcw, title: "Easy Returns", subtitle: "Hassle-free within 7 days" },
  { icon: BadgeCheck, title: "Verified Sellers", subtitle: "Quality you can trust" },
  { icon: Truck, title: "Fast Delivery", subtitle: "Across India" },
];

const TrustStrip = ({ items = defaultItems }) => {
  return (
    <section className="border-b border-neutral-200 bg-[#FAF7F2]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-800/10 text-emerald-800">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-900">{title}</p>
              <p className="truncate text-xs text-neutral-500">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustStrip