import { StarFilled } from '@ant-design/icons'
import { Progress, Skeleton, Tag, Typography } from 'antd'
import type { ReactNode } from 'react'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/dashboard/dashboard.module.css'
import { palette } from '#/theme/tokens'
import type { SystemSummary } from '#/types/dashboard'
import { PAYMENT_METHOD } from '#/utils/constants'
import {
  formatCompactVnd,
  formatCurrency,
  formatDecimal,
  formatNumber,
  formatTime,
} from '#/utils/format'

interface Fact {
  label: string
  value: ReactNode
  alert?: boolean
}

function Module({
  title,
  facts,
  children,
}: {
  title: string
  facts: Fact[]
  children?: ReactNode
}) {
  return (
    <section className={styles.module}>
      <Typography.Title level={5} className={styles.moduleTitle}>
        {title}
      </Typography.Title>
      <dl className={styles.facts}>
        {facts.map((f) => (
          <div key={f.label} className={f.alert ? styles.factAlert : undefined}>
            <dt>{f.label}</dt>
            <dd className={styles.num}>{f.value}</dd>
          </div>
        ))}
      </dl>
      {children}
    </section>
  )
}

function Bar({
  label,
  value,
  percent,
  color,
}: {
  label: string
  value: ReactNode
  percent: number
  color?: string
}) {
  return (
    <div className={styles.miniBar}>
      <span>{label}</span>
      <Progress
        percent={percent}
        showInfo={false}
        size="small"
        strokeColor={color ?? palette.primary}
      />
      <span className={styles.num}>{value}</span>
    </div>
  )
}

const plusNew = (n: number) =>
  n ? <Typography.Text type="success"> +{formatNumber(n)} tháng này</Typography.Text> : null

interface SystemSummaryPanelProps {
  data?: SystemSummary
  loading: boolean
}

