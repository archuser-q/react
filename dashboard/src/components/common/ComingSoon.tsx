import { useLocation, useNavigate } from '@tanstack/react-router'
import { Button, Card, Result } from 'antd'

export function ComingSoon({ title }: { title: string }) {
  const navigate = useNavigate()
  const { searchStr } = useLocation()
  return (
    <Card variant="borderless">
      <Result
        status="info"
        title={`Trang ${title.toLowerCase()} chưa được xây dựng`}
        subTitle={
          searchStr
            ? `Bộ lọc nhận được từ trang tổng quan: ${decodeURIComponent(searchStr)}`
            : 'Trang này sẽ dùng các API quản trị đã có ở backend.'
        }
        extra={
          <Button type="primary" onClick={() => navigate({ to: '/' })}>
            Về trang tổng quan
          </Button>
        }
      />
    </Card>
  )
}
