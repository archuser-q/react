import { StarFilled } from '@ant-design/icons'
import { Card, Progress, Skeleton, Typography } from 'antd'
import styles from '#/components/reviews/reviews.module.css'
import { palette } from '#/theme/tokens'
import type { ReviewStats } from '#/types/review'
import { formatDecimal, formatNumber } from '#/utils/format'

interface ReviewStatsBarProps {
  data?: ReviewStats
  onRatingClick: (star: number) => void
}

export function ReviewStatsBar({ data, onRatingClick }: ReviewStatsBarProps) {
  if (!data) {
    return (
      <Card variant="borderless">
        <Skeleton active paragraph={{ rows: 3 }} />
      </Card>
    )
  }

  return (
    <Card variant="borderless">
      <div className={styles.stats}>
        <div className={styles.average}>
          <span className={styles.averageValue}>{formatDecimal(data.average)}</span>
          <span>
            <StarFilled style={{ color: palette.amber }} /> trung bình
          </span>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {formatNumber(data.visible)} đánh giá đang hiển thị
          </Typography.Text>
        </div>
        <div className={styles.distribution}>
          {data.distribution.map((b) => (
            <button
              key={b.star}
              type="button"
              className={styles.bucket}
              onClick={() => onRatingClick(b.star)}
              aria-label={`Lọc đánh giá ${b.star} sao`}
            >
              <span>{b.star} sao</span>
              <Progress
                percent={b.percent}
                showInfo={false}
                size="small"
                strokeColor={
                  b.star >= 4 ? palette.green : b.star === 3 ? palette.amber : palette.red
                }
              />
              <span className={styles.num}>{formatNumber(b.count)}</span>
            </button>
          ))}
        </div>
        <div className={styles.attention}>
          <div>
            <strong className={data.flagged ? styles.alert : undefined}>
              {formatNumber(data.flagged)}
            </strong>
            <span>đang bị gắn cờ</span>
          </div>
          <div>
            <strong>{formatNumber(data.low)}</strong>
            <span>đánh giá từ 2 sao trở xuống</span>
          </div>
          <div>
            <strong>{formatNumber(data.hidden)}</strong>
            <span>đã bị ẩn</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
