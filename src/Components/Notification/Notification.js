import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../../slices/notificationSlice";
import { ReactComponent as CancelIcon } from "../../assets/SVG/cancel.svg";

export default function NotificationProvider() {
  const { notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach((n) => {
      const timer = setTimeout(() => {
        dispatch(clearNotification(n.id));
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-3 z-[9999]">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`
            relative min-w-[400px] px-4 py-3 rounded-lg bg-white shadow-md 
            transform transition-all duration-300 ease-in-out
            animate-slide-in
          `}
        >
          <div className="flex w-full justify-between">
            <div className="w-[88%] flex flex-col gap-2">
              <p
                className={`text-[16px] leading-4 font-medium ${
                  n.status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {n.status === "success" ? "Success" : "Error"}
              </p>
              <p className="text-[18px] text-gray-600 leading-6 font-normal">
                {n.message}
              </p>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => dispatch(clearNotification(n.id))}
            >
              <CancelIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// use this to show toast anywhere

// onClick={() =>
//               dispatch(
//                 showNotification({
//                   message:
//                     "The inventory unit has been successfully added. You can now view or manage it from the inventory dashboard.",
//                   status: "error",
//                 })
//               )
//             }
