import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Function to determine if the link is the current page
  const isActive = (path: string) => location.pathname === path;

  return (
    <header>
      <nav aria-label="Main">
        <ul>
          <li>
            <Link to="/audits" aria-current={isActive("/audits") ? "page" : undefined}>
              Audits
            </Link>
          </li>
          <li>
            <Link to="/pages" aria-current={isActive("/pages") ? "page" : undefined}>
              Pages
            </Link>
          </li>
          <li>
            <Link to="/logs" aria-current={isActive("/logs") ? "page" : undefined}>
              Logs
            </Link>
          </li>
          <li>
            <Link to="/account" aria-current={isActive("/account") ? "page" : undefined}>
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;