import { Pie } from '@ant-design/charts'
import { Skeleton } from 'antd'
import { ChartBox } from '#/components/common/ChartBox'
import { EmptyBlock } from '#/components/common/EmptyBlock'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/dashboard/dashboard.module.css'
import { chartColors, FONT_FAMILY } from '#/theme/tokens'
import type { ServiceShare } from '#/types/dashboard'
import { formatNumber, formatPercent } from '#/utils/format'

interface ServiceBreakdownChartProps {
  data?: ServiceShare[]
  loading: boolean
}

export function ServiceBreakdownChart({ data, loading }: ServiceBreakdownChartProps) {
  const total = data?.reduce((sum, s) => sum + s.orders, 0) ?? 0

  return (
    <SectionCard title="Cơ cấu dịch vụ" description="Đơn tạo trong tháng này, không tính đơn hủy">
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : !data?.length ? (
        <EmptyBlock text="Tháng này chưa có đơn nào" />
      ) : (
        <>
          <ChartBox height={200}>
            {(width) => (
              <Pie
                width={width}
                height={200}
                autoFit={false}
                data={data}
                angleField="orders"
                colorField="name"
                innerRadius={0.64}
                radius={0.95}
                legend={false}
                label={false}
                theme={{ fontFamily: FONT_FAMILY }}
                scale={{ color: { range: chartColors } }}
                tooltip={{ title: 'name', items: [{ field: 'orders', name: 'Số đơn' }] }}
                annotations={[
                  {
                    type: 'text',
                    style: {
                      text: `${formatNumber(total)} đơn`,
                      x: '50%',
                      y: '50%',
                      textAlign: 'center',
                      textBaseline: 'middle',
                      fontSize: 18,
                      fontWeight: 600,
                      fontFamily: FONT_FAMILY,
                    },
                  },
                ]}
              />
            )}
          </ChartBox>
          <ul className={styles.shareList}>
            {data.map((s, i) => (
              <li key={s.category_id}>
                <i style={{ background: chartColors[i % chartColors.length] }} />
                <span>{s.name}</span>
                <span className={styles.num}>{formatNumber(s.orders)}</span>
                <strong className={styles.num}>{formatPercent(s.percent)}</strong>
              </li>
            ))}
          </ul>
        </>
      )}
    </SectionCard>
  )
}
