import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Col, Result, Row, Skeleton } from 'antd'
import { QueryError } from '#/components/common/QueryError'
import { OrderFeedbackCard } from '#/components/orders/OrderFeedbackCard'
import { OrderHeader } from '#/components/orders/OrderHeader'
import { OrderInfoCard } from '#/components/orders/OrderInfoCard'
import { OrderMatchingCard } from '#/components/orders/OrderMatchingCard'
import { OrderPricingCard } from '#/components/orders/OrderPricingCard'
import { OrderProgress } from '#/components/orders/OrderProgress'
import { useOrderDetail } from '#/hooks/useOrders'
import { ApiError } from '#/lib/http'

interface OrderDetailPageProps {
  orderId: number
  onBack: () => void
}

export function OrderDetailPage({ orderId, onBack }: OrderDetailPageProps) {
  const { data, isLoading, error, refetch } = useOrderDetail(orderId)

  if (error instanceof ApiError && error.status === 404) {
    return (
      <Card variant="borderless">
        <Result
          status="404"
          title="Không tìm thấy đơn hàng"
          subTitle={`Không có đơn nào với mã #${orderId}.`}
          extra={<Button onClick={onBack}>Về danh sách đơn</Button>}
        />
      </Card>
    )
  }

  return (
    <>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{ paddingInline: 0, marginBottom: 12 }}
      >
        Danh sách đơn
      </Button>
      {error && <QueryError error={error} onRetry={refetch} />}
      {isLoading && (
        <Card variant="borderless">
          <Skeleton active paragraph={{ rows: 8 }} />
        </Card>
      )}
      {data && (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <OrderHeader order={data} />
          </Col>
          <Col span={24}>
            <OrderProgress order={data} />
          </Col>
          <Col xs={24} xl={16}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <OrderInfoCard order={data} />
              </Col>
              <Col span={24}>
                <OrderMatchingCard offers={data.offers} />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={8}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <OrderPricingCard order={data} />
              </Col>
              <Col span={24}>
                <OrderFeedbackCard order={data} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  )
}
