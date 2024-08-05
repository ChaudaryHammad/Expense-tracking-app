import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const InputField = ({ label, id, name, type = "text", onChange, value,placeholder="",inputtype="" }) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div>
			{
				type === "password" ? (
					<>
					<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
		{
			showPassword ? (
				<>
					<div className="relative">
			<input
				className=' mt-1 p-2 w-full border rounded-md text-black focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
				id={id}
				type={'text'}
				name={name}
				value={value}
				onChange={onChange}
				
			/>
				
				
				<div className="absolute top-4 right-2" onClick={()=>setShowPassword((prev)=>!prev)}><BiShow size={20} fill="#000"/></div>
				
			</div>

				</>
			):(
				<>
					<div className="relative">
			<input
				className=' mt-1 p-2 w-full border rounded-md text-black focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
			
			/>
				
				
				<div className="absolute top-4 right-2" onClick={()=>setShowPassword((prev)=>!prev)}><BiHide size={20} fill="#000"/></div>
				
			</div>

				</>
			)
		}

			

					</>
				):(
					<>
				{
				inputtype==='transaction' ? (
					<label className='block uppercase tracking-wide !text-white z-10 text-xs font-bold mb-2'>
				{label}
			</label>
				):(
					<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
				)
				}
			<input
				className='mt-1 p-2 w-full border rounded-md text-black focus:border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
					</>
				)
			}
		</div>
	);
};

export default InputField;