import { Link } from '@tanstack/react-router'
import { Table, Tag, Tooltip, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { FACTORS, formatScore } from '#/components/matching/factors'
import styles from '#/components/matching/matching.module.css'
import type { RankedWorker } from '#/types/matching'

function ScoreBar({ worker }: { worker: RankedWorker }) {
  return (
    <Tooltip
      title={
        <div>
          {FACTORS.map((f) => (
            <div key={f.key}>
              {f.label}: {formatScore(worker.scores[f.key])} điểm, đóng góp{' '}
              {formatScore(worker.contributions[f.key])}
            </div>
          ))}
        </div>
      }
    >
      <div className={styles.scoreBar} aria-label={`Điểm tổng ${formatScore(worker.total_score)}`}>
        {FACTORS.map((f) => (
          <span
            key={f.key}
            style={{ width: `${worker.contributions[f.key] * 100}%`, background: f.color }}
          />
        ))}
      </div>
    </Tooltip>
  )
}

const columns: TableColumnsType<RankedWorker> = [
  { title: '#', dataIndex: 'rank', width: 48, align: 'center' },
  {
    title: 'Thợ',
    key: 'worker',
    render: (_, w) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to="/workers/$workerId" params={{ workerId: w.worker_id }}>
          {w.full_name}
        </Link>
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          {w.availability === 'busy' ? 'Đang bận, ' : ''}
          {w.active_orders} đơn đang làm
          {w.price_ratio !== null && `, giá TB ${Math.round(w.price_ratio * 100)}% giá gốc`}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: 'Khoảng cách',
    dataIndex: 'distance_km',
    width: 110,
    align: 'right',
    render: (v: number) => `${v.toFixed(2)} km`,
  },
  {
    title: 'Điểm thành phần (0–100)',
    children: FACTORS.map((f) => ({
      title: (
        <span>
          <i className={styles.dot} style={{ background: f.color }} />
          {f.label}
        </span>
      ),
      key: f.key,
      width: 110,
      align: 'right' as const,
      render: (_: unknown, w: RankedWorker) => formatScore(w.scores[f.key]),
    })),
  },
  {
    title: 'Điểm tổng',
    key: 'total',
    width: 210,
    render: (_, w) => (
      <div className={styles.totalCell}>
        <ScoreBar worker={w} />
        <strong>{formatScore(w.total_score)}</strong>
      </div>
    ),
  },
  {
    title: '',
    key: 'offer',
    width: 110,
    render: (_, w) =>
      w.will_receive_offer ? (
        <Tag color="success" style={{ margin: 0 }}>
          Nhận offer
        </Tag>
      ) : null,
  },
]

export function RankingTable({ data }: { data: RankedWorker[] }) {
  return (
    <Table<RankedWorker>
      rowKey="worker_id"
      size="small"
      columns={columns}
      dataSource={data}
      pagination={data.length > 20 ? { pageSize: 20, showSizeChanger: false } : false}
      scroll={{ x: 1150 }}
      rowClassName={(w) => (w.will_receive_offer ? styles.offerRow : '')}
      locale={{ emptyText: 'Không có thợ nào đủ điều kiện trong bán kính này' }}
    />
  )
}
