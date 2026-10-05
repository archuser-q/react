import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '#/components/common/ComingSoon'

export const Route = createFileRoute('/_admin/complaints')({
  component: () => <ComingSoon title="Khiếu nại" />,
})