export function SystemSummaryPanel({ data, loading }: SystemSummaryPanelProps) {
  if (loading && !data) {
    return (
      <SectionCard title="Tình trạng từng phân hệ">
        <Skeleton active paragraph={{ rows: 8 }} />
      </SectionCard>
    )
  }
  if (!data) return null

  const { users, workers, complaints, reviews, payments, catalog, matching } = data
  const approved = Math.max(1, workers.approved)
  const methodMax = Math.max(1, ...payments.by_method_month.map((m) => m.amount))

  return (
    <SectionCard
      title="Tình trạng từng phân hệ"
      description={`Số liệu chốt lúc ${formatTime(data.generated_at)}`}
    >
      <div className={styles.modules}>
        <Module
          title="Người dùng"
          facts={[
            {
              label: 'Khách hàng',
              value: (
                <>
                  {formatNumber(users.customers)}
                  {plusNew(users.new_customers_month)}
                </>
              ),
            },
            {
              label: 'Thợ đã đăng ký',
              value: (
                <>
                  {formatNumber(users.workers)}
                  {plusNew(users.new_workers_month)}
                </>
              ),
            },
            { label: 'Quản trị viên', value: formatNumber(users.admins) },
            { label: 'Tài khoản bị khóa', value: formatNumber(users.blocked) },
          ]}
        />

        <Module
          title="Hồ sơ thợ"
          facts={[
            { label: 'Đã duyệt', value: formatNumber(workers.approved) },
            {
              label: 'Chờ duyệt',
              value: formatNumber(workers.pending),
              alert: workers.pending > 0,
            },
            { label: 'Bị từ chối', value: formatNumber(workers.rejected) },
            {
              label: 'Giấy tờ chờ duyệt',
              value: formatNumber(workers.pending_documents),
              alert: workers.pending_documents > 0,
            },
          ]}
        >
          <Bar
            label="Sẵn sàng"
            value={workers.online}
            percent={(workers.online / approved) * 100}
            color={palette.green}
          />
          <Bar
            label="Đang bận"
            value={workers.busy}
            percent={(workers.busy / approved) * 100}
            color={palette.amber}
          />
          <Bar
            label="Ngoại tuyến"
            value={workers.offline}
            percent={(workers.offline / approved) * 100}
            color="#A8B1BA"
          />
        </Module>

        <Module
          title="Khiếu nại"
          facts={[
            {
              label: 'Mới, chưa tiếp nhận',
              value: formatNumber(complaints.open),
              alert: complaints.open > 0,
            },
            { label: 'Đang xử lý', value: formatNumber(complaints.processing) },
            { label: 'Đã giải quyết', value: formatNumber(complaints.resolved) },
            { label: 'Từ chối', value: formatNumber(complaints.rejected) },
            {
              label: 'Thời gian xử lý trung bình',
              value:
                complaints.avg_resolution_hours === null
                  ? '–'
                  : `${formatDecimal(complaints.avg_resolution_hours)} giờ`,
            },
          ]}
        />

        <Module
          title="Đánh giá"
          facts={[
            {
              label: 'Điểm trung bình',
              value: (
                <>
                  {formatDecimal(reviews.average)} <StarFilled style={{ color: palette.amber }} />
                </>
              ),
            },
            { label: 'Tổng số đánh giá', value: formatNumber(reviews.total) },
            {
              label: 'Bị gắn cờ',
              value: formatNumber(reviews.flagged),
              alert: reviews.flagged > 0,
            },
          ]}
        >
          {reviews.distribution.map((b) => (
            <Bar
              key={b.star}
              label={`${b.star} sao`}
              value={formatNumber(b.count)}
              percent={b.percent}
              color={b.star >= 4 ? palette.green : b.star === 3 ? palette.amber : palette.red}
            />
          ))}
        </Module>

        <Module
          title="Thanh toán"
          facts={[
            { label: 'Đã thu hôm nay', value: formatCurrency(payments.success_today_amount) },
            { label: 'Đã thu tháng này', value: formatCurrency(payments.success_month_amount) },
            {
              label: 'Hoa hồng tháng này',
              value: formatCurrency(payments.commission_month_amount),
            },
            {
              label: 'Giao dịch đang treo',
              value: formatNumber(payments.pending),
              alert: payments.pending > 0,
            },
            { label: 'Thất bại tháng này', value: formatNumber(payments.failed_month) },
          ]}
        >
          {payments.by_method_month.map((m) => (
            <Bar
              key={m.method}
              label={PAYMENT_METHOD[m.method] ?? m.method}
              value={formatCompactVnd(m.amount)}
              percent={(m.amount / methodMax) * 100}
            />
          ))}
        </Module>

        <Module
          title="Dịch vụ và ghép thợ"
          facts={[
            { label: 'Danh mục đang mở', value: formatNumber(catalog.categories_active) },
            { label: 'Dịch vụ đang bán', value: formatNumber(catalog.services_active) },
            { label: 'Dịch vụ tạm ẩn', value: formatNumber(catalog.services_inactive) },
          ]}
        >
          {matching ? (
            <>
              <Typography.Text className={styles.matchingName}>
                Cấu hình đang chạy: <strong>{matching.name}</strong>{' '}
                <Tag color={matching.mode === 'instant' ? 'blue' : 'purple'}>
                  {matching.mode === 'instant'
                    ? 'Tức thời'
                    : `Theo lô ${matching.batch_window_seconds ?? ''}s`}
                </Tag>
              </Typography.Text>
              <Bar
                label="Khoảng cách"
                value={matching.weight_distance}
                percent={matching.weight_distance * 100}
              />
              <Bar
                label="Độ tin cậy"
                value={matching.weight_trust}
                percent={matching.weight_trust * 100}
              />
              <Bar
                label="Giá"
                value={matching.weight_price}
                percent={matching.weight_price * 100}
              />
              <Bar
                label="Khối lượng việc"
                value={matching.weight_workload}
                percent={matching.weight_workload * 100}
              />
            </>
          ) : (
            <Typography.Text type="warning">Chưa bật cấu hình ghép thợ nào</Typography.Text>
          )}
        </Module>
      </div>
    </SectionCard>
  )
}
