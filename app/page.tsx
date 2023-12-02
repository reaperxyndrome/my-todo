// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponent from './homeclient'
import ServerComponent from './myTasks'
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}