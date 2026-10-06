import { createFileRoute } from '@tanstack/react-router'
import { MatchingConfigPage } from '#/pages/matching/MatchingConfigPage'

export const Route = createFileRoute('/_admin/settings')({
  component: MatchingConfigPage,
})
