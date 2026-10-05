import { Card, Tabs } from 'antd'
import { QueryError } from '#/components/common/QueryError'
import { ComplaintDrawer } from '#/components/complaints/ComplaintDrawer'
import { ComplaintFilters } from '#/components/complaints/ComplaintFilters'
import type { ComplaintFilterValue } from '#/components/complaints/ComplaintFilters'
import { ComplaintTable } from '#/components/complaints/ComplaintTable'
import { useComplaintList, useComplaintStatusCounts } from '#/hooks/useComplaints'
import type { ComplaintStatus } from '#/types/dashboard'
import { PAGE_SIZE } from '#/utils/constants'

export interface ComplaintSearch extends ComplaintFilterValue {
  status?: ComplaintStatus
  page?: number
  id?: number
}

interface ComplaintsPageProps {
  search: ComplaintSearch
  onSearchChange: (search: ComplaintSearch) => void
}

const ALL = 'all'

export function ComplaintsPage({ search, onSearchChange }: ComplaintsPageProps) {
  const filters: ComplaintFilterValue = {
    keyword: search.keyword,
    date_from: search.date_from,
    date_to: search.date_to,
  }

  const { data, isLoading, isFetching, error, refetch } = useComplaintList({
    ...filters,
    status: search.status,
    page: search.page ?? 1,
    page_size: PAGE_SIZE,
  })
  const { data: counts } = useComplaintStatusCounts(filters)

  const count = (status: ComplaintStatus) => counts?.items.find((i) => i.status === status)?.count
  const label = (text: string, n?: number) => (n === undefined ? text : `${text} (${n})`)

  return (
    <Card variant="borderless" styles={{ body: { paddingTop: 4 } }}>
      <Tabs
        activeKey={search.status ?? ALL}
        onChange={(key) =>
          onSearchChange({
            ...search,
            status: key === ALL ? undefined : (key as ComplaintStatus),
            page: undefined,
          })
        }
        items={[
          { key: ALL, label: label('Tất cả', counts?.total) },
          { key: 'open', label: label('Mới', count('open')) },
          { key: 'processing', label: label('Đang xử lý', count('processing')) },
          { key: 'resolved', label: label('Đã giải quyết', count('resolved')) },
          { key: 'rejected', label: label('Từ chối', count('rejected')) },
        ]}
      />
      <ComplaintFilters
        value={filters}
        onChange={(next) => onSearchChange({ ...search, ...next, page: undefined })}
      />
      {error ? (
        <QueryError error={error} onRetry={refetch} />
      ) : (
        <ComplaintTable
          data={data}
          loading={isLoading || isFetching}
          selectedId={search.id}
          onPageChange={(page) => onSearchChange({ ...search, page })}
          onOpen={(id) => onSearchChange({ ...search, id })}
        />
      )}
      <ComplaintDrawer
        complaintId={search.id ?? null}
        onClose={() => onSearchChange({ ...search, id: undefined })}
      />
    </Card>
  )
}
