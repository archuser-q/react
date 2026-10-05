import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col, Result, Row, Skeleton, Card } from 'antd'
import { QueryError } from '#/components/common/QueryError'
import { WorkerDocuments } from '#/components/workers/WorkerDocuments'
import { WorkerProfileHeader } from '#/components/workers/WorkerProfileHeader'
import { WorkerProfileInfo } from '#/components/workers/WorkerProfileInfo'
import { useWorkerDetail } from '#/hooks/useWorkers'
import { ApiError } from '#/lib/http'

interface WorkerDetailPageProps {
  workerId: number
  onBack: () => void
}

export function WorkerDetailPage({ workerId, onBack }: WorkerDetailPageProps) {
  const { data, isLoading, error, refetch } = useWorkerDetail(workerId)

  const back = (
    <Button
      type="link"
      icon={<ArrowLeftOutlined />}
      onClick={onBack}
      style={{ paddingInline: 0, marginBottom: 12 }}
    >
      Danh sách thợ
    </Button>
  )

  if (error instanceof ApiError && error.status === 404) {
    return (
      <Card variant="borderless">
        <Result
          status="404"
          title="Không tìm thấy thợ"
          subTitle={`Không có hồ sơ thợ nào với mã #${workerId}.`}
          extra={<Button onClick={onBack}>Về danh sách thợ</Button>}
        />
      </Card>
    )
  }

  return (
    <>
      {back}
      {error && <QueryError error={error} onRetry={refetch} />}
      {isLoading && (
        <Card variant="borderless">
          <Skeleton active avatar paragraph={{ rows: 6 }} />
        </Card>
      )}
      {data && (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <WorkerProfileHeader worker={data} />
          </Col>
          <Col xs={24} xl={8}>
            <WorkerProfileInfo profile={data.profile} />
          </Col>
          <Col xs={24} xl={16}>
            <WorkerDocuments workerId={workerId} documents={data.documents} />
          </Col>
        </Row>
      )}
    </>
  )
}
