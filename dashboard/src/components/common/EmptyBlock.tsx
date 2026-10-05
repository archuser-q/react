import { Empty } from 'antd'

export function EmptyBlock({ text }: { text: string }) {
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={text} />
}
