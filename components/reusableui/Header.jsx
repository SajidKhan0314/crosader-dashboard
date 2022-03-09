import Image from "next/image";

const Header = () => {
  return (
    <header className="h-24 px-7 flex items-center header-shadow w-full bg-white justify-between">
      <div className="text-2xl leading-6 text-gray-800 font-semibold">
        Crosader
      </div>
      <div className="flex items-center">
        <button className="hover:opacity-80 hover:scale-105">
          <Image
            className="cursor-pointer"
            src={"/bellIcon.svg"}
            width={24}
            height={29}
          />
        </button>
        <div className="ml-9 flex items-center gap-3">
          <Image src={"/profile.svg"} width={40} height={40} />
          <p className="text-gray-600 text-base">Jello Mold</p>
          <button className="hover:opacity-80 hover:scale-105">
            <svg
              width="16"
              height="16"
              className="cursor-pointer"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z"
                fill="#4B5563"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
