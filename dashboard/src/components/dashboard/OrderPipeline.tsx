import { Divider, Progress, Skeleton, Statistic, Typography } from 'antd'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/dashboard/dashboard.module.css'
import { palette } from '#/theme/tokens'
import type { OrdersSummary } from '#/types/dashboard'
import { formatNumber } from '#/utils/format'

const LIVE_FLOW = ['pending', 'matched', 'accepted', 'on_the_way', 'arrived', 'in_progress']

interface OrderPipelineProps {
  data?: OrdersSummary
  loading: boolean
}

export function OrderPipeline({ data, loading }: OrderPipelineProps) {
  const live = data?.by_status.filter((s) => LIVE_FLOW.includes(s.status)) ?? []
  const max = Math.max(1, ...live.map((s) => s.count))

  return (
    <SectionCard title="Đơn đang mở" description="Số đơn hiện nằm ở từng bước xử lý">
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 7 }} />
      ) : data ? (
        <>
          <div className={styles.pipelineHead}>
            <Statistic title="Chờ ghép thợ" value={data.waiting} />
            <Statistic title="Đang phục vụ" value={data.active} />
          </div>
          <ol className={styles.pipeline}>
            {live.map((s) => (
              <li key={s.status}>
                <span>{s.label}</span>
                <Progress
                  percent={(s.count / max) * 100}
                  showInfo={false}
                  size="small"
                  strokeColor={s.status === 'pending' ? palette.amber : palette.primary}
                />
                <strong className={styles.num}>{formatNumber(s.count)}</strong>
              </li>
            ))}
          </ol>
          <Divider style={{ margin: '12px 0' }} />
          <div className={styles.pipelineFoot}>
            <Typography.Text>
              Hoàn thành hôm nay <strong>{formatNumber(data.completed_today)}</strong>
            </Typography.Text>
            <Typography.Text>
              Hủy hôm nay <strong>{formatNumber(data.cancelled_today)}</strong>
            </Typography.Text>
            <Typography.Text type="secondary">
              Tổng từ trước đến nay {formatNumber(data.total)} đơn
            </Typography.Text>
          </div>
        </>
      ) : null}
    </SectionCard>
  )
}
