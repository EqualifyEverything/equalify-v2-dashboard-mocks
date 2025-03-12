import { createFileRoute, Link } from '@tanstack/react-router'
import AuditDashboard from '../components/AuditDashboard';
import Footer from '../components/Footer';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <main>
        <h1>Audits</h1>
        <section>
          <h2>Get Started</h2>
          <Link to="/audits/new">Build Audit</Link>
        </section>
      </main>
    </>
  )
}
