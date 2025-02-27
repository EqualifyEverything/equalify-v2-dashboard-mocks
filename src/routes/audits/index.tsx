import { createFileRoute, Link } from '@tanstack/react-router'
import AuditDashboard from '../../components/AuditDashboard';
import { fetchAllAudits } from '../../api/api';

export const Route = createFileRoute('/audits/')({
  component: RouteComponent,
})

const NewAudit: React.FC = () => {
  if (!fetchAllAudits()) {
    return (
      <section>
        <h2>Get Started</h2>
        <Link to="/audits/new">Build Audit</Link>
      </section>
    )
  }

  return (
    <nav aria-label="Audits Page">
      <Link to="/audits/new">New Audit</Link>
    </nav>
    
  );
}

function RouteComponent() {
  return (
    <>
    <main>
      <h1>Audits</h1>
      <NewAudit />
      <article>
        <AuditDashboard />
      </article>
    </main>

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
  </>
)
}
