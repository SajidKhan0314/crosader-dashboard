import Image from "next/image";
import React from "react";

const ImageUploader = ({ onChangeHandler }) => {
  return (
    <label
      htmlFor="upload"
      className="col-span-4 cursor-pointer flex flex-col items-center"
    >
      <div className="mb-2">
        <Image
          className="rounded-full relative"
          src={"/default.jpg"}
          width={150}
          height={150}
          objectFit="cover"
          alt="Project Image"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-600 leading-4 mb-4">
          No files selected
        </span>
        <button
          type="button"
          className="text-purple-700 hover:bg-purple-50 border-purple-700 border py-3 w-40 rounded-lg pointer-events-none"
        >
          Choose FIle
        </button>

        <input
          name="image"
          type="file"
          id="upload"
          className="hidden"
          onChange={onChangeHandler}
        />
      </div>
    </label>
  );
};

export default ImageUploader;
