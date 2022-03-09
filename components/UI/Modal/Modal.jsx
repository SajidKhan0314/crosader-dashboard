import React from "react";

const Modal = ({ header, body, onCanceled, onConfirmed }) => {
  return (
    <div className="bg-white rounded w-1/2 p-6 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <h2 className="text-xl font-bold">{header}</h2>
      <p className="mt-4 font-medium">{body}</p>
      <hr className="my-7" />
      <div className="flex justify-end">
        <button className="px-4 py-2 rounded" onClick={onCanceled}>
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded bg-purple-600 text-white "
          onClick={onConfirmed}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
