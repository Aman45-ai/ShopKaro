import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, ChevronDown, User, Settings, LogOut } from "lucide-react"
import authApi from "../services/auth.service"

const navLinks = [
  { label: "Home", to: "/" },
  // { label: "All Products", to: "/products" },
  { label: "Add Product", to: "/add-product" },
  // { label: "My Products", to: "/my-products" },
  // { label: "Orders", to: "/orders" },
]



const navLinkClass = ({ isActive }) =>
  isActive
    ? "rounded-full bg-emerald-800/10 px-3 py-1.5 font-semibold text-emerald-800"
    : "px-3 py-1.5 text-neutral-500 hover:text-neutral-800";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await authApi.getMeApi()
        setUser(response.data.user);
      } catch (error) {
        setUser(null)
      }
    }

    getUser()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  const handleLogout = async () => {
    try {
      await authApi.logoutApi()
    } catch (error) {
      console.log("Logout failed", error)
    } finally {
      localStorage.removeItem("accessToken")
      setUser(null)
      setMenuOpen(false)
      navigate("/login")
    }
  }

  return (
    <header className="w-full border-b border-neutral-200 bg-[#FAF7F2]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              Shop<span className="text-emerald-800">Karo</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
              Sell · Manage · Grow
            </span>
          </span>
        </Link>

        <div className="order-3 hidden w-full flex-1 md:order-0 md:flex md:w-auto">
          <div className="flex w-full max-w-md items-center rounded-md border border-neutral-300 bg-white px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products, brands and more..."
              className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-2 text-sm font-medium lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          {/* <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-neutral-700" />
          </Link> */}

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-1.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-sm font-semibold text-white">
                {user?.name?.charAt(0).toUpperCase() ?? "A"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-not-allowed pointer-events-none opacity-50"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-not-allowed pointer-events-none opacity-50"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 border-t border-neutral-100 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar