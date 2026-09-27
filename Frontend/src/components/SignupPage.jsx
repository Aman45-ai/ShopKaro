import { ShoppingBag, Heart, Package, ShieldCheck } from "lucide-react";
import AuthSidePanel from "../signup/AuthSidePanel"
import TrustStrip from "../homepage/TrustStrip"
import SignupForm from "../signup/SignupForm"
import { useNavigate } from "react-router-dom"

const signupBenefits = [
    {
        icon: ShoppingBag,
        title: "Access to Exclusive Deals",
        subtitle: "Be the first to know about new arrivals and special offers",
    },
    {
        icon: Heart,
        title: "Personalized Recommendations",
        subtitle: "Curated just for you",
    },
    {
        icon: Package,
        title: "Track Orders Easily",
        subtitle: "Stay updated at every step",
    },
    {
        icon: ShieldCheck,
        title: "A Safer Shopping Experience",
        subtitle: "Shop from verified and trusted sellers",
    },
]

const signupStats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "10K+", label: "Verified Products" },
    { value: "4.6", label: "Average Rating" },
    { value: "99%", label: "Positive Reviews" },
];

const SignupPage = () => {
    const navigate = useNavigate()
    const onLoginClick = () => {
        navigate('/login')
    }
    return (
        <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center p-4 md:p-8">
            <div className="w-full max-w-7xl mx-auto shadow-2xl lg:rounded-2xl overflow-hidden my-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] items-stretch">

                    <div className="bg-[#121212] flex flex-col justify-between h-full">
                        <AuthSidePanel
                            eyebrow="Join ShopKaro"
                            title={
                                <>
                                    Create Your
                                    <br />
                                    Account <span className="text-amber-400">Today</span>
                                </>
                            }
                            subtitle="Start shopping from trusted sellers across India and enjoy a safer, smarter, and more personalized shopping experience."
                            benefits={signupBenefits}
                            stats={signupStats}
                        />
                    </div>

                    <div className="flex flex-col justify-between bg-[#FAF7F2] h-full">
                        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
                            <SignupForm onLoginClick={onLoginClick}/>
                        </div>
                        <TrustStrip />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignupPage;
