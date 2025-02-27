import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/$pageId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pages/$pageId"!</div>
}
