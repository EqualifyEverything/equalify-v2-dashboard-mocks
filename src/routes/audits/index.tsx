import { createFileRoute, Link } from '@tanstack/react-router'
import AuditDashboard from '../../components/AuditDashboard';
import { fetchAllAudits } from '../../api/api';
import Footer from '../../components/Footer';

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
    </>
  )
}
