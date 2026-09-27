import { useNavigate } from "react-router-dom";
import TrustStrip from "../homepage/TrustStrip";
import AuthSidepanel from "../login/AuthSidepanel";
import LoginForm from "../login/LoginForm";


const LoginPage = () => {
  const navigate = useNavigate()
  const onSignUpClick = () => {
    navigate("/signup")
  }
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto shadow-2xl lg:rounded-2xl overflow-hidden my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] items-stretch">
          <div className="bg-[#121212] flex flex-col justify-between h-full">
            <AuthSidepanel />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
              <LoginForm onSignUpClick={onSignUpClick} />
            </div>
            <TrustStrip />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage