import { useEffect } from "react";

const Upsell = () => {
  useEffect(() => {
    document.title = "Upsell - Equalify";
  }, []);

  return <h1>Upsell</h1>;
};

export default Upsell;