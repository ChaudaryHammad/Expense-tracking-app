import  { useState } from "react";
import InputField from "../components/InputField";

import { Link } from 'react-router-dom';

function LoginPage() {
	const [loginData,setLoginData] = useState({
		username:"",
		password:""
	})

	const handleChange = (e)=>{
		const {value,name} = e.target;
		setLoginData((prev)=>({
			...prev,
			[name]:value
		}))
	}

	const handleSubmit = async(e)=>{
		e.preventDefault()
		console.log(loginData);
	}
  return (
    <div className="my-0 mx-auto flex justify-center py-6 h-screen">
      <div className="h-[420px] min-w-[350px] bg-slate-100 z-10 rounded-md">
        <div className="text-gray-500 text-center ">
          <h1 className="text-4xl text-gray-800 font-semibold  py-4">
            Login
          </h1>
          <p>Welcome back! Log in to your account</p>
        </div>
        <div className="px-6 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 ">
              
              <InputField label={"Username"} id={'username'} name={'username'} value={loginData.username} type="text" onChange={handleChange}/>
              <InputField label={"Password"} id={'password'} name={'password'} value={loginData.password} type="password" onChange={handleChange} />
             
              <div className="mt-4">
                <button type="submit" className="w-full bg-black hover:bg-gray-900 active:bg-black py-3 rounded-md">
                  Login
                </button>
              </div>

              <div className="text-center mb-2">
                <span className="text-gray-500">
                  Don't have an account?{" "}
                  <span className="hover:underline text-gray-800">
                   <Link to={'/signup'}>Sign Up</Link>
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

export default LoginPage;
