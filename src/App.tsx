import { Routes, Route } from "react-router-dom";
import Audits from "./views/Audits";
import Authentication from "./views/Authentication";
import AuditBuilder from "./views/AuditBuilder";
import AuditDetails from "./views/AuditDetails";
import Pages from "./views/Pages";
import PageDetails from "./views/PageDetails";
import Logs from "./views/Logs";
import LogDetails from "./views/LogDetails";
import Upsell from "./views/Upsell";
import Account from "./views/Account";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Audits />} />
        <Route path="/audits" element={<Audits />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/audit-builder" element={<AuditBuilder />} />
        <Route path="/audit-details" element={<AuditDetails />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/page-details" element={<PageDetails />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/log-details" element={<LogDetails />} />
        <Route path="/upsell" element={<Upsell />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
};

export default App;