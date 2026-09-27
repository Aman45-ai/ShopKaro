

const defaultColumns = [
  { title: "Shop", links: ["All Products", "New Arrivals", "Top Rated", "Deal of the Day"] },
  { title: "Help", links: ["Track Your Order", "Returns & Refunds", "Shipping Info", "FAQs"] },
  { title: "About", links: ["Our Story", "Become a Seller", "Careers", "Blog"] },
  { title: "Policies", links: ["Privacy Policy", "Terms & Conditions", "Cancellation Policy", "Sitemap"] },
];

const Footer = ({
  columns = defaultColumns,
  paymentMethods = ["UPI", "VISA", "Mastercard", "RuPay", "Paytm"],
}) => {
  return (
    <footer className="border-t border-neutral-200 bg-[#FAF7F2] pt-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 pb-8 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">

        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <span className="text-lg font-bold text-neutral-900">
              Shop<span className="text-emerald-800">Karo</span>
            </span>
          </div>
          <p className="mt-2 max-w-xs text-sm text-neutral-500">
            Your trusted online store for quality products from verified sellers across India.
          </p>
          
        </div>

        {columns.map(({ title, links }) => (
          <div key={title}>
            <p className="mb-3 text-sm font-semibold text-neutral-900">{title}</p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-neutral-500 hover:text-neutral-800">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-3 text-sm font-semibold text-neutral-900">Secure Payments</p>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-medium text-neutral-600"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-neutral-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 ShopKaro. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer