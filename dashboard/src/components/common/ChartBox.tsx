import type { ReactNode } from 'react'
import { useElementWidth } from '#/hooks/useElementWidth'

// Đo chiều rộng thật của khung chứa rồi truyền vào biểu đồ, để biểu đồ
// co giãn đúng cả khi thanh cuộn xuất hiện hoặc sidebar thu gọn.
export function ChartBox({
  height,
  children,
}: {
  height: number
  children: (width: number) => ReactNode
}) {
  const { ref, width } = useElementWidth<HTMLDivElement>()
  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', minWidth: 0, height }}>
      {width > 0 && children(width)}
    </div>
  )
}
