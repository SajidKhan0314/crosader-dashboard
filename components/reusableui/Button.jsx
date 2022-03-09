import React from "react";

const Button = ({ text, onClickHandler }) => {
	return (
		<>
			<button
				onClick={onClickHandler}
				className="w-[172px] h-[44px] text-white hover:bg-purple-600 bg-purple-700 rounded-lg font-semibold"
			>
				{text}
			</button>
		</>
	);
};

export default Button;
