import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "../assets/hero1.png"
const Hero = ({
  eyebrow = "Quality Products · Trusted Sellers · Better Everyday",
  title = (
    <>
      Everyday Essentials
      <br />
      for a <span className="text-amber-500">Better You</span>
    </>
  ),
  subtitle = "Discover quality products from trusted sellers across India. Shop with confidence, easy returns, and secure payments.",
  imageUrl = hero1,
  onPrev = () => {},
  onNext = () => {},
}) => {
  return (
    <section className="relative overflow-hidden bg-neutral-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-0">

        <div className="relative z-10 lg:py-20">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-amber-400/90 sm:text-sm">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-sm text-neutral-300 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="relative h-64 w-full overflow-hidden rounded-xl sm:h-80 lg:h-105 lg:rounded-none">
            <img
              src={imageUrl}
              alt="Featured lifestyle products"
              className="h-full w-full object-contain py-5"
            />
          </div>
        </div>
    </section>
  );
}

export default Hero