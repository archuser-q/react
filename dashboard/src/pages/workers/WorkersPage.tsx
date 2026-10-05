import { Card, Tabs } from 'antd'
import { QueryError } from '#/components/common/QueryError'
import { WorkerTable } from '#/components/workers/WorkerTable'
import { useWorkerCounts, useWorkerList } from '#/hooks/useWorkers'
import type { VerificationStatus } from '#/types/worker'
import { PAGE_SIZE } from '#/utils/constants'

export interface WorkerSearch {
  verification_status?: VerificationStatus
  page?: number
}

interface WorkersPageProps {
  search: WorkerSearch
  onSearchChange: (search: WorkerSearch) => void
  onOpenWorker: (workerId: number) => void
}

const ALL = 'all'

export function WorkersPage({ search, onSearchChange, onOpenWorker }: WorkersPageProps) {
  const { data, isLoading, isFetching, error, refetch } = useWorkerList({
    verification_status: search.verification_status,
    page: search.page ?? 1,
    page_size: PAGE_SIZE,
  })
  const { data: counts } = useWorkerCounts()

  const label = (text: string, count?: number) =>
    count === undefined ? text : `${text} (${count})`

  return (
    <Card variant="borderless" styles={{ body: { paddingTop: 4 } }}>
      <Tabs
        activeKey={search.verification_status ?? ALL}
        onChange={(key) =>
          onSearchChange({
            verification_status: key === ALL ? undefined : (key as VerificationStatus),
            page: undefined,
          })
        }
        items={[
          {
            key: ALL,
            label: label('Tất cả', counts && counts.pending + counts.approved + counts.rejected),
          },
          { key: 'pending', label: label('Chờ duyệt', counts?.pending) },
          { key: 'approved', label: label('Đã duyệt', counts?.approved) },
          { key: 'rejected', label: label('Bị từ chối', counts?.rejected) },
        ]}
      />
      {error ? (
        <QueryError error={error} onRetry={refetch} />
      ) : (
        <WorkerTable
          data={data}
          loading={isLoading || isFetching}
          onPageChange={(page) => onSearchChange({ ...search, page })}
          onOpen={onOpenWorker}
        />
      )}
    </Card>
  )
}
