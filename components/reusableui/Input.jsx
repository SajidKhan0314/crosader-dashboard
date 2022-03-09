import React from "react";

const Input = ({ name, label, value, onChangeHandler, type }) => {
	return (
		<>
			<label
				className="sm:text-[14px] text-sm  text-gray-800 leading-[14px] font-bold"
				htmlFor={name}
			>
				{label}
			</label>
			<input
				className="py-3 border sm:text-base text-sm outline-none pl-6 focus:text-gray-800 text-gray-500 leading-4 border-[#E5E7EB] rounded-lg max-w-[472px] w-full mt-3 focus:border-[#6D28D9]"
				type={type}
				value={value}
				onChange={onChangeHandler}
				name={name}
			/>
		</>
	);
};

export default Input;
