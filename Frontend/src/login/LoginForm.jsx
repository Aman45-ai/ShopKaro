import { Mail, Lock, Eye, ArrowRight } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithubSquare } from "react-icons/fa"
import { toast } from "sonner"
import authApi from '../services/auth.service.js'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext.jsx";


const LoginForm = ({
  title = "Login to Your Account",
  subtitle = "Welcome back! Enter your credentials to continue with ShopKaro.",
  onGoogleClick = () => { },
  onGithubClick = () => { },
  onSignUpClick = () => { },
  showSocialLogin = true,
}) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  })
  const [isLoading, setIsLoading] = useState(false)
  const{setAccessToken} = useContext(AuthContext)

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const response = await authApi.loginApi(data)
      toast.success(response.data.message)
      const token = response.data.accessToken
      setAccessToken(token)
      localStorage.setItem("accessToken", token)
      reset()
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data || "Something went wrong!")
    } finally {
      setIsLoading(false)

    }
  }
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-800">
            Email Address
          </label>
          <div className="flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3">
            <Mail className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-neutral-400"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required!"
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email!"
                }
              })}
            />
          </div>
          {errors.email && <p className="text-red-700 font-semibold">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-800">
            Password
          </label>
          <div className="flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3">
            <Lock className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-neutral-400"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required!"
                }
              })}
            />
            <button type="button" aria-label="Toggle password visibility">
              <Eye className="h-4 w-4 shrink-0 text-neutral-400" />
            </button>
          </div>
          {errors.password && <p className="text-red-700 font-semibold">{errors.password.message}</p>}
          <div className="mt-2 text-right">
            <a href="#" className="text-xs font-medium text-emerald-800">
              Forgot Password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className={`flex items-center justify-center   gap-2 rounded-md bg-emerald-800 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
          disabled={isLoading}
        >
          {isLoading ? "Logging In" : "Login"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {showSocialLogin && (
        <>
          <div className="my-6 flex items-center gap-3 text-xs text-neutral-400">
            <span className="h-px flex-1 bg-neutral-200" />
            or continue with
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onGoogleClick}
              className="flex items-center justify-center gap-2 rounded-md border border-neutral-300 py-2.5 text-sm font-medium text-neutral-700 opacity-50 cursor-not-allowed pointer-events-none"            >
              <span aria-hidden>🇬</span>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={onGithubClick}
              className="flex items-center justify-center gap-2 rounded-md border border-neutral-300 py-2.5 text-sm font-medium text-neutral-700 opacity-50 cursor-not-allowed pointer-events-none"
            >
              <FaGithubSquare className="h-4 w-4" />
              Continue with GitHub
            </button>
          </div>
        </>
      )}

      <p className="mt-6 text-center text-sm text-neutral-500">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUpClick}
          className="font-semibold text-emerald-800 underline underline-offset-2 cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default LoginForm