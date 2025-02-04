import { useEffect } from "react";

const Audits = () => {

  // Set Document Title
  useEffect(() => {
    document.title = "Audits - Equalify";
  }, []);

  return <h1>Audits</h1>;
};

export default Audits;