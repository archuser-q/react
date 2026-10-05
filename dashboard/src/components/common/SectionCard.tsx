import { Card } from 'antd'
import type { CardProps } from 'antd'
import type { ReactNode } from 'react'

interface SectionCardProps extends Omit<CardProps, 'title'> {
  title: ReactNode
  description?: ReactNode
}

export function SectionCard({ title, description, children, styles, ...rest }: SectionCardProps) {
  return (
    <Card
      variant="borderless"
      title={
        <div style={{ padding: '14px 0' }}>
          <div>{title}</div>
          {description && (
            <div style={{ fontSize: 13, fontWeight: 400, color: '#6B7480', marginTop: 2 }}>
              {description}
            </div>
          )}
        </div>
      }
      styles={{ body: { paddingTop: 16 }, ...styles }}
      style={{ height: '100%' }}
      {...rest}
    >
      {children}
    </Card>
  )
}
