import  { useState } from "react";
import InputField from "../components/InputField";
import RadioButton from "../components/RadioButton";
import { Link } from 'react-router-dom';
import usePasswordStrength from "../custom hooks/usePasswordStrength";
function SignUpPage() {
	const [signupData,setSignupData] = useState({
		name:"",
		username:"",
		password:"",
		gender:""
		
	})
const {password,strength,handlePasswordChange} = usePasswordStrength()
  const [error,setError] = useState({})

	const handleChange = (e)=>{
		const {name,value,type} = e.target;
		if(type==='radio'){
			setSignupData((prev)=>({
				...prev,
				gender:value
			}))
		}else{
			setSignupData((prev)=>({
				...prev,
				[name]:value
			}))

      if (name === 'password') {
        handlePasswordChange(value);
      }
		}

    

	}
  
  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Very Strong':
        return 'text-green-800';
      case 'Strong':
        return 'text-green-600';
      case 'Moderate':
        return 'text-orange-600';
      case 'Weak':
        return 'text-red-600';
      case 'Very Weak':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const validate = () =>{
    const newError = {}
    if(!signupData.name) newError.name = "Full name is required."
    
    if(!signupData.username)  newError.username = "User name is required"
  
    if (!signupData.password) newError.password = "Password is required.";
    if (signupData.password && signupData.password.length < 6) newError.password = "Password must be at least 6 characters long.";
  
   


    if (!signupData.gender) newError.gender = "Gender is required.";
    return newError
  
  }

	const handleSubmit = async(e)=>{
		e.preventDefault()
    const newError = validate();
    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {

		console.log(signupData);
  }
	}
  return (
    <div className="my-0 mx-auto flex justify-center py-6 ">
      <div className="min-h-[500px] w-[350px] bg-slate-100 z-10 rounded-md">
        <div className="text-gray-500 text-center ">
          <h1 className="text-4xl text-gray-800 font-semibold  py-4">
            Sign Up
          </h1>
          <p>Join to keep track of yout expense</p>
        </div>
        <div className="px-6 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 relative">
              <InputField  error={error.name}  label={"Full Name"} id={'name'} name={'name'}  value={signupData.name} onChange={handleChange}/>
              <InputField  error={error.username}  label={"Username"} id={'username'} name={'username'}  value={signupData.username} type="text"  onChange={handleChange}/>
              <InputField error={error.password} label={"Password"} id={'password'} name={'password'}  value={signupData.password} type={'password'}  onChange={handleChange}/>
              {signupData.password && (
                <div className="absolute bottom-[241px] right-0 mt-2 text-black">
                  <p className="text-[12px]">Strength: <span className={`font-semibold text-[12px] ${getStrengthColor(strength)}`}>{strength}</span></p>
                </div>
              )}
             
              <div className="flex gap-10">
                <RadioButton label={"Male"} id={'male'} name={'gender'} value={'male'} checked={signupData.gender==='male'}  onChange={handleChange}/>
                <RadioButton label={"Female"} id={'female'} name={'gender'} value={'female'} checked={signupData.gender==='female'}  onChange={handleChange}/>
              </div>

              {error.gender && <div className="text-red-500">{error.gender}</div>}
              <div className="mt-4">
                <button type="submit" className="w-full bg-black hover:bg-gray-900 active:bg-black py-3 rounded-md">
                  Sign Up
                </button>
              </div>

              <div className="text-center mb-4">
                <span className="text-gray-500">
                  Already have an account?{" "}
                  <span className="hover:underline text-gray-800">
                   <Link to={'/login'}> Login here</Link>
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
