import React from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const InputField = ({ type, name, value, placeholder, handleChange, handleShowPassword, error }) => {
	return (
		<div className="relative">
			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className={`${
					error && 'border-red-500'
				} px-4 text-sm w-full h-10 outline-none bg-transparent border border-[#e5e5e5] focus:border-black rounded-[3px] transition-colors`}
			/>
			{name === 'password' && (
				<span onClick={handleShowPassword} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-black/30 hover:text-black cursor-pointer select-none">
					{type === 'password' ? <BsEyeFill /> : <BsEyeSlashFill />}
				</span>
			)}
		</div>
	);
};

export default InputField;
