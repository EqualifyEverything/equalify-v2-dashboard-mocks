import { createFileRoute } from '@tanstack/react-router'
import AuditDetailsDashboard from '../../components/AuditDetailsDashboard'
import { fetchAuditById } from '../../api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/audits/$auditId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auditId } = Route.useParams()
  const { 
    data: audit, 
    isLoading, 
    isFetching, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ['audit', auditId],
    queryFn: () => fetchAuditById(auditId),
    initialData: {
      id: '1',
      name: "Lucy's Audit",
      pages: 2,
      checks: 2,
      progress: 0,
      status: 'idle',
      created: '2025-02-25',
      lastRun: '2025-02-25',
      schedule: 'monthly'
    },
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });

  return (
    <>
      <main>
        <h1>{audit.name}</h1>
        <article>
          <h2>Overview</h2>
          <p>{audit.checks} checks on {audit.pages} pages. Runs {audit.schedule}. Currently, {audit.status}.</p>
        </article>
        <article>
          <h2>Actions</h2>
          <nav aria-label="Audit Actions">
            <button>Run Audit</button>
            <a href="#">Edit Audit</a>    
          </nav>
        </article>
        <article>
            <h2>Progress</h2>
            <table>
              <thead>
                <tr>
                  <th>Last Run</th>
                  <th>Fixed Blockers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{audit.lastRun}</td>
                  <td>{audit.progress}%</td>
                </tr>
              </tbody>
            </table>
        </article>
        <article>
          <AuditDetailsDashboard />
        </article>

        {/* TODO: Related Logs component */}
        <article>
          <h2>Related Logs</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Summary</th>
                <th>Trigger</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th role="rowheader"><a href="#">Log 3</a></th>
                <td>Audit ran. Three blockers found.</td>
                <td>Lucy's Review Audit</td>
              </tr>
              <tr>
                <th role="rowheader"><a href="#">Log 2</a></th>
                <td>Lucy's Review created with two pages and two checks.</td>
                <td>User: Lucy</td>
              </tr>
            </tbody>
          </table> 
          <nav aria-label="Logs Table">
            <label htmlFor="item-count">Showing 2 of 2 Logs. Change Number of Logs Displayed:</label> 
            <select id="item-count">
              <option>Up to 5</option>
            </select>
          </nav>
        </article>
      </main>
    </>
  )
}