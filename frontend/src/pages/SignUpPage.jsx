import { useState } from "react";
import InputField from "../components/InputField";
import RadioButton from "../components/RadioButton";
import { Link, useNavigate } from "react-router-dom";
import usePasswordStrength from "../custom hooks/usePasswordStrength";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations/user.mutation";
import { toast } from "react-hot-toast";
function SignUpPage() {
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });
  const [signup, { loading, error }] = useMutation(SIGN_UP,{
    refetchQueries:['getAuthenticatedUser']
  });






  const { password, strength, handlePasswordChange } = usePasswordStrength();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setSignupData((prev) => ({
        ...prev,
        gender: value,
      }));
    } else {
      setSignupData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "password") {
        handlePasswordChange(value);
      }
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case "Very Strong":
        return "text-green-800";
      case "Strong":
        return "text-green-600";
      case "Moderate":
        return "text-orange-600";
      case "Weak":
        return "text-red-600";
      case "Very Weak":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup({
        variables:{
          input:signupData
        }
      
      })

    
      setSignupData({
        name: "",
        username: "",
        password: "",})
  
        toast.success("Sign up successful")
    } catch (error) {
      console.log(`error`, error);
      toast.error(error.message)
      
    }
  };



  return (
    <div className="my-0 mx-auto flex justify-center py-6 h-screen items-center">
      <div className="h-[550px] w-[350px] bg-slate-100 z-10 rounded-md">
        <div className="text-gray-500 text-center ">
          <h1 className="text-4xl text-gray-800 font-semibold  py-4">
            Sign Up
          </h1>
          <p>Join to keep track of yout expense</p>
        </div>
        <div className="px-6 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 relative">
              <InputField
                label={"Full Name"}
                id={"name"}
                name={"name"}
                value={signupData.name}
                onChange={handleChange}
                required={"required"}
              />
              <InputField
                label={"Username"}
                id={"username"}
                name={"username"}
                value={signupData.username}
                type="text"
                onChange={handleChange}
                required={"required"}
              />
              <InputField
                label={"Password"}
                id={"password"}
                name={"password"}
                value={signupData.password}
                type={"password"}
                onChange={handleChange}
              />
              {signupData.password && (
                <div className="absolute bottom-[241px] right-0 mt-2 text-black">
                  <p className="text-[12px]">
                    Strength:{" "}
                    <span
                      className={`font-semibold text-[12px] ${getStrengthColor(
                        strength
                      )}`}
                    >
                      {strength}
                    </span>
                  </p>
                </div>
              )}

              <div className="flex gap-10">
                <RadioButton
                  label={"Male"}
                  id={"male"}
                  name={"gender"}
                  value={"male"}
                  checked={signupData.gender === "male"}
                  onChange={handleChange}
                />
                <RadioButton
                  label={"Female"}
                  id={"female"}
                  name={"gender"}
                  value={"female"}
                  checked={signupData.gender === "female"}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-black hover:bg-gray-900 active:bg-black py-3 rounded-md"
                >
                  {loading ? "loading" : "Sign Up"}
                </button>
              </div>

              <div className="text-center mb-4">
                <span className="text-gray-500">
                  Already have an account?{" "}
                  <span className="hover:underline text-gray-800">
                    <Link to={"/login"}> Login here</Link>
                  </span>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
