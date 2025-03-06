import { Link } from "@tanstack/react-router"

const Footer: React.FC = () => {
  return (
    <footer>
      <section>
        <h2>Scan Quota</h2>
        <p>2 free scans remaining. <Link to='/upgrade'>Upgrade</Link>.</p>
      </section>
      <section>
        <h2>Need help?</h2>
        <p>Email <a href="#">support@equalify.app</a>.</p>
      </section>
    </footer>
  )
}

export default Footer