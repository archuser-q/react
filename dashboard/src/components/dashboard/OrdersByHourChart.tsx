import { Column } from '@ant-design/charts'
import { DatePicker, Skeleton, Typography } from 'antd'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { useMemo } from 'react'
import { ChartBox } from '#/components/common/ChartBox'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/dashboard/dashboard.module.css'
import { FONT_FAMILY, palette } from '#/theme/tokens'
import type { OrdersByHour } from '#/types/dashboard'
import { formatNumber, toVnTime } from '#/utils/format'

interface OrdersByHourChartProps {
  data?: OrdersByHour
  loading: boolean
  date: Dayjs | null
  onDateChange: (date: Dayjs | null) => void
}

export function OrdersByHourChart({ data, loading, date, onDateChange }: OrdersByHourChartProps) {
  const today = toVnTime(Date.now()).format('YYYY-MM-DD')
  const isToday = !date || date.format('YYYY-MM-DD') === today
  const currentLabel = isToday ? 'Hôm nay' : dayjs(data?.date).format('DD/MM')
  const previousLabel = isToday ? 'Hôm qua' : dayjs(data?.compare_date).format('DD/MM')

  const series = useMemo(
    () =>
      data?.points.flatMap((p) => [
        { label: p.label, series: currentLabel, orders: p.orders },
        { label: p.label, series: previousLabel, orders: p.previous_orders },
      ]) ?? [],
    [data, currentLabel, previousLabel],
  )

  return (
    <SectionCard
      title="Đơn theo giờ"
      description={
        data
          ? `${currentLabel}: ${formatNumber(data.total)} đơn, ${previousLabel.toLowerCase()}: ${formatNumber(data.previous_total)} đơn${
              data.peak_hour !== null ? `. Cao điểm lúc ${data.peak_hour}h` : ''
            }`
          : 'So sánh với ngày liền trước'
      }
      extra={
        <DatePicker
          value={date}
          onChange={onDateChange}
          allowClear
          placeholder="Hôm nay"
          format="DD/MM/YYYY"
          disabledDate={(d) => d.format('YYYY-MM-DD') > today}
          aria-label="Chọn ngày xem đơn theo giờ"
        />
      }
    >
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <div className={styles.chartWrap}>
          <ChartBox height={280}>
            {(width) => (
              <Column
                width={width}
                height={280}
                autoFit={false}
                data={series}
                xField="label"
                yField="orders"
                colorField="series"
                group
                theme={{ fontFamily: FONT_FAMILY }}
                scale={{ color: { range: [palette.primary, '#C5CED6'] } }}
                style={{ maxWidth: 12, radiusTopLeft: 2, radiusTopRight: 2 }}
                axis={{ x: { labelAutoHide: true, title: false }, y: { title: false } }}
                legend={{ color: { position: 'top', layout: { justifyContent: 'flex-end' } } }}
                tooltip={{ items: [{ channel: 'y', name: 'Số đơn' }] }}
              />
            )}
          </ChartBox>
          {data && data.total === 0 && (
            <Typography.Text type="secondary" className={styles.chartNote}>
              Chưa có đơn nào trong ngày này
            </Typography.Text>
          )}
        </div>
      )}
    </SectionCard>
  )
}
