import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

const ToastNotification = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider>
      <button onClick={() => setOpen(true)}>Save View Options</button>

      <Toast.Root
        className="toast-root"
        open={open}
        onOpenChange={setOpen}
        duration={3000} // 3 seconds
      >
        <Toast.Title className="toast-title">Success</Toast.Title>
        <Toast.Description>{message}</Toast.Description>
        <Toast.Action altText="Close">
          <button className="toast-close" onClick={() => setOpen(false)}>
            Close
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="toast-viewport" />
    </Toast.Provider>
  );
};

export default ToastNotification;