import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import type { ReactNode } from 'react'
import { palette } from '#/theme/tokens'

interface TrendTextProps {
  change: number | null
  display: ReactNode
  lowerIsBetter?: boolean
  suffix?: ReactNode
}

export function TrendText({ change, display, lowerIsBetter = false, suffix }: TrendTextProps) {
  if (change === null || change === 0) {
    return (
      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
        <MinusOutlined /> {change === 0 ? 'Không đổi' : 'Chưa có dữ liệu kỳ trước'}
        {change === 0 && suffix ? <> {suffix}</> : null}
      </Typography.Text>
    )
  }

  const good = lowerIsBetter ? change < 0 : change > 0
  return (
    <Typography.Text style={{ fontSize: 13, color: good ? palette.green : palette.red }}>
      {change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {display}
      {suffix && <Typography.Text type="secondary"> {suffix}</Typography.Text>}
    </Typography.Text>
  )
}
