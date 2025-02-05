import { createContext, useContext, useState, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";

interface NotificationContextType {
  showToast: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}
      
      <Toast.Provider>
        <Toast.Root open={open} onOpenChange={setOpen} duration={3000}>
          <Toast.Title>Notification</Toast.Title>
          <Toast.Description>{message}</Toast.Description>
          <Toast.Action altText="Close">
            <button className="toast-close" onClick={() => setOpen(false)}>Close</button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="toast-viewport" />
      </Toast.Provider>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};