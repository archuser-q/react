import { DualAxes } from '@ant-design/charts'
import { Skeleton, Space, Typography } from 'antd'
import { ChartBox } from '#/components/common/ChartBox'
import { EmptyBlock } from '#/components/common/EmptyBlock'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/dashboard/dashboard.module.css'
import { FONT_FAMILY, palette } from '#/theme/tokens'
import type { MonthlyPoint } from '#/types/dashboard'
import { formatCompactVnd, formatCurrency, formatNumber } from '#/utils/format'

interface RevenueChartProps {
  data?: MonthlyPoint[]
  loading: boolean
}

export function RevenueChart({ data, loading }: RevenueChartProps) {
  const total = data?.reduce((sum, p) => sum + p.revenue, 0) ?? 0
  const orders = data?.reduce((sum, p) => sum + p.orders, 0) ?? 0

  return (
    <SectionCard
      title="Doanh thu và đơn hoàn thành"
      description={`${data?.length ?? 9} tháng gần nhất, tính theo ngày hoàn thành đơn`}
      extra={
        data && (
          <Space size={20} className={styles.chartTotals}>
            <span>
              <Typography.Text type="secondary">Tổng doanh thu</Typography.Text>
              <strong>{formatCompactVnd(total)}</strong>
            </span>
            <span>
              <Typography.Text type="secondary">Tổng đơn</Typography.Text>
              <strong>{formatNumber(orders)}</strong>
            </span>
          </Space>
        )
      }
    >
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : !data?.length ? (
        <EmptyBlock text="Chưa có đơn hoàn thành nào" />
      ) : (
        <>
          <div className={styles.legend}>
            <span>
              <i style={{ background: palette.primary }} /> Doanh thu
            </span>
            <span>
              <i className={styles.legendLine} style={{ background: palette.amber }} /> Số đơn hoàn
              thành
            </span>
          </div>
          <ChartBox height={300}>
            {(width) => (
              <DualAxes
                width={width}
                height={300}
                autoFit={false}
                data={data}
                xField="label"
                theme={{ fontFamily: FONT_FAMILY }}
                legend={false}
                children={[
                  {
                    type: 'interval',
                    yField: 'revenue',
                    style: {
                      fill: palette.primary,
                      maxWidth: 32,
                      radiusTopLeft: 4,
                      radiusTopRight: 4,
                    },
                    axis: {
                      y: { title: false, labelFormatter: (v: number) => formatCompactVnd(v) },
                    },
                    tooltip: {
                      items: [
                        {
                          channel: 'y',
                          name: 'Doanh thu',
                          valueFormatter: (v: number) => formatCurrency(v),
                        },
                      ],
                    },
                  },
                  {
                    type: 'line',
                    yField: 'orders',
                    shapeField: 'smooth',
                    style: { stroke: palette.amber, lineWidth: 2.5 },
                    axis: { y: { position: 'right', title: false } },
                    tooltip: { items: [{ channel: 'y', name: 'Đơn hoàn thành' }] },
                  },
                ]}
              />
            )}
          </ChartBox>
        </>
      )}
    </SectionCard>
  )
}
