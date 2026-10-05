import { createFileRoute } from '@tanstack/react-router'
import { WorkersPage } from '#/pages/workers/WorkersPage'
import type { WorkerSearch } from '#/pages/workers/WorkersPage'
import { parseEnum, parsePage } from '#/utils/search'

export const Route = createFileRoute('/_admin/workers/')({
  validateSearch: (search: Record<string, unknown>): WorkerSearch => ({
    page: parsePage(search.page),
    verification_status: parseEnum(search.verification_status, [
      'pending',
      'approved',
      'rejected',
    ] as const),
  }),
  component: WorkersRoute,
})

function WorkersRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <WorkersPage
      search={search}
      onSearchChange={(next) => navigate({ search: next })}
      onOpenWorker={(workerId) => navigate({ to: '/workers/$workerId', params: { workerId } })}
    />
  )
}
