import { ReloadOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography } from 'antd'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import { QueryError } from '#/components/common/QueryError'
import styles from '#/components/dashboard/dashboard.module.css'
import { KpiGrid } from '#/components/dashboard/KpiGrid'
import { OrderPipeline } from '#/components/dashboard/OrderPipeline'
import { OrdersByHourChart } from '#/components/dashboard/OrdersByHourChart'
import { PendingTaskBoard } from '#/components/dashboard/PendingTaskBoard'
import { RecentComplaintsList } from '#/components/dashboard/RecentComplaintsList'
import { RecentOrdersTable } from '#/components/dashboard/RecentOrdersTable'
import { RevenueChart } from '#/components/dashboard/RevenueChart'
import { ServiceBreakdownChart } from '#/components/dashboard/ServiceBreakdownChart'
import { StatCards } from '#/components/dashboard/StatCards'
import { SystemSummaryPanel } from '#/components/dashboard/SystemSummaryPanel'
import { TopWorkersList } from '#/components/dashboard/TopWorkersList'
import { WorkerActivityFeed } from '#/components/dashboard/WorkerActivityFeed'
import {
  useDashboardOverview,
  useOrdersByHour,
  useQuickView,
  useRefreshDashboard,
} from '#/hooks/useDashboard'
import type { Period } from '#/types/dashboard'
import { formatClock } from '#/utils/format'

export function OverviewPage() {
  const [period, setPeriod] = useState<Period>('today')
  const [hourDate, setHourDate] = useState<Dayjs | null>(null)

  const overview = useDashboardOverview()
  const quick = useQuickView(period)
  const hourly = useOrdersByHour(hourDate?.format('YYYY-MM-DD'))
  const refresh = useRefreshDashboard()

  const refreshing = overview.isFetching || quick.isFetching || hourly.isFetching
  const updatedAt = Math.max(overview.dataUpdatedAt, quick.dataUpdatedAt)
  const error = overview.error ?? quick.error

  return (
    <>
      <div className={styles.pageBar}>
        <Typography.Text type="secondary">
          {updatedAt
            ? `Cập nhật lúc ${formatClock(updatedAt)}, tự làm mới mỗi phút`
            : 'Đang tải số liệu'}
        </Typography.Text>
        <Button icon={<ReloadOutlined spin={refreshing} />} onClick={refresh} disabled={refreshing}>
          Làm mới
        </Button>
      </div>

      {error && (
        <div style={{ marginBottom: 16 }}>
          <QueryError error={error} onRetry={refresh} />
        </div>
      )}

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <PendingTaskBoard data={quick.data?.pending_tasks} loading={quick.isLoading} />
        </Col>

        <Col span={24}>
          <StatCards data={overview.data?.stats} loading={overview.isLoading} />
        </Col>

        <Col xs={24} xl={16}>
          <RevenueChart data={overview.data?.revenue_chart} loading={overview.isLoading} />
        </Col>
        <Col xs={24} xl={8}>
          <ServiceBreakdownChart
            data={overview.data?.service_breakdown}
            loading={overview.isLoading}
          />
        </Col>

        <Col xs={24} xl={16}>
          <OrdersByHourChart
            data={hourly.data}
            loading={hourly.isLoading}
            date={hourDate}
            onDateChange={setHourDate}
          />
        </Col>
        <Col xs={24} xl={8}>
          <OrderPipeline data={quick.data?.summary.orders} loading={quick.isLoading} />
        </Col>

        <Col span={24}>
          <KpiGrid
            data={quick.data?.kpis}
            loading={quick.isLoading}
            stale={quick.isPlaceholderData}
            period={period}
            onPeriodChange={setPeriod}
          />
        </Col>

        <Col span={24}>
          <SystemSummaryPanel data={quick.data?.summary} loading={quick.isLoading} />
        </Col>

        <Col xs={24} lg={12} xl={8}>
          <WorkerActivityFeed
            data={overview.data?.worker_activities}
            loading={overview.isLoading}
          />
        </Col>
        <Col xs={24} lg={12} xl={8}>
          <TopWorkersList data={overview.data?.top_workers} loading={overview.isLoading} />
        </Col>
        <Col xs={24} xl={8}>
          <RecentComplaintsList
            data={overview.data?.recent_complaints}
            loading={overview.isLoading}
          />
        </Col>

        <Col span={24}>
          <RecentOrdersTable data={overview.data?.recent_orders} loading={overview.isLoading} />
        </Col>
      </Row>
    </>
  )
}
