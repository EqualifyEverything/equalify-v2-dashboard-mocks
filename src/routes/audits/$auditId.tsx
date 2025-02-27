import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/audits/$auditId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/audits/$auditId"!</div>
}
