import NotificationProvider from "./Components/Notification";
import Layout from "./Layout/Layout";
import ErrorBoundary from "./Components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <div className="flex justify-start">
        <NotificationProvider />
        <Layout />
      </div>
    </ErrorBoundary>
  );
};

export default App;
