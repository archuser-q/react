import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '#/components/common/ComingSoon'

export const Route = createFileRoute('/_admin/settings')({
  component: () => <ComingSoon title="Cấu hình ghép thợ" />,
})
