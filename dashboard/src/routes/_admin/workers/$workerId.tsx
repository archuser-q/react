import { createFileRoute, notFound, useRouter } from '@tanstack/react-router'
import { WorkerDetailPage } from '#/pages/workers/WorkerDetailPage'

export const Route = createFileRoute('/_admin/workers/$workerId')({
  params: {
    parse: ({ workerId }) => {
      const id = Number(workerId)
      if (!Number.isInteger(id) || id <= 0) throw notFound()
      return { workerId: id }
    },
    stringify: ({ workerId }) => ({ workerId: String(workerId) }),
  },
  component: WorkerDetailRoute,
})

function WorkerDetailRoute() {
  const { workerId } = Route.useParams()
  const navigate = Route.useNavigate()
  const router = useRouter()
  return (
    <WorkerDetailPage
      workerId={workerId}
      onBack={() =>
        router.history.canGoBack() ? router.history.back() : navigate({ to: '/workers' })
      }
    />
  )
}
