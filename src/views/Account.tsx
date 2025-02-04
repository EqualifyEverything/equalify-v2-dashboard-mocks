import { useEffect } from "react";

const Account = () => {
  useEffect(() => {
    document.title = "Account - Equalify";
  }, []);

  return <h1>Account</h1>;
};

export default Account;