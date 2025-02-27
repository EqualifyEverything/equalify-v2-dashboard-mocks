import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/audits/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/audits/new/"!</div>
}
