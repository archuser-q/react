import { FlagFilled } from '@ant-design/icons'
import { Divider, Rate, Tag, Typography } from 'antd'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/orders/orders.module.css'
import type { OrderDetail } from '#/types/order'
import { COMPLAINT_STATUS } from '#/utils/constants'
import { formatDateTime, fromNow } from '#/utils/format'

export function OrderFeedbackCard({ order }: { order: OrderDetail }) {
  const { review, complaints } = order

  return (
    <SectionCard title="Đánh giá và khiếu nại">
      <Typography.Text strong>Đánh giá của khách</Typography.Text>
      {review ? (
        <div style={{ marginTop: 6 }}>
          <Rate disabled value={review.rating} style={{ fontSize: 14 }} />
          <Typography.Paragraph style={{ margin: '4px 0' }}>
            {review.comment || (
              <Typography.Text type="secondary" italic>
                Khách không để lại nhận xét
              </Typography.Text>
            )}
          </Typography.Paragraph>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {fromNow(review.created_at)}
          </Typography.Text>
          {review.is_flagged && (
            <div>
              <Tag color="error" icon={<FlagFilled />} style={{ marginTop: 6 }}>
                Bị gắn cờ{review.flag_reason ? `: ${review.flag_reason}` : ''}
              </Tag>
            </div>
          )}
        </div>
      ) : (
        <Typography.Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
          {order.status === 'completed'
            ? 'Khách chưa đánh giá'
            : 'Chỉ đánh giá được sau khi hoàn thành'}
        </Typography.Paragraph>
      )}

      <Divider style={{ margin: '12px 0' }} />
      <Typography.Text strong>Khiếu nại</Typography.Text>
      {complaints.length === 0 ? (
        <Typography.Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
          Không có khiếu nại
        </Typography.Paragraph>
      ) : (
        <ul className={styles.payments}>
          {complaints.map((c) => (
            <li key={c.id}>
              <div className={styles.line}>
                <span>{c.reason}</span>
                <Tag color={COMPLAINT_STATUS[c.status].color} style={{ margin: 0 }}>
                  {COMPLAINT_STATUS[c.status].label}
                </Tag>
              </div>
              <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                Gửi lúc {formatDateTime(c.created_at)}
                {c.resolved_at && `, xử lý xong lúc ${formatDateTime(c.resolved_at)}`}
              </Typography.Text>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}
