import { Button } from "primereact/button";
const PrimaryButton = ({
  type,
  label,
  loading,
  onClick,
  disabled,
  className,
}) => {
  return (
    <div className="flex w-full">
      <Button
        type={type}
        disabled={disabled || loading}
        onClick={loading ? undefined : onClick}
        className={`${className} text-white flex justify-center items-center w-full h-[48px] bg-primary`}
      >
        {loading ? <i className="pi pi-spin pi-spinner" /> : label}
      </Button>
    </div>
  );
};

export default PrimaryButton;
