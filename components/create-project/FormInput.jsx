const FormInput = ({
  name,
  label,
  value,
  onChangeHandler,
  type = "text",
  placeholder,
  required,
  defaultValue,
}) => {
  return (
    <div className="grid grid-cols-7  items-center">
      <label
        htmlFor={name}
        className="text-gray-600 col-span-2 text-lg leading-[18px]"
      >
        {label}
      </label>
      <input
        className="py-3 focus:border-[#6D28D9] col-span-4 px-6 max-w-[686px] rounded-lg w-full outline-none  border border-[#D1D5DB] text-gray-600 focus:text-gray-700 text-base leading-4"
        name={name}
        defaultValue={defaultValue}
        required={required ?? false}
        onChange={onChangeHandler}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
