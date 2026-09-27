import { Mail } from "lucide-react";

const NewsLetter = ({
  eyebrow = "Stay Updated",
  title = "Get the Best Deals First",
  subtitle = "Subscribe to our newsletter and never miss an update.",
  onSubmit = (e) => e.preventDefault(),
}) => {
  return (
    <section className="bg-emerald-900 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-amber-400/90">
            {eyebrow}
          </p>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-emerald-100/80">{subtitle}</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-md items-center overflow-hidden rounded-md bg-white"
        >
          <Mail className="ml-3 h-4 w-4 shrink-0 text-neutral-400" />
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-3 py-3 text-sm outline-none placeholder:text-neutral-400"
          />
          <button
            type="submit"
            className="shrink-0 bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-400"
          >
            Subscribe →
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewsLetter