import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '#/components/common/ComingSoon'

export const Route = createFileRoute('/_admin/users')({
  component: () => <ComingSoon title="Người dùng" />,
})
