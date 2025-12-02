export const initialValues = (user) => ({
  name: user?.business?.name || "",
  gender: user?.business?.gender || "",
  phoneNumber: user?.business?.phoneVerified ? user?.business?.phoneNumber : "",
  secondaryNumber: user?.business?.secondaryNumber || "",
  dob: user?.business?.dob || "",
  city: user?.business?.city?._id || "",
  shopName: user?.business?.shopName || "",
  userName: user?.business?.userName || "",
  email: user?.business?.email || "",
});
