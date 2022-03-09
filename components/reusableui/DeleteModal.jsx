import { useState } from "react";

const DeleteModal = ({
	setDeleteModal,
	setDeleteId,
	deleteId,
	deleteProject,
}) => {
	return (
		<div className="w-screen fixed h-screen flex justify-center items-center z-30">
			<div className="mx-auto z-50 max-w-[545px] rounded-[6px] w-full h-[160px] bg-gray-900">
				<div className="h-[104px] bg-gray-900 rounded-[6px] flex pl-[22px] pt-[24px] gap-4 items-start justify-start">
					<div className="">
						<svg
							width="43"
							height="48"
							viewBox="0 0 43 48"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M40.5697 11.2157C40.988 34.3755 26.1921 43.9585 22.3863 46.0373C21.8274 46.3426 21.1598 46.3718 20.578 46.1134C16.684 44.3843 1.86056 36.1518 2.43727 11.2157L2.43789 11.2156C7.21276 10.4337 10.6986 6.4525 10.6791 1.80306L10.6784 1.63855H32.3284L32.3276 1.80368C32.3086 6.45311 35.7947 10.4341 40.5697 11.2157Z"
								fill="#1F2122"
							/>
							<path
								d="M28.7837 37.9207C24.8899 36.1917 10.0664 27.9592 10.6431 3.02306L10.6784 1.63855L10.6791 1.80306C10.6986 6.4525 7.21286 10.4337 2.43789 11.2157L2.43727 11.2158C1.86056 36.1518 16.684 44.3843 20.5779 46.1133C21.1597 46.3717 21.8274 46.3426 22.3862 46.0372C24.34 44.97 29.1902 41.924 33.3915 36.0795C32.2229 36.9095 31.2455 37.4877 30.592 37.8445C30.0333 38.1498 29.3657 38.1791 28.7837 37.9207C24.89 36.1916 29.3657 38.1791 28.7837 37.9207Z"
								fill="#232526"
							/>
							<path
								d="M19.9109 47.6106C5.9958 41.1027 0.461439 25.6655 0.796515 11.1778C0.813746 10.4291 1.33734 9.78749 2.06821 9.61908C5.99272 8.71405 9.06739 5.89169 9.03723 1.64544C9.03344 0.749641 9.78113 0 10.6785 0H32.3284C33.2255 0 33.9731 0.749333 33.9695 1.64503C33.8827 5.6399 36.9534 8.96349 40.8351 9.59877C41.6174 9.72677 42.1962 10.3949 42.2105 11.1862C42.4687 25.4874 36.1725 40.3746 23.1739 47.4748C22.6267 47.7736 21.6278 48.4134 19.9109 47.6106ZM21.2448 44.6162C21.3583 44.6665 21.4872 44.6606 21.5987 44.5998C25.6824 42.3691 38.7958 33.551 38.9361 12.5248C34.6929 11.3025 31.377 7.68574 30.7829 3.27713H12.224C11.6293 7.68903 8.30923 11.3074 4.06205 12.5274C4.03908 25.1001 8.92821 39.1468 21.2448 44.6162C19.5113 43.8465 21.3583 44.6666 21.2448 44.6162Z"
								fill="#0B80FA"
							/>
							<path
								d="M18.036 28.228L14 23.3817L17.3982 20.3853L19.8436 23.3218L26.8 16L30 19.2191L21.335 28.3392C20.9134 28.7831 19.5543 29.6274 18.036 28.228Z"
								fill="white"
							/>
						</svg>
					</div>
					<div className="pr-[76px]">
						<h1 className="text-white font-semibold text-base leading-[16px]">
							Confiramtion
						</h1>
						<p className="text-white text-xs leading-[16px] mt-2">
							Are you sure you want to delete this project? You will be
							redirected to the project page.
						</p>
					</div>
				</div>
				<div className="h-[56px] bg-gray-800 rounded-[6px] rounded-tl-none rounded-tr-none flex items-center justify-end pr-3">
					<button
						onClick={() => {
							setDeleteId(null);
							setDeleteModal(false);
						}}
						className="text-gray-300 mr-4 font-medium text-xs tracking-[-0.02em] w-[75px] h-[32px] border border-clifford rounded-[6px] bg-[#0B80FA] hover:bg-[#047fe4]"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							deleteProject(deleteId);
							setDeleteId(null);
							setDeleteModal(false);
						}}
						className="text-white font-medium text-xs tracking-[-0.02em] w-[75px] h-[32px] rounded-[6px] hover:bg-red-500 bg-red-400"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
