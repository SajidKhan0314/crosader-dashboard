import { useState, useRef, useEffect } from "react";

const Dropdown = ({
  name,
  label,
  options,
  setSelectedValue,
  selectedStatus,
}) => {
  const [selectedOption, setSelectedOption] = useState({
    label: "-",
    value: null,
  });
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    opened ? select.current.focus() : null;
  });

  // Select ref
  const select = useRef(null);

  return (
    <>
      <div tabIndex={5} className="grid  grid-cols-7 items-center">
        <label
          htmlFor={name}
          className="text-gray-600 col-span-2 text-lg leading-[18px]"
        >
          {label}
        </label>
        <div className="relative col-span-4">
          <div
            tabIndex={3}
            onClick={(e) => {
              e.stopPropagation();
              setOpened(!opened);
            }}
            name={name}
            className="py-4 flex justify-between cursor-pointer h-[46px] focus:border-[#6D28D9]  px-6 max-w-[686px] rounded-lg w-full outline-none  border border-[#D1D5DB]  text-gray-600 text-base leading-4"
          >
            <span>
              {selectedStatus !== ""
                ? options.find((option) => option._id === selectedStatus).name
                : selectedOption.name}
            </span>
            <svg
              className={`hover:opacity-80 relative -top-1 scale-90 hover:scale-100 ${
                opened ? "rotate-180" : ""
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.4545 7.8295C4.89384 7.39017 5.60616 7.39017 6.0455 7.8295L12 13.784L17.9545 7.8295C18.3938 7.39017 19.1062 7.39017 19.5455 7.8295C19.9848 8.26884 19.9848 8.98116 19.5455 9.4205L12.7955 16.1705C12.3562 16.6098 11.6438 16.6098 11.2045 16.1705L4.4545 9.4205C4.01517 8.98116 4.01517 8.26884 4.4545 7.8295Z"
                fill="#4B5563"
              />
            </svg>
          </div>
          {/* DropDown options */}
          <div>
            <div
              tabIndex={-1}
              className={`${
                opened ? "block" : "hidden"
              } absolute z-10 w-full max-w-[686px]  bg-white rounded-md border border-[#D1D5DB] border-t-0`}
            >
              <div ref={select} tabIndex={10} onBlur={() => setOpened(false)}>
                <ul>
                  {options && options.length > 0 ? (
                    options.map((option, index) => {
                      return (
                        <li
                          key={index + option._id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOption(option);
                            setSelectedValue(option._id);
                            setOpened(false);
                          }}
                          className="py-4 p-4   flex items-center hover:bg-[#EDE9FE] cursor-pointer pl-6 "
                        >
                          {option.name}
                        </li>
                      );
                    })
                  ) : (
                    <li className="py-6 flex items-center  cursor-pointer pl-6">
                      No options available
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
