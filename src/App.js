import NotificationProvider from "./Components/Notification/Notification";
import Layout from "./Layout/Layout";

const App = () => {
  return (
    <div className="flex justify-center">
      <NotificationProvider />
      <Layout />
    </div>
  );
};

export default App;
