import { Alert, Button } from 'antd'

interface QueryErrorProps {
  error: unknown
  onRetry?: () => void
}

export function QueryError({ error, onRetry }: QueryErrorProps) {
  const message = error instanceof Error ? error.message : 'Không tải được dữ liệu'
  return (
    <Alert
      type="error"
      showIcon
      title="Không tải được dữ liệu"
      description={message}
      action={
        onRetry && (
          <Button size="small" onClick={onRetry}>
            Tải lại
          </Button>
        )
      }
    />
  )
}
