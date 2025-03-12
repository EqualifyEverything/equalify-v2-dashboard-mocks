import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/upgrade')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <h1>You're out of scans!</h1>
      <div aria-live="assertive">Upgrade to scan more pages with Equalify.</div>
      <article>
        <h2>Upgrade</h2>
        <section>
          <h3>Basic Plan</h3>
          <p>200 monthly scans - $40/month</p>
          <a href="#">Buy Basic</a>
        </section>
        <section>
          <h3>Pro Plan</h3>
          <p>2000 monthly scans - $150/month</p>
          <p>Includes priority support</p>
          <a href="#">Buy Pro</a>
        </section>
        <section>
          <h3>Enterprise Plan</h3>
          <p>2000+ monthly scans - Custom Pricing</p>
          <p>Includes priority support, custom checks, and multi-user access</p>
          <a href="#">Buy Enterprise</a>
        </section>
      </article>
      {/* <article>
        <h2>Current User</h2>
        Logged in as Lucy Greco. <a href="#">Logout</a>.
      </article> */}
    </main>
  )
}
