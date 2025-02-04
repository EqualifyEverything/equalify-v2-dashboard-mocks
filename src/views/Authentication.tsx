import { useEffect } from "react";

const Authentication = () => {
  useEffect(() => {
    document.title = "Authentication - Equalify";
  }, []);

  return <h1>Authentication</h1>;
};

export default Authentication;