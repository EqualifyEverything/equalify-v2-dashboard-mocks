import { useEffect } from "react";

const PageDetails = () => {
  useEffect(() => {
    document.title = "Page Details - Equalify";
  }, []);

  return <h1>Page Details</h1>;
};

export default PageDetails;