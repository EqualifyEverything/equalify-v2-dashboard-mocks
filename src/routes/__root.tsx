import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
  component: RootComponent
})

const linkOptions = { 
  activeProps: {"aria-current": true },
  activeOptions: {exact: true}
}

function RootComponent() {
  return (
    <>
      <header>
        <nav aria-label="Main">
          <ul>
            <li><Link to="/audits" {...linkOptions}>Audits</Link></li>
            <li><Link to="/pages" {...linkOptions}>Pages</Link></li>
            <li><Link to="/logs" {...linkOptions}>Logs</Link></li>
            <li><Link to="/account" {...linkOptions}>Account</Link></li>
          </ul>
        </nav>
      </header>

      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
