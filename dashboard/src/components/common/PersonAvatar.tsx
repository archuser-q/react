import { Avatar } from 'antd'
import { chartColors } from '#/theme/tokens'
import { initials } from '#/utils/format'

interface PersonAvatarProps {
  name: string
  src?: string | null
  size?: number
}

export function PersonAvatar({ name, src, size = 32 }: PersonAvatarProps) {
  const color = chartColors[name.charCodeAt(name.length - 1) % chartColors.length]
  return (
    <Avatar size={size} src={src || undefined} style={{ background: color, flex: 'none' }}>
      {initials(name)}
    </Avatar>
  )
}
