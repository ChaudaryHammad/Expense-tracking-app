import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

const InputField = ({ label, id, name, type = "text", onChange, value, placeholder = "", inputtype = "", error, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  
  return (
    <div>
      <label 
        htmlFor={id} 
        className={`block ${inputtype === 'transaction' ? 'uppercase tracking-wide !text-white text-xs font-bold mb-2' : 'text-sm font-medium text-gray-700'}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`mt-1 p-2 w-full border rounded-md text-black focus:border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${inputtype === 'transaction' ? '!text-white' : ''}`}
          id={id}
          type={isPassword && !showPassword ? 'password' : 'text'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        <div className="absolute bottom-[-23px]">{error && <span className="text-red-500 text-sm">{error}</span>}</div>
        {isPassword && (
          <div className="absolute top-4 right-2 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <BiShow size={20} fill="#000" /> : <BiHide size={20} fill="#000" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
