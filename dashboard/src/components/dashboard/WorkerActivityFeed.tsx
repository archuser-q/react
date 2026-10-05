import { Skeleton, Timeline, Typography } from 'antd'
import { EmptyBlock } from '#/components/common/EmptyBlock'
import { SectionCard } from '#/components/common/SectionCard'
import { palette } from '#/theme/tokens'
import type { WorkerActivity } from '#/types/dashboard'
import { formatTime } from '#/utils/format'

const DOT_COLOR: Record<string, string> = {
  completed: palette.green,
  accepted: palette.primary,
  on_the_way: palette.amber,
}

interface WorkerActivityFeedProps {
  data?: WorkerActivity[]
  loading: boolean
}

export function WorkerActivityFeed({ data, loading }: WorkerActivityFeedProps) {
  return (
    <SectionCard title="Hoạt động của thợ hôm nay" description="Các bước cập nhật mới nhất">
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : !data?.length ? (
        <EmptyBlock text="Hôm nay chưa có thợ nào cập nhật đơn" />
      ) : (
        <Timeline
          items={data.map((a) => ({
            key: `${a.order_id}-${a.status}-${a.created_at}`,
            color: DOT_COLOR[a.status] ?? palette.muted,
            content: (
              <>
                <Typography.Text strong>{a.worker_name}</Typography.Text> {a.action}{' '}
                <Typography.Text type="secondary">#{a.order_id}</Typography.Text>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                    {formatTime(a.created_at)}
                  </Typography.Text>
                </div>
              </>
            ),
          }))}
        />
      )}
    </SectionCard>
  )
}
