import { useRouter } from '@tanstack/react-router'
import { Badge, Button, Skeleton, Tag, Typography } from 'antd'
import { EmptyBlock } from '#/components/common/EmptyBlock'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/dashboard/dashboard.module.css'
import type { RecentComplaints } from '#/types/dashboard'
import { COMPLAINT_STATUS } from '#/utils/constants'
import { fromNow } from '#/utils/format'

interface RecentComplaintsListProps {
  data?: RecentComplaints
  loading: boolean
}

export function RecentComplaintsList({ data, loading }: RecentComplaintsListProps) {
  const router = useRouter()

  return (
    <SectionCard
      title={
        <>
          Khiếu nại mới{' '}
          <Badge count={data?.total_open} overflowCount={99} style={{ marginLeft: 6 }} />
        </>
      }
      description="Chưa có ai tiếp nhận"
      extra={
        <Button type="link" onClick={() => router.history.push('/complaints?status=open')}>
          Xem tất cả
        </Button>
      }
    >
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : !data?.items.length ? (
        <EmptyBlock text="Không có khiếu nại mới" />
      ) : (
        <ul className={styles.complaints}>
          {data.items.map((c) => (
            <li key={c.id}>
              <div className={styles.complaintTop}>
                <Typography.Text strong>{c.reason}</Typography.Text>
                <Tag color={COMPLAINT_STATUS[c.status].color}>
                  {COMPLAINT_STATUS[c.status].label}
                </Tag>
              </div>
              <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                {c.complainant_name}, đơn #{c.order_id}, {fromNow(c.created_at)}
              </Typography.Text>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}
