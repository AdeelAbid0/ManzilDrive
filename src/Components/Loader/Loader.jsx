import { Logo } from "../../Utils/Icons";
import "./Loader.css";
const Loader = ({ size }) => {
  return (
    <div className="loader">
      <Logo size={size} />
    </div>
  );
};

export default Loader;
