import { InfoCircleOutlined } from '@ant-design/icons'
import { Segmented, Skeleton, Tooltip, Typography } from 'antd'
import { SectionCard } from '#/components/common/SectionCard'
import { TrendText } from '#/components/common/TrendText'
import styles from '#/components/dashboard/dashboard.module.css'
import type { DashboardKpis, KpiValue, Period } from '#/types/dashboard'
import { KPI_GROUPS, PERIOD_OPTIONS } from '#/utils/constants'
import type { KpiDef, KpiFormat } from '#/utils/constants'
import {
  formatCompactVnd,
  formatCurrency,
  formatDecimal,
  formatMinutes,
  formatNumber,
  formatPercent,
  formatSignedPercent,
} from '#/utils/format'

function formatValue(value: number | null, format: KpiFormat) {
  switch (format) {
    case 'currency':
      return formatCurrency(value)
    case 'percent':
      return formatPercent(value)
    case 'minutes':
      return formatMinutes(value)
    case 'rating':
      return value === null ? '–' : `${formatDecimal(value)} / 5`
    default:
      return formatNumber(value)
  }
}

function formatChange(kpi: KpiValue, format: KpiFormat) {
  if (kpi.change === null) return ''
  const sign = kpi.change > 0 ? '+' : ''
  switch (format) {
    case 'percent':
      return `${sign}${formatDecimal(kpi.change)} điểm %`
    case 'minutes':
      return `${sign}${formatDecimal(kpi.change)} phút`
    case 'rating':
      return `${sign}${formatDecimal(kpi.change)} điểm`
    case 'currency':
      return `${sign}${formatCompactVnd(kpi.change)} (${formatSignedPercent(kpi.change_percent)})`
    default:
      return formatSignedPercent(kpi.change_percent)
  }
}

function KpiCell({ def, kpi }: { def: KpiDef; kpi: KpiValue }) {
  return (
    <div className={styles.kpi}>
      <Typography.Text type="secondary">
        {def.label}
        {def.hint && (
          <Tooltip title={def.hint}>
            <InfoCircleOutlined style={{ marginLeft: 6 }} aria-label={def.hint} />
          </Tooltip>
        )}
      </Typography.Text>
      <div className={styles.kpiValue}>{formatValue(kpi.value, def.format)}</div>
      <TrendText
        change={kpi.change}
        display={formatChange(kpi, def.format)}
        lowerIsBetter={def.lowerIsBetter}
      />
    </div>
  )
}

interface KpiGridProps {
  data?: DashboardKpis
  loading: boolean
  stale?: boolean
  period: Period
  onPeriodChange: (period: Period) => void
}

export function KpiGrid({ data, loading, stale, period, onPeriodChange }: KpiGridProps) {
  const compare = PERIOD_OPTIONS.find((p) => p.value === period)?.compare

  return (
    <SectionCard
      title="Chỉ số vận hành"
      description={`Mũi tên cho biết thay đổi so với ${compare}`}
      extra={
        <Segmented<Period>
          value={period}
          onChange={onPeriodChange}
          options={PERIOD_OPTIONS.map(({ value, label }) => ({ value, label }))}
        />
      }
    >
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : data ? (
        <div className={styles.kpiGroups} style={{ opacity: stale ? 0.55 : 1 }}>
          {KPI_GROUPS.map((group) => (
            <section key={group.title}>
              <Typography.Title level={5} className={styles.kpiGroupTitle}>
                {group.title}
              </Typography.Title>
              <div className={styles.kpiList}>
                {group.items.map((def) => (
                  <KpiCell key={def.key} def={def} kpi={data[def.key]} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </SectionCard>
  )
}
