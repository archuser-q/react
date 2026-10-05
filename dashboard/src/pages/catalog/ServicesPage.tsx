import { PlusOutlined, PercentageOutlined } from '@ant-design/icons'
import { App, Button, Card, Input, Select, Space, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { BulkPriceModal } from '#/components/catalog/BulkPriceModal'
import { CategoryPanel } from '#/components/catalog/CategoryPanel'
import styles from '#/components/catalog/catalog.module.css'
import { ServiceFormModal } from '#/components/catalog/ServiceFormModal'
import { ServiceTable } from '#/components/catalog/ServiceTable'
import { QueryError } from '#/components/common/QueryError'
import {
  useBulkPrice,
  useCategories,
  useCreateService,
  useDeleteService,
  useServiceList,
  useUpdateService,
} from '#/hooks/useCatalog'
import type { ServiceItem } from '#/types/catalog'

export interface ServiceSearch {
  category_id?: number
  keyword?: string
  status?: 'active' | 'inactive'
  page?: number
}

interface ServicesPageProps {
  search: ServiceSearch
  onSearchChange: (search: ServiceSearch) => void
}

const PAGE_SIZE = 50

export function ServicesPage({ search, onSearchChange }: ServicesPageProps) {
  const { modal } = App.useApp()
  const [keyword, setKeyword] = useState(search.keyword ?? '')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [editing, setEditing] = useState<ServiceItem | null | 'new'>(null)
  const [bulkOpen, setBulkOpen] = useState(false)

  useEffect(() => setKeyword(search.keyword ?? ''), [search.keyword])

  const categories = useCategories()
  const services = useServiceList({
    category_id: search.category_id,
    keyword: search.keyword,
    active: search.status ? search.status === 'active' : undefined,
    page: search.page ?? 1,
    page_size: PAGE_SIZE,
  })
  const create = useCreateService()
  const update = useUpdateService()
  const remove = useDeleteService()
  const bulk = useBulkPrice()

  const selectedServices = useMemo(
    () => services.data?.items.filter((s) => selectedIds.includes(s.id)) ?? [],
    [services.data, selectedIds],
  )
  const currentCategory = categories.data?.find((c) => c.id === search.category_id)

  const confirmDelete = (s: ServiceItem) =>
    modal.confirm({
      title: `Xóa dịch vụ "${s.name}"?`,
      content:
        s.orders_30d > 0
          ? 'Dịch vụ đã có đơn hàng nên sẽ không xóa được. Hãy tắt "Đang bán" để ngừng nhận đơn mới.'
          : 'Thợ đã đăng ký dịch vụ này sẽ bị gỡ khỏi danh sách nhận làm.',
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => remove.mutateAsync(s.id).catch(() => undefined),
    })

  return (
    <div className={styles.layout}>
      <CategoryPanel
        categories={categories.data}
        loading={categories.isLoading}
        selectedId={search.category_id}
        onSelect={(id) => {
          setSelectedIds([])
          onSearchChange({ ...search, category_id: id, page: undefined })
        }}
      />

      <Card
        variant="borderless"
        title={currentCategory ? currentCategory.name : 'Tất cả dịch vụ'}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setEditing('new')}>
            Thêm dịch vụ
          </Button>
        }
      >
        <div className={styles.toolbar}>
          <Space wrap>
            <Input.Search
              allowClear
              placeholder="Tìm tên hoặc mô tả dịch vụ"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onSearch={(text) =>
                onSearchChange({ ...search, keyword: text.trim() || undefined, page: undefined })
              }
              style={{ width: 260 }}
              aria-label="Tìm dịch vụ"
            />
            <Select
              allowClear
              placeholder="Mọi trạng thái"
              value={search.status}
              onChange={(status) => onSearchChange({ ...search, status, page: undefined })}
              style={{ width: 160 }}
              aria-label="Lọc theo trạng thái"
              options={[
                { value: 'active', label: 'Đang bán' },
                { value: 'inactive', label: 'Tạm ẩn' },
              ]}
            />
          </Space>
          <Space>
            {selectedIds.length > 0 && (
              <Typography.Text type="secondary">
                Đã chọn {selectedIds.length} dịch vụ
              </Typography.Text>
            )}
            <Button
              icon={<PercentageOutlined />}
              disabled={selectedIds.length === 0}
              onClick={() => setBulkOpen(true)}
            >
              Điều chỉnh giá
            </Button>
          </Space>
        </div>

        {services.error ? (
          <QueryError error={services.error} onRetry={services.refetch} />
        ) : (
          <ServiceTable
            data={services.data}
            loading={services.isLoading || services.isFetching}
            selectedIds={selectedIds}
            togglingId={update.isPending ? update.variables?.id : undefined}
            onSelect={setSelectedIds}
            onPageChange={(page) => onSearchChange({ ...search, page })}
            onEdit={setEditing}
            onDelete={confirmDelete}
            onToggle={(s, active) => update.mutate({ id: s.id, is_active: active })}
          />
        )}
      </Card>

      <ServiceFormModal
        open={editing !== null}
        service={editing === 'new' ? null : editing}
        categories={categories.data ?? []}
        defaultCategoryId={search.category_id}
        loading={create.isPending || update.isPending}
        onCancel={() => setEditing(null)}
        onSubmit={(values) => {
          const action =
            editing === 'new' || editing === null
              ? create.mutateAsync(values)
              : update.mutateAsync({ id: editing.id, ...values })
          action.then(() => setEditing(null)).catch(() => undefined)
        }}
      />

      <BulkPriceModal
        open={bulkOpen}
        services={selectedServices}
        loading={bulk.isPending}
        onCancel={() => setBulkOpen(false)}
        onSubmit={(values) =>
          bulk
            .mutateAsync({ service_ids: selectedIds, ...values })
            .then(() => {
              setBulkOpen(false)
              setSelectedIds([])
            })
            .catch(() => undefined)
        }
      />
    </div>
  )
}
