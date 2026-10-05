import {
  AlertOutlined,
  ClockCircleOutlined,
  FileProtectOutlined,
  FlagOutlined,
  IdcardOutlined,
  MessageOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { useRouter } from '@tanstack/react-router'
import { Card, Skeleton, Typography } from 'antd'
import type { ReactNode } from 'react'
import styles from '#/components/dashboard/dashboard.module.css'
import type { PendingTask, PendingTaskKey, PendingTasks } from '#/types/dashboard'
import { SEVERITY } from '#/utils/constants'
import { formatNumber, formatSla, fromNow } from '#/utils/format'

const TASK_ICON: Record<PendingTaskKey, ReactNode> = {
  worker_verification: <IdcardOutlined />,
  worker_documents: <FileProtectOutlined />,
  complaints_open: <AlertOutlined />,
  complaints_processing: <MessageOutlined />,
  unmatched_orders: <ClockCircleOutlined />,
  flagged_reviews: <FlagOutlined />,
  pending_payments: <WalletOutlined />,
}

function TaskTile({ task }: { task: PendingTask }) {
  const router = useRouter()
  const tone = SEVERITY[task.severity].tone
  const sla = formatSla(task.sla_minutes)
  const done = task.count === 0

  return (
    <button
      type="button"
      className={`${styles.task} ${styles[`task_${tone}`]}`}
      onClick={() => router.history.push(task.link)}
      disabled={done}
    >
      <span className={styles.taskHead}>
        <span className={styles.taskIcon}>{TASK_ICON[task.key]}</span>
        <span className={styles.taskTitle}>{task.title}</span>
      </span>
      <span className={styles.taskCount}>{formatNumber(task.count)}</span>
      <span className={styles.taskMeta}>
        {done ? (
          'Không còn việc tồn'
        ) : task.overdue > 0 ? (
          <>
            <strong>{formatNumber(task.overdue)} quá hạn</strong>
            {sla && ` (hạn ${sla})`}
          </>
        ) : (
          <>Trong hạn {sla}</>
        )}
      </span>
      {!done && task.oldest_at && (
        <span className={styles.taskMeta}>Cũ nhất từ {fromNow(task.oldest_at)}</span>
      )}
    </button>
  )
}

interface PendingTaskBoardProps {
  data?: PendingTasks
  loading: boolean
}

export function PendingTaskBoard({ data, loading }: PendingTaskBoardProps) {
  return (
    <Card variant="borderless" className={styles.board}>
      <div className={styles.boardHead}>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Việc cần xử lý
          </Typography.Title>
          <Typography.Text type="secondary">
            Xếp theo mức độ gấp. Bấm vào từng ô để mở danh sách tương ứng.
          </Typography.Text>
        </div>
        {data && (
          <div className={styles.boardTotals}>
            <span>
              <strong>{formatNumber(data.total)}</strong> việc đang chờ
            </span>
            <span className={data.total_overdue ? styles.overdueTotal : undefined}>
              <strong>{formatNumber(data.total_overdue)}</strong> quá hạn
            </span>
          </div>
        )}
      </div>

      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : (
        <div className={styles.taskGrid}>
          {data?.items.map((task) => (
            <TaskTile key={task.key} task={task} />
          ))}
        </div>
      )}
    </Card>
  )
}
