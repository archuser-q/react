import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '#/components/common/ComingSoon'

export const Route = createFileRoute('/_admin/services')({
  component: () => <ComingSoon title="Dịch vụ & bảng giá" />,
})
