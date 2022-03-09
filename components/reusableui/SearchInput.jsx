import React from "react";

const SearchInput = ({ value, onChangeHandler }) => {
	return (
		<>
			<div className="max-w-[356px] relative bg-white  rounded-3xl h-12 w-full flex items-center">
				<input
					value={value}
					onChange={onChangeHandler}
					placeholder="Search Project"
					className="w-full  pl-6 py-4 text-gray-600 focus:text-gray-700  outline-none h-12 rounded-3xl bg-transparent"
				/>
				<svg
					width="20"
					className="mr-7 ml-3 cursor-pointer pointer-events-none absolute right-0"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.63633 2.5C7.42268 2.5 6.23628 2.85989 5.22717 3.53416C4.21806 4.20843 3.43155 5.16679 2.9671 6.28806C2.50266 7.40932 2.38114 8.64314 2.61791 9.83347C2.85468 11.0238 3.43911 12.1172 4.29729 12.9754C5.15547 13.8335 6.24886 14.418 7.43919 14.6547C8.62952 14.8915 9.86334 14.77 10.9846 14.3056C12.1059 13.8411 13.0642 13.0546 13.7385 12.0455C14.4128 11.0364 14.7727 9.84998 14.7727 8.63633C14.7726 7.0089 14.126 5.44817 12.9753 4.2974C11.8245 3.14664 10.2638 2.5001 8.63633 2.5V2.5Z"
						stroke="#4B5563"
						strokeMiterlimit="10"
					/>
					<path
						d="M13.2148 13.2152L17.5004 17.5008"
						stroke="#4B5563"
						strokeMiterlimit="10"
						strokeLinecap="round"
					/>
				</svg>
			</div>
		</>
	);
};

export default SearchInput;
