import { Alert, Descriptions, Divider, Drawer, Rate, Skeleton, Space, Tag, Typography } from 'antd'
import { Link } from '@tanstack/react-router'
import { PersonCell } from '#/components/common/PersonCell'
import { ComplaintActions } from '#/components/complaints/ComplaintActions'
import styles from '#/components/complaints/complaints.module.css'
import { OrderStatusTag } from '#/components/orders/OrderStatusTag'
import { useComplaintDetail } from '#/hooks/useComplaints'
import type { ComplaintDetail } from '#/types/complaint'
import { complaintWaiting, formatWaiting } from '#/utils/complaint'
import { COMPLAINT_STATUS, USER_ROLE_LABEL } from '#/utils/constants'
import { formatCurrency, formatDateTime, fromNow } from '#/utils/format'

function SlaAlert({ complaint }: { complaint: ComplaintDetail }) {
  const waiting = complaintWaiting(complaint.status, complaint.created_at)
  if (!waiting?.overdue) return null
  return (
    <Alert
      type="error"
      showIcon
      style={{ marginBottom: 16 }}
      title={`Quá hạn xử lý: đã chờ ${formatWaiting(waiting.hours)}`}
      description={`Khiếu nại ở trạng thái "${COMPLAINT_STATUS[complaint.status].label}" cần được xử lý trong ${waiting.sla} giờ.`}
    />
  )
}

function Body({ complaint }: { complaint: ComplaintDetail }) {
  const { order, history } = complaint
  const closed = complaint.status === 'resolved' || complaint.status === 'rejected'

  return (
    <>
      <SlaAlert complaint={complaint} />

      <section className={styles.block}>
        <Typography.Title level={5} className={styles.blockTitle}>
          {complaint.reason}
        </Typography.Title>
        <Typography.Paragraph style={{ marginBottom: 6 }}>
          {complaint.description || (
            <Typography.Text type="secondary" italic>
              Người gửi không mô tả thêm
            </Typography.Text>
          )}
        </Typography.Paragraph>
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          Gửi lúc {formatDateTime(complaint.created_at)} ({fromNow(complaint.created_at)})
        </Typography.Text>
      </section>

      <section className={styles.block}>
        <Typography.Text strong>Người gửi</Typography.Text>
        <div className={styles.row}>
          <PersonCell name={complaint.complainant.full_name} sub={complaint.complainant.phone} />
          <Tag style={{ margin: 0 }}>{USER_ROLE_LABEL[complaint.complainant.role]}</Tag>
        </div>
        {history.complainant_total > 1 && (
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            Người này đã gửi {history.complainant_total} khiếu nại
          </Typography.Text>
        )}
      </section>

      <section className={styles.block}>
        <div className={styles.row}>
          <Typography.Text strong>Đơn hàng liên quan</Typography.Text>
          <Link to="/orders/$orderId" params={{ orderId: order.id }}>
            Mở đơn #{order.id}
          </Link>
        </div>
        <Descriptions
          column={1}
          size="small"
          bordered
          style={{ marginTop: 8 }}
          items={[
            {
              key: 'status',
              label: 'Trạng thái',
              children: <OrderStatusTag status={order.status} />,
            },
            {
              key: 'service',
              label: 'Dịch vụ',
              children: `${order.category_name}, ${order.service_name}`,
            },
            { key: 'amount', label: 'Giá trị', children: formatCurrency(order.amount) },
            {
              key: 'customer',
              label: 'Khách hàng',
              children: `${order.customer.full_name}, ${order.customer.phone}`,
            },
            {
              key: 'worker',
              label: 'Thợ',
              children: order.worker ? (
                <Link to="/workers/$workerId" params={{ workerId: order.worker.id }}>
                  {order.worker.full_name}, {order.worker.phone}
                </Link>
              ) : (
                <Typography.Text type="secondary">Chưa có thợ</Typography.Text>
              ),
            },
            {
              key: 'completed',
              label: 'Hoàn thành lúc',
              children: formatDateTime(order.completed_at),
            },
            {
              key: 'review',
              label: 'Khách chấm',
              children: complaint.review ? (
                <Space size={6}>
                  <Rate disabled value={complaint.review.rating} style={{ fontSize: 13 }} />
                  {complaint.review.comment && (
                    <Typography.Text type="secondary">{complaint.review.comment}</Typography.Text>
                  )}
                </Space>
              ) : (
                <Typography.Text type="secondary">Chưa đánh giá</Typography.Text>
              ),
            },
          ]}
        />
        {order.worker && history.worker_total > 1 && (
          <Alert
            type={history.worker_total >= 3 ? 'warning' : 'info'}
            showIcon
            style={{ marginTop: 12 }}
            title={`Thợ ${order.worker.full_name} có ${history.worker_total} khiếu nại, ${history.worker_resolved} đã giải quyết`}
          />
        )}
      </section>

      <Divider style={{ margin: '16px 0' }} />

      <section className={styles.block}>
        <Typography.Text strong>Xử lý</Typography.Text>
        {closed ? (
          <div className={styles.result}>
            <Typography.Paragraph style={{ margin: 0 }}>
              {complaint.resolution}
            </Typography.Paragraph>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {complaint.handled_by?.full_name ?? 'Quản trị viên'}, lúc{' '}
              {formatDateTime(complaint.resolved_at)}
            </Typography.Text>
          </div>
        ) : complaint.handled_by ? (
          <Typography.Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
            Đang được {complaint.handled_by.full_name} xử lý.
          </Typography.Paragraph>
        ) : (
          <Typography.Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
            Chưa có ai tiếp nhận.
          </Typography.Paragraph>
        )}
      </section>
    </>
  )
}

interface ComplaintDrawerProps {
  complaintId: number | null
  onClose: () => void
}

export function ComplaintDrawer({ complaintId, onClose }: ComplaintDrawerProps) {
  const { data, isLoading, error } = useComplaintDetail(complaintId)

  return (
    <Drawer
      open={complaintId !== null}
      onClose={onClose}
      size={560}
      destroyOnHidden
      title={
        data ? (
          <Space size={8}>
            <span>Khiếu nại #{data.id}</span>
            <Tag color={COMPLAINT_STATUS[data.status].color} style={{ margin: 0 }}>
              {COMPLAINT_STATUS[data.status].label}
            </Tag>
          </Space>
        ) : (
          'Khiếu nại'
        )
      }
      footer={data && <ComplaintActions complaint={data} />}
    >
      {isLoading && <Skeleton active paragraph={{ rows: 10 }} />}
      {error && <Alert type="error" showIcon title={error.message} />}
      {data && <Body complaint={data} />}
    </Drawer>
  )
}
