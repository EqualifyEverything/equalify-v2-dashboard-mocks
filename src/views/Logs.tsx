import { useEffect } from "react";

const Logs = () => {
  useEffect(() => {
    document.title = "Logs - Equalify";
  }, []);

  return <h1>Logs</h1>;
};

export default Logs;