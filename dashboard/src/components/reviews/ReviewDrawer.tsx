import { Alert, Descriptions, Drawer, Rate, Skeleton, Space, Tag, Typography } from 'antd'
import { Link } from '@tanstack/react-router'
import { PersonCell } from '#/components/common/PersonCell'
import { OrderStatusTag } from '#/components/orders/OrderStatusTag'
import { ReviewActions } from '#/components/reviews/ReviewActions'
import { ReviewTags } from '#/components/reviews/ReviewTags'
import styles from '#/components/reviews/reviews.module.css'
import { useReviewDetail } from '#/hooks/useReviews'
import type { ReviewDetail } from '#/types/review'
import { COMPLAINT_STATUS } from '#/utils/constants'
import { formatCurrency, formatDateTime, formatDecimal, fromNow } from '#/utils/format'

function Body({ review }: { review: ReviewDetail }) {
  const { order, worker_stats: ws } = review

  return (
    <>
      {review.is_hidden && (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          title="Đánh giá này đang bị ẩn"
          description="Khách hàng và thợ không còn thấy đánh giá này trên ứng dụng, và nó không được tính vào số đánh giá của thợ."
        />
      )}

      <section className={styles.block}>
        <Space size={10}>
          <Rate disabled value={review.rating} />
          <ReviewTags
            isFlagged={review.is_flagged}
            isHidden={false}
            flagReason={review.flag_reason}
          />
        </Space>
        <Typography.Paragraph
          className={styles.comment}
          type={review.comment ? undefined : 'secondary'}
          italic={!review.comment}
        >
          {review.comment || 'Khách không để lại nhận xét'}
        </Typography.Paragraph>
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          Gửi lúc {formatDateTime(review.created_at)} ({fromNow(review.created_at)})
        </Typography.Text>
      </section>

      <section className={styles.block}>
        <Typography.Text strong>Người đánh giá và thợ</Typography.Text>
        <div className={styles.people}>
          <PersonCell
            name={review.customer.full_name}
            sub={`Khách hàng, ${review.customer.phone}`}
          />
          <Link to="/workers/$workerId" params={{ workerId: review.worker.id }}>
            <PersonCell name={review.worker.full_name} sub={`Thợ, ${review.worker.phone}`} />
          </Link>
        </div>
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          Thợ này: trung bình {formatDecimal(ws.average)} sao từ {ws.visible_reviews} đánh giá,{' '}
          {ws.low_reviews} đánh giá thấp, {ws.flagged_reviews} đang bị gắn cờ, {ws.hidden_reviews}{' '}
          đã ẩn
        </Typography.Text>
      </section>

      <section className={styles.block}>
        <div className={styles.rowBetween}>
          <Typography.Text strong>Đơn hàng</Typography.Text>
          <Link to="/orders/$orderId" params={{ orderId: order.id }}>
            Mở đơn #{order.id}
          </Link>
        </div>
        <Descriptions
          column={1}
          size="small"
          bordered
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
            { key: 'done', label: 'Hoàn thành lúc', children: formatDateTime(order.completed_at) },
          ]}
        />
        {review.complaints.length > 0 && (
          <div className={styles.complaints}>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Khiếu nại của đơn này:
            </Typography.Text>
            {review.complaints.map((c) => (
              <Link key={c.id} to="/complaints" search={{ id: c.id }}>
                <Space size={6}>
                  <span>{c.reason}</span>
                  <Tag color={COMPLAINT_STATUS[c.status].color} style={{ margin: 0 }}>
                    {COMPLAINT_STATUS[c.status].label}
                  </Tag>
                </Space>
              </Link>
            ))}
          </div>
        )}
      </section>

      {review.moderated_at && (
        <section className={styles.block}>
          <Typography.Text strong>Lần kiểm duyệt gần nhất</Typography.Text>
          <div className={styles.moderation}>
            {review.moderation_note && (
              <Typography.Paragraph style={{ margin: 0 }}>
                {review.moderation_note}
              </Typography.Paragraph>
            )}
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {review.moderated_by_name ?? 'Quản trị viên'}, lúc{' '}
              {formatDateTime(review.moderated_at)}
            </Typography.Text>
          </div>
        </section>
      )}
    </>
  )
}

interface ReviewDrawerProps {
  reviewId: number | null
  onClose: () => void
}

export function ReviewDrawer({ reviewId, onClose }: ReviewDrawerProps) {
  const { data, isLoading, error } = useReviewDetail(reviewId)

  return (
    <Drawer
      open={reviewId !== null}
      onClose={onClose}
      size={540}
      destroyOnHidden
      title={data ? `Đánh giá #${data.id}` : 'Đánh giá'}
      footer={data && <ReviewActions review={data} />}
    >
      {isLoading && <Skeleton active paragraph={{ rows: 10 }} />}
      {error && <Alert type="error" showIcon title={error.message} />}
      {data && <Body review={data} />}
    </Drawer>
  )
}
