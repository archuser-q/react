import { EyeInvisibleOutlined, FlagFilled } from '@ant-design/icons'
import { Tag } from 'antd'

interface ReviewTagsProps {
  isFlagged: boolean
  isHidden: boolean
  flagReason?: string | null
}

export function ReviewTags({ isFlagged, isHidden, flagReason }: ReviewTagsProps) {
  if (isHidden) {
    return (
      <Tag icon={<EyeInvisibleOutlined />} style={{ margin: 0 }}>
        Đã ẩn
      </Tag>
    )
  }
  if (isFlagged) {
    return (
      <Tag color="error" icon={<FlagFilled />} style={{ margin: 0 }}>
        Bị gắn cờ{flagReason ? `: ${flagReason}` : ''}
      </Tag>
    )
  }
  return null
}
