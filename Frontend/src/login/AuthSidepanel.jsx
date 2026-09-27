import { ShieldCheck, Package, Heart, Headphones } from "lucide-react";
import auth from '../assets/auth.png'

const defaultBenefits = [
  { icon: ShieldCheck, title: "Secure & Safe", subtitle: "Your data is always protected" },
  { icon: Package, title: "Easy Order Tracking", subtitle: "Stay updated, always" },
  { icon: Heart, title: "Personalized Experience", subtitle: "Recommendations just for you" },
  { icon: Headphones, title: "Dedicated Support", subtitle: "We're here to help" },
]

const loginStats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "10K+", label: "Verified Products" },
    { value: "4.6", label: "Average Rating" },
    { value: "99%", label: "Positive Reviews" },
];

const AuthSidepanel = ({
  eyebrow = "Trusted · Quality · For a Better Tomorrow",
  title = (
    <>
      Welcome Back
      <br />
      to <span className="text-amber-400">ShopKaro</span>
    </>
  ),
  subtitle = "Access your account to continue shopping, manage your orders, and explore exclusive deals just for you.",
  imageUrl = auth,
  benefits = defaultBenefits,
  footerNote = "More Than Just Shopping.",
  stats = loginStats,
}) => {
  return (
    <div className="relative hidden overflow-hidden bg-neutral-900 lg:block">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="ShopKaro package on a desk"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-r from-neutral-900/95 via-neutral-900/60 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col justify-center px-10 py-16 xl:px-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-amber-400/90">
            {eyebrow}
          </p>
          <h1 className="max-w-md text-4xl font-bold leading-tight text-white xl:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-sm text-sm text-neutral-300">{subtitle}</p>

          <ul className="mt-8 flex flex-col gap-5">
            {benefits.map(({ icon: Icon, title: t, subtitle: s }) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-400/40 text-amber-400">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t}</p>
                  <p className="text-xs text-neutral-400">{s}</p>
                </div>
              </li>
            ))}
          </ul>

          {footerNote && (
            <p className="mt-10 max-w-40 -rotate-2deg text-sm italic text-neutral-400">
              {footerNote}
            </p>
          )}
        </div>

        {stats.length > 0 && (
          <div className="grid shrink-0 grid-cols-2 gap-4 border-t border-white/10 bg-black/30 px-10 py-6 sm:grid-cols-4 xl:px-16">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="flex items-center gap-1 text-2xl font-bold text-white">
                  {value}
                  {label === "Average Rating" && (
                    <span className="text-amber-400">★</span>
                  )}
                </p>
                <p className="text-xs text-neutral-400">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthSidepanel