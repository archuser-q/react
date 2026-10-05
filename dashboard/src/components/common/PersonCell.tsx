import { Typography } from 'antd'
import { PersonAvatar } from '#/components/common/PersonAvatar'

interface PersonCellProps {
  name: string
  avatarUrl?: string | null
  sub?: string | null
}

export function PersonCell({ name, avatarUrl, sub }: PersonCellProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
      <PersonAvatar name={name} src={avatarUrl} size={36} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Typography.Text strong ellipsis>
          {name}
        </Typography.Text>
        {sub && (
          <Typography.Text type="secondary" ellipsis style={{ fontSize: 13 }}>
            {sub}
          </Typography.Text>
        )}
      </div>
    </div>
  )
}
