import { Card } from 'antd'
import { useState } from 'react'
import { QueryError } from '#/components/common/QueryError'
import { CustomerDrawer } from '#/components/customers/CustomerDrawer'
import { CustomerFilters } from '#/components/customers/CustomerFilters'
import type { CustomerFilterValue } from '#/components/customers/CustomerFilters'
import { CustomerTable } from '#/components/customers/CustomerTable'
import { useUserList } from '#/hooks/useUsers'
import { PAGE_SIZE } from '#/utils/constants'

export interface CustomerSearch extends CustomerFilterValue {
  page?: number
}

interface CustomersPageProps {
  search: CustomerSearch
  onSearchChange: (search: CustomerSearch) => void
}

export function CustomersPage({ search, onSearchChange }: CustomersPageProps) {
  const [viewingId, setViewingId] = useState<number | null>(null)
  const { data, isLoading, isFetching, error, refetch } = useUserList({
    role: 'customer',
    status: search.status,
    keyword: search.keyword,
    page: search.page ?? 1,
    page_size: PAGE_SIZE,
  })

  return (
    <Card variant="borderless">
      <CustomerFilters
        value={search}
        total={data?.total}
        onChange={(filters) => onSearchChange({ ...filters, page: undefined })}
      />
      <div style={{ marginTop: 16 }}>
        {error ? (
          <QueryError error={error} onRetry={refetch} />
        ) : (
          <CustomerTable
            data={data}
            loading={isLoading || isFetching}
            onPageChange={(page) => onSearchChange({ ...search, page })}
            onView={setViewingId}
          />
        )}
      </div>
      <CustomerDrawer userId={viewingId} onClose={() => setViewingId(null)} />
    </Card>
  )
}
