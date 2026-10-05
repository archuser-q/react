import { Card, Col, Progress, Row, Skeleton, Statistic, Typography } from 'antd'
import type { ReactNode } from 'react'
import { TrendText } from '#/components/common/TrendText'
import { palette } from '#/theme/tokens'
import type { DashboardStats } from '#/types/dashboard'
import { formatCurrency, formatDecimal, formatNumber, formatSignedPercent } from '#/utils/format'

function StatCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Card variant="borderless" style={{ height: '100%' }}>
      <Typography.Text type="secondary">{label}</Typography.Text>
      <div style={{ marginTop: 6 }}>{children}</div>
    </Card>
  )
}

interface StatCardsProps {
  data?: DashboardStats
  loading: boolean
}

export function StatCards({ data, loading }: StatCardsProps) {
  if (loading && !data) {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Col key={i} xs={24} sm={12} xl={6}>
            <Card variant="borderless">
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }
  if (!data) return null

  const { revenue_month, orders_today, online_workers, satisfaction } = data
  const working = online_workers.online + online_workers.busy
  const workingPercent = online_workers.total_approved
    ? Math.round((working / online_workers.total_approved) * 100)
    : 0

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} xl={6}>
        <StatCard label="Doanh thu tháng này">
          <Statistic value={formatCurrency(revenue_month.value)} />
          <TrendText
            change={revenue_month.change_percent}
            display={formatSignedPercent(revenue_month.change_percent)}
            suffix="so với cùng kỳ tháng trước"
          />
        </StatCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <StatCard label="Đơn tạo hôm nay">
          <Statistic value={formatNumber(orders_today.value)} />
          <TrendText
            change={orders_today.change_percent}
            display={formatSignedPercent(orders_today.change_percent)}
            suffix="so với cùng giờ hôm qua"
          />
        </StatCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <StatCard label="Thợ đang làm việc">
          <Statistic
            value={formatNumber(working)}
            suffix={
              <Typography.Text type="secondary" style={{ fontSize: 15 }}>
                / {formatNumber(online_workers.total_approved)} thợ đã duyệt
              </Typography.Text>
            }
          />
          <Progress
            percent={workingPercent}
            success={{
              percent: online_workers.total_approved
                ? Math.round((online_workers.online / online_workers.total_approved) * 100)
                : 0,
              strokeColor: palette.green,
            }}
            strokeColor={palette.amber}
            showInfo={false}
            size="small"
          />
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {online_workers.online} sẵn sàng nhận đơn, {online_workers.busy} đang bận
          </Typography.Text>
        </StatCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <StatCard label="Điểm hài lòng tháng này">
          <Statistic
            value={formatDecimal(satisfaction.score)}
            suffix={
              <Typography.Text type="secondary" style={{ fontSize: 15 }}>
                / 5 từ {formatNumber(satisfaction.review_count)} đánh giá
              </Typography.Text>
            }
          />
          <TrendText
            change={satisfaction.change}
            display={
              satisfaction.change !== null
                ? `${satisfaction.change > 0 ? '+' : ''}${formatDecimal(satisfaction.change)} điểm`
                : ''
            }
            suffix="so với tháng trước"
          />
        </StatCard>
      </Col>
    </Row>
  )
}
