import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, Switch, Table, Tooltip, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { palette } from '#/theme/tokens'
import type { Paginated } from '#/types/api'
import type { ServiceItem } from '#/types/catalog'
import { formatCurrency, formatNumber, formatSignedPercent } from '#/utils/format'
import { priceGap } from '#/utils/price'

interface ServiceTableProps {
  data?: Paginated<ServiceItem>
  loading: boolean
  selectedIds: number[]
  togglingId?: number
  onSelect: (ids: number[]) => void
  onPageChange: (page: number) => void
  onEdit: (service: ServiceItem) => void
  onDelete: (service: ServiceItem) => void
  onToggle: (service: ServiceItem, active: boolean) => void
}

function ActualPrice({ service }: { service: ServiceItem }) {
  const gap = priceGap(service.base_price, service.avg_final_price_30d)
  if (gap === null)
    return <Typography.Text type="secondary">Chưa có đơn hoàn thành</Typography.Text>
  // Lệch quá 30% so với giá gốc thì nhấn mạnh để admin cân nhắc điều chỉnh
  const strong = Math.abs(gap) >= 30
  return (
    <Tooltip title="Giá chốt trung bình của các đơn hoàn thành trong 30 ngày. Số % là mức chênh so với giá gốc">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span>{formatCurrency(service.avg_final_price_30d)}</span>
        <Typography.Text style={{ fontSize: 13, color: strong ? palette.amber : palette.muted }}>
          {formatSignedPercent(gap)}
        </Typography.Text>
      </div>
    </Tooltip>
  )
}

export function ServiceTable({
  data,
  loading,
  selectedIds,
  togglingId,
  onSelect,
  onPageChange,
  onEdit,
  onDelete,
  onToggle,
}: ServiceTableProps) {
  const columns: TableColumnsType<ServiceItem> = [
    {
      title: 'Dịch vụ',
      key: 'name',
      render: (_, s) => (
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Typography.Text strong type={s.is_active ? undefined : 'secondary'}>
            {s.name}
          </Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 13 }} ellipsis>
            {s.category_name}
            {s.description ? `, ${s.description}` : ''}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Giá gốc',
      key: 'price',
      width: 140,
      align: 'right',
      render: (_, s) => (
        <Typography.Text strong>
          {formatCurrency(s.base_price)}
          {s.unit && <Typography.Text type="secondary"> / {s.unit}</Typography.Text>}
        </Typography.Text>
      ),
    },
    {
      title: 'Giá thực tế 30 ngày',
      key: 'actual',
      width: 155,
      align: 'right',
      render: (_, s) => <ActualPrice service={s} />,
    },
    {
      title: 'Đơn 30 ngày',
      dataIndex: 'orders_30d',
      width: 100,
      align: 'right',
      render: (v: number) => formatNumber(v),
    },
    {
      title: 'Số thợ',
      dataIndex: 'workers',
      width: 100,
      align: 'right',
      render: (v: number) =>
        v === 0 ? <Typography.Text type="warning">Chưa có thợ</Typography.Text> : formatNumber(v),
    },
    {
      title: 'Đang bán',
      key: 'active',
      width: 80,
      align: 'center',
      render: (_, s) => (
        <Switch
          size="small"
          checked={s.is_active}
          loading={togglingId === s.id}
          onChange={(checked) => onToggle(s, checked)}
          aria-label={`Bật tắt dịch vụ ${s.name}`}
        />
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 90,
      align: 'right',
      render: (_, s) => (
        <Space size={0}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(s)}
            aria-label={`Sửa ${s.name}`}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(s)}
            aria-label={`Xóa ${s.name}`}
          />
        </Space>
      ),
    },
  ]

  return (
    <Table<ServiceItem>
      rowKey="id"
      columns={columns}
      dataSource={data?.items}
      loading={loading}
      scroll={{ x: 860 }}
      rowSelection={{
        selectedRowKeys: selectedIds,
        onChange: (keys) => onSelect(keys as number[]),
        preserveSelectedRowKeys: true,
      }}
      locale={{ emptyText: 'Chưa có dịch vụ nào trong mục này' }}
      pagination={
        data && data.total > data.page_size
          ? {
              current: data.page,
              pageSize: data.page_size,
              total: data.total,
              showSizeChanger: false,
              onChange: onPageChange,
            }
          : false
      }
    />
  )
}
