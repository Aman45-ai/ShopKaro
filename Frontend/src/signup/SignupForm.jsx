import { User, Mail, Lock, Eye, ArrowRight } from "lucide-react"
import { FaGithubSquare } from "react-icons/fa"
import { useForm } from 'react-hook-form'
import authApi from "../services/auth.service"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"



const SignupForm = ({
  title = "Create Your Account",
  subtitle = "Join ShopKaro and start your shopping journey today.",
  onGoogleClick = () => { },
  onGithubClick = () => { },
  onLoginClick = () => { },
  showSocialSignup = true,
}) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  })
  const [isLoading, setIsLoading] = useState(false)
  const password = watch("password")

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const response = await authApi.signupApi(data)
      toast.success(response.data.message)
      reset()
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data || "Something went wrong!")
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        </div>
        <p className="shrink-0 text-right text-xs text-neutral-500">
          Already have an account?
          <br />
          <button
            type="button"
            onClick={onLoginClick}
            className="font-semibold text-emerald-800 underline underline-offset-2 cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-neutral-800">
            Full Name
          </label>
          <div className="flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3">
            <User className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-neutral-400"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required!"
                },
                minLength: {
                  value: 3,
                  message: "Name must atleast 3 characters long!"
                }
              })}
            />
          </div>
          {errors.name && <p className="text-red-700 font-semibold">{errors.name.message}</p>}
        </div>

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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-800">
              Password
            </label>
            <div className="flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3">
              <Lock className="h-4 w-4 shrink-0 text-neutral-400" />
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-neutral-400"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required!"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, 1 number and 1 special character"
                  }
                })}
              />
              <button type="button" aria-label="Toggle password visibility">
                <Eye className="h-4 w-4 shrink-0 text-neutral-400" />
              </button>
            </div>
            {errors.password && <p className="text-red-700 font-semibold">{errors.password.message}</p>}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-neutral-800"
            >
              Confirm Password
            </label>
            <div className="flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3">
              <Lock className="h-4 w-4 shrink-0 text-neutral-400" />
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-neutral-400"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm-Password is required!"
                  }
                  ,
                  validate: value => value === password || "Passwords do not match"
                })}
              />
              <button type="button" aria-label="Toggle password visibility">
                <Eye className="h-4 w-4 shrink-0 text-neutral-400" />
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-700 font-semibold">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            defaultChecked
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 text-emerald-800"
          />
          <span>
            I agree to ShopKaro's{" "}
            <a href="#" className="font-medium text-emerald-800 underline underline-offset-2">
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-emerald-800 underline underline-offset-2">
              Privacy Policy
            </a>
          </span>
        </label>

        <button
          type="submit"
          className={`flex items-center justify-center gap-2 rounded-md bg-emerald-800 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} `}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account" : "Create Account"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {showSocialSignup && (
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
              className="flex items-center justify-center gap-2 rounded-md border border-neutral-300 py-2.5 text-sm font-medium text-neutral-700 opacity-50 cursor-not-allowed pointer-events-none"            >
              <FaGithubSquare className="h-4 w-4" />
              Continue with GitHub
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SignupForm