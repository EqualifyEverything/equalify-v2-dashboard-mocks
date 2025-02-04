import { useEffect } from "react";

const AuditBuilder = () => {
  useEffect(() => {
    document.title = "Audit Builder - Equalify";
  }, []);

  return <h1>Audit Builder</h1>;
};

export default AuditBuilder;