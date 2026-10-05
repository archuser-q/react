import { StarFilled } from '@ant-design/icons'
import { Progress, Skeleton, Typography } from 'antd'
import { EmptyBlock } from '#/components/common/EmptyBlock'
import { PersonAvatar } from '#/components/common/PersonAvatar'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/dashboard/dashboard.module.css'
import { palette } from '#/theme/tokens'
import type { TopWorker } from '#/types/dashboard'
import { formatDecimal, formatNumber } from '#/utils/format'

interface TopWorkersListProps {
  data?: TopWorker[]
  loading: boolean
}

export function TopWorkersList({ data, loading }: TopWorkersListProps) {
  return (
    <SectionCard
      title="Thợ có điểm tin cậy cao nhất"
      description="Xếp theo Trust Score, rồi đến số đơn hoàn thành"
    >
      {loading && !data ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : !data?.length ? (
        <EmptyBlock text="Chưa có thợ nào được đánh giá" />
      ) : (
        <ol className={styles.ranking}>
          {data.map((w, i) => (
            <li key={w.user_id}>
              <span className={styles.rank}>{i + 1}</span>
              <PersonAvatar name={w.full_name} src={w.avatar_url} size={36} />
              <div className={styles.rankBody}>
                <Typography.Text strong ellipsis>
                  {w.full_name}
                </Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                  <StarFilled style={{ color: palette.amber }} /> {formatDecimal(w.avg_rating)} từ{' '}
                  {formatNumber(w.review_count)} lượt, {formatNumber(w.completed_orders)} đơn
                </Typography.Text>
              </div>
              <Progress
                type="circle"
                size={42}
                percent={Math.round(w.trust_score * 100)}
                strokeColor={palette.green}
                format={(p) => <span className={styles.num}>{p}</span>}
              />
            </li>
          ))}
        </ol>
      )}
    </SectionCard>
  )
}
