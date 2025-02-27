import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs/$logId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/logs/$logId"!</div>
}
