import { Divider, Tag, Typography } from 'antd'
import { EmptyBlock } from '#/components/common/EmptyBlock'
import { SectionCard } from '#/components/common/SectionCard'
import styles from '#/components/orders/orders.module.css'
import type { OrderDetail } from '#/types/order'
import { PAYMENT_METHOD, PAYMENT_STATUS, QUOTE_STATUS } from '#/utils/constants'
import { formatCurrency, formatDateTime } from '#/utils/format'

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={styles.line}>
      <span>{label}</span>
      <span className={strong ? styles.lineStrong : undefined}>{value}</span>
    </div>
  )
}

export function OrderPricingCard({ order }: { order: OrderDetail }) {
  return (
    <SectionCard title="Chi phí và thanh toán">
      <Line label="Giá ước tính" value={formatCurrency(order.estimated_price)} />
      {order.extra_quotes.map((q) => (
        <div key={q.id} className={styles.quote}>
          <div className={styles.line}>
            <span>Phát sinh: {q.description}</span>
            <span>+{formatCurrency(q.amount)}</span>
          </div>
          <Tag color={QUOTE_STATUS[q.status].color} style={{ margin: 0 }}>
            {QUOTE_STATUS[q.status].label}
          </Tag>
        </div>
      ))}
      <Line label="Giá chốt" value={formatCurrency(order.final_price)} strong />

      {order.earning && (
        <>
          <Divider style={{ margin: '12px 0' }} />
          <Line label="Hoa hồng nền tảng" value={formatCurrency(order.earning.commission_amount)} />
          <Line label="Thợ thực nhận" value={formatCurrency(order.earning.net_amount)} />
        </>
      )}

      <Divider style={{ margin: '12px 0' }} />
      <Typography.Text strong>Giao dịch</Typography.Text>
      {order.payments.length === 0 ? (
        <EmptyBlock text="Chưa có giao dịch nào" />
      ) : (
        <ul className={styles.payments}>
          {order.payments.map((p) => (
            <li key={p.id}>
              <div className={styles.line}>
                <span>
                  {PAYMENT_METHOD[p.method] ?? p.method}{' '}
                  <Tag color={PAYMENT_STATUS[p.status].color} style={{ margin: 0 }}>
                    {PAYMENT_STATUS[p.status].label}
                  </Tag>
                </span>
                <span className={styles.lineStrong}>{formatCurrency(p.amount)}</span>
              </div>
              <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                {p.paid_at
                  ? `Thanh toán lúc ${formatDateTime(p.paid_at)}`
                  : `Tạo lúc ${formatDateTime(p.created_at)}`}
                {p.transaction_code && `, mã GD ${p.transaction_code}`}
              </Typography.Text>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}
