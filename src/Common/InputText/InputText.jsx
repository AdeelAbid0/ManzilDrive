import { InputText } from "primereact/inputtext";

const CommonInput = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  className = "",
  prefixIcon: PrefixIcon,
  suffixIcon: SuffixIcon,
  error,
}) => {
  return (
    <div className="relative w-full">
      {/* Prefix */}
      {PrefixIcon && (
        <span className="absolute left-3 top-1/4  text-gray-400 pointer-events-none">
          <PrefixIcon size={18} />
        </span>
      )}

      <InputText
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={`
          w-full h-12 leading-none
          bg-white rounded
          border ${error ? "border-error text-error" : "border-border"}
          font-inter font-normal text-input text-sm
          focus:ring-0 focus:outline-none
          placeholder-placeholder placeholder:font-normal
          placeholder:font-inter placeholder:text-sm
          placeholder:leading-[18px]
          ${PrefixIcon ? "pl-10" : "pl-3"}
          ${SuffixIcon ? "pr-10" : "pr-3"}
          ${className}
        `}
      />

      {/* Suffix */}
      {SuffixIcon && (
        <span className="absolute right-3 top-1/2 text-gray-400 pointer-events-none">
          <SuffixIcon size={18} />
        </span>
      )}
    </div>
  );
};

export default CommonInput;
