import { EnvironmentOutlined } from '@ant-design/icons'
import { Descriptions, Image, Typography } from 'antd'
import { Link } from '@tanstack/react-router'
import { PersonCell } from '#/components/common/PersonCell'
import { SectionCard } from '#/components/common/SectionCard'
import type { OrderDetail } from '#/types/order'
import { formatCurrency } from '#/utils/format'

export function OrderInfoCard({ order }: { order: OrderDetail }) {
  const mapUrl = `https://www.google.com/maps?q=${order.latitude},${order.longitude}`

  return (
    <SectionCard title="Thông tin đơn">
      <Descriptions
        column={{ xs: 1, md: 2 }}
        size="small"
        items={[
          {
            key: 'customer',
            label: 'Khách hàng',
            children: <PersonCell name={order.customer.full_name} sub={order.customer.phone} />,
          },
          {
            key: 'worker',
            label: 'Thợ',
            children: order.worker ? (
              <Link
                to="/workers/$workerId"
                params={{ workerId: order.worker.id }}
                aria-label={`Hồ sơ thợ ${order.worker.full_name}`}
              >
                <PersonCell
                  name={order.worker.full_name}
                  sub={`${order.worker.phone}, Trust Score ${Math.round(order.worker.trust_score * 100)}`}
                />
              </Link>
            ) : (
              <Typography.Text type="secondary">Chưa ghép được thợ</Typography.Text>
            ),
          },
          {
            key: 'service',
            label: 'Dịch vụ',
            children: `${order.service.name} (giá gốc ${formatCurrency(order.service.base_price)})`,
          },
          {
            key: 'address',
            label: 'Địa chỉ',
            children: (
              <span>
                {order.address_line}{' '}
                <a href={mapUrl} target="_blank" rel="noreferrer">
                  <EnvironmentOutlined /> Xem bản đồ
                </a>
              </span>
            ),
          },
          {
            key: 'desc',
            label: 'Mô tả của khách',
            span: 'filled',
            children: order.description || (
              <Typography.Text type="secondary">Khách không mô tả thêm</Typography.Text>
            ),
          },
        ]}
      />
      {order.image_urls.length > 0 && (
        <Image.PreviewGroup>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {order.image_urls.map((url, i) => (
              <Image
                key={url}
                src={url}
                alt={`Ảnh khách gửi ${i + 1}`}
                width={96}
                height={96}
                style={{ objectFit: 'cover', borderRadius: 6 }}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      )}
    </SectionCard>
  )
}
