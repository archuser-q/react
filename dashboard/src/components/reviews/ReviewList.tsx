import { List, Rate, Typography } from 'antd'
import { ReviewTags } from '#/components/reviews/ReviewTags'
import styles from '#/components/reviews/reviews.module.css'
import type { Paginated } from '#/types/api'
import type { ReviewListItem } from '#/types/review'
import { formatDateTime } from '#/utils/format'

interface ReviewListProps {
  data?: Paginated<ReviewListItem>
  loading: boolean
  selectedId?: number
  emptyText: string
  onPageChange: (page: number) => void
  onOpen: (id: number) => void
}

export function ReviewList({
  data,
  loading,
  selectedId,
  emptyText,
  onPageChange,
  onOpen,
}: ReviewListProps) {
  return (
    <List<ReviewListItem>
      dataSource={data?.items}
      loading={loading}
      locale={{ emptyText }}
      pagination={
        data && data.total > data.page_size
          ? {
              current: data.page,
              pageSize: data.page_size,
              total: data.total,
              showSizeChanger: false,
              showTotal: (total) => `${total} đánh giá`,
              onChange: onPageChange,
            }
          : false
      }
      renderItem={(r) => (
        <List.Item key={r.id} className={styles.itemWrap}>
          <button
            type="button"
            className={[
              styles.item,
              r.id === selectedId ? styles.itemSelected : '',
              r.is_hidden ? styles.itemHidden : '',
              r.is_flagged && !r.is_hidden ? styles.itemFlagged : '',
            ].join(' ')}
            onClick={() => onOpen(r.id)}
          >
            <div className={styles.itemHead}>
              <Rate disabled value={r.rating} style={{ fontSize: 14 }} />
              <ReviewTags
                isFlagged={r.is_flagged}
                isHidden={r.is_hidden}
                flagReason={r.flag_reason}
              />
            </div>
            <Typography.Paragraph
              ellipsis={{ rows: 2 }}
              style={{ margin: '6px 0' }}
              type={r.comment ? undefined : 'secondary'}
              italic={!r.comment}
            >
              {r.comment || 'Khách không để lại nhận xét'}
            </Typography.Paragraph>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {r.customer.full_name} đánh giá thợ {r.worker.full_name}, {r.service_name}, đơn #
              {r.order_id}, {formatDateTime(r.created_at)}
            </Typography.Text>
          </button>
        </List.Item>
      )}
    />
  )
}
