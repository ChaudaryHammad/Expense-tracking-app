import  { useState } from "react";
import InputField from "../components/InputField";
import RadioButton from "../components/RadioButton";
import { Link } from 'react-router-dom';

function SignUpPage() {
	const [signupData,setSignupData] = useState({
		name:"",
		username:"",
		password:"",
		gender:""
		
	})

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
		}

	}


	const handleSubmit = async(e)=>{
		e.preventDefault()
		console.log(signupData);
	}
  return (
    <div className="my-0 mx-auto flex justify-center py-6 ">
      <div className="min-h-[500px] min-w-[350px] bg-slate-100 z-10 rounded-md">
        <div className="text-gray-500 text-center ">
          <h1 className="text-4xl text-gray-800 font-semibold  py-4">
            Sign Up
          </h1>
          <p>Join to keep track of yout expense</p>
        </div>
        <div className="px-6 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 ">
              <InputField label={"Full Name"} id={'name'} name={'name'}  value={signupData.name} onChange={handleChange}/>
              <InputField label={"Username"} id={'username'} name={'username'}  value={signupData.username} type="text"  onChange={handleChange}/>
              <InputField label={"Password"} id={'password'} name={'password'}  value={signupData.password} type={'password'}  onChange={handleChange}/>
              <div className="flex gap-10">
                <RadioButton label={"Male"} id={'male'} name={'gender'} value={'male'} checked={signupData.gender==='male'}  onChange={handleChange}/>
                <RadioButton label={"Female"} id={'female'} name={'gender'} value={'female'} checked={signupData.gender==='female'}  onChange={handleChange}/>
              </div>

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
