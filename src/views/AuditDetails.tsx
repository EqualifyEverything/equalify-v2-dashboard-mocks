import { useEffect } from "react";

const AuditDetails = () => {
  useEffect(() => {
    document.title = "Audit Details - Equalify";
  }, []);

  return <h1>Audit Details</h1>;
};

export default AuditDetails;