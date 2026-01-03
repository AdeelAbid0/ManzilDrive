import { useEffect, useState } from "react";

const SideMenu = ({ setMenu }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenu(false);
    }, 300);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [setMenu]);
  const handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-[999] rounded-lg">
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#42424299] z-[999]
                   transition-opacity duration-300 ${
                     isClosing ? "opacity-0" : "opacity-100"
                   } ${isMounted ? "opacity-100" : "opacity-0"}`}
        onClick={handleOverlayClick}
        onTouchMove={handleTouchMove}
        onWheel={(e) => e.preventDefault()}
        style={{
          touchAction: "none",
          overscrollBehavior: "contain",
        }}
      />
      <div
        className={`w-[343px] rounded-tl-lg rounded-bl-lg bg-white shadow-lg fixed top-0 right-0 h-full z-[1000]
                   transition-transform duration-300 ease-out ${
                     isClosing ? "translate-x-full" : "translate-x-0"
                   } ${isMounted ? "translate-x-0" : "translate-x-full"}`}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <div className="p-4 h-full overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-800">Hello</h1>
          <p className="text-gray-600 mt-2">This is your animated side menu</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
