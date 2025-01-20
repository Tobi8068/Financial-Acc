import NotificationProvider from "./notificationProvider";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
};

export default ContextProviders;