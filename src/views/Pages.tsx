import { useEffect } from "react";

const Pages = () => {
  useEffect(() => {
    document.title = "Pages - Equalify";
  }, []);

  return <h1>Pages</h1>;
};

export default Pages;