import { Quote, Star, BadgeCheck } from "lucide-react";

 const TrustStats = ({
  eyebrow = "Our Customers",
  title = (
    <>
      Trusted by Thousands
      <br />
      Across <span className="text-amber-500">India</span>
    </>
  ),
  subtitle = "Real experiences from real customers.",
  testimonial = {
    quote:
      "Amazing quality and super fast delivery! I was a bit hesitant at first, but ShopKaro really exceeded my expectations.",
    name: "Priya Sharma",
    isVerified: true,
    avatarUrl: "",
  },
  stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "4.6", label: "Average Rating" },
    { value: "10K+", label: "Verified Products" },
    { value: "99%", label: "Positive Reviews" },
  ],
}) => {
  return (
    <section className="bg-[#FAF7F2] py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr_1fr] lg:px-8">
 
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <Quote className="mb-3 h-5 w-5 text-emerald-800" />
          <p className="text-sm italic text-neutral-700">"{testimonial.quote}"</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-neutral-200">
              {testimonial.avatarUrl && (
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
                {testimonial.name}
                {testimonial.isVerified && (
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-700" />
                )}
              </p>
              <p className="text-xs text-neutral-500">Verified Buyer</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center sm:text-left">
              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-neutral-900 sm:justify-start">
                {value}
                {label === "Average Rating" && (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </p>
              <p className="text-xs text-neutral-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStats