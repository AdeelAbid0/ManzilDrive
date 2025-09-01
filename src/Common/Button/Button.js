import { Button } from "primereact/button";
const PrimaryButton = ({
  type,
  label,
  loading,
  handleClick,
  disabled,
  className,
}) => {
  return (
    <div>
      <Button
        type={type}
        disabled={disabled || loading}
        onClick={loading ? undefined : handleClick}
        className={`${className} text-white flex justify-center items-center w-full h-[48px] bg-primary`}
      >
        {loading ? <i className="pi pi-spin pi-spinner" /> : label}
      </Button>
    </div>
  );
};

export default PrimaryButton;
