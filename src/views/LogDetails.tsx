import { useEffect } from "react";

const LogDetails = () => {
  useEffect(() => {
    document.title = "Log Details - Equalify";
  }, []);

  return <h1>Log Details</h1>;
};

export default LogDetails;