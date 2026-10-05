import { Card, Tabs } from 'antd'
import { QueryError } from '#/components/common/QueryError'
import { OrderFilters } from '#/components/orders/OrderFilters'
import type { OrderFilterValue } from '#/components/orders/OrderFilters'
import { OrderTable } from '#/components/orders/OrderTable'
import { useOrderList, useOrderStatusCounts } from '#/hooks/useOrders'
import type { OrderStatusFilter } from '#/types/order'
import { PAGE_SIZE } from '#/utils/constants'

export interface OrderSearch extends OrderFilterValue {
  status?: OrderStatusFilter
  page?: number
}

interface OrdersPageProps {
  search: OrderSearch
  onSearchChange: (search: OrderSearch) => void
  onOpenOrder: (orderId: number) => void
}

const ALL = 'all'
const ACTIVE_STATUSES = ['matched', 'accepted', 'on_the_way', 'arrived', 'in_progress']

export function OrdersPage({ search, onSearchChange, onOpenOrder }: OrdersPageProps) {
  const filters: OrderFilterValue = {
    keyword: search.keyword,
    category_id: search.category_id,
    date_from: search.date_from,
    date_to: search.date_to,
  }

  const { data, isLoading, isFetching, error, refetch } = useOrderList({
    ...filters,
    status: search.status,
    page: search.page ?? 1,
    page_size: PAGE_SIZE,
  })
  const { data: counts } = useOrderStatusCounts(filters)

  const count = (statuses: string[]) =>
    counts?.items.filter((i) => statuses.includes(i.status)).reduce((sum, i) => sum + i.count, 0)
  const label = (text: string, n?: number) => (n === undefined ? text : `${text} (${n})`)

  return (
    <Card variant="borderless" styles={{ body: { paddingTop: 4 } }}>
      <Tabs
        activeKey={search.status ?? ALL}
        onChange={(key) =>
          onSearchChange({
            ...search,
            status: key === ALL ? undefined : (key as OrderStatusFilter),
            page: undefined,
          })
        }
        items={[
          { key: ALL, label: label('Tất cả', counts?.total) },
          { key: 'pending', label: label('Chờ ghép thợ', count(['pending'])) },
          { key: 'active', label: label('Đang thực hiện', count(ACTIVE_STATUSES)) },
          { key: 'completed', label: label('Hoàn thành', count(['completed'])) },
          { key: 'cancelled', label: label('Đã hủy', count(['cancelled'])) },
        ]}
      />
      <OrderFilters
        value={filters}
        onChange={(next) => onSearchChange({ ...search, ...next, page: undefined })}
      />
      {error ? (
        <QueryError error={error} onRetry={refetch} />
      ) : (
        <OrderTable
          data={data}
          loading={isLoading || isFetching}
          onPageChange={(page) => onSearchChange({ ...search, page })}
          onOpen={onOpenOrder}
        />
      )}
    </Card>
  )
}
