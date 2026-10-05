import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '#/components/common/ComingSoon'

export const Route = createFileRoute('/_admin/payments')({
  component: () => <ComingSoon title="Thanh toán" />,
})
