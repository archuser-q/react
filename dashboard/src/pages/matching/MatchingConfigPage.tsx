import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Skeleton, Space, Typography } from 'antd'
import { useState } from 'react'
import { QueryError } from '#/components/common/QueryError'
import { ConfigCard } from '#/components/matching/ConfigCard'
import { ConfigFormDrawer } from '#/components/matching/ConfigFormDrawer'
import styles from '#/components/matching/matching.module.css'
import { SimulatorPanel } from '#/components/matching/SimulatorPanel'
import {
  useActivateConfig,
  useCreateConfig,
  useDeleteConfig,
  useMatchingConfigs,
  useUpdateConfig,
} from '#/hooks/useMatching'
import type { MatchingConfigItem } from '#/types/matching'

type Editing = (Partial<MatchingConfigItem> & { id?: number }) | null

export function MatchingConfigPage() {
  const { data, isLoading, error, refetch } = useMatchingConfigs()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Editing>(null)
  const create = useCreateConfig()
  const update = useUpdateConfig()
  const activate = useActivateConfig()
  const remove = useDeleteConfig()

  const openDrawer = (value: Editing) => {
    setEditing(value)
    setDrawerOpen(true)
  }

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Card variant="borderless">
        <div
          style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}
        >
          <div style={{ maxWidth: 720 }}>
            <Typography.Title level={5} style={{ marginTop: 0 }}>
              Thuật toán ghép thợ hoạt động thế nào
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Bước 1: tìm thợ đã duyệt, đang trực tuyến, có làm dịch vụ đó, trong bán kính tìm (dùng
              chỉ mục không gian PostGIS). Bước 2: chấm điểm từng thợ theo 4 tiêu chí với trọng số
              của cấu hình đang áp dụng, rồi gửi offer cho những thợ điểm cao nhất. Mỗi thời điểm
              chỉ có một cấu hình được áp dụng.
            </Typography.Paragraph>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => openDrawer(null)}>
            Tạo cấu hình
          </Button>
        </div>
      </Card>

      {error ? (
        <QueryError error={error} onRetry={refetch} />
      ) : isLoading || !data ? (
        <Card variant="borderless">
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      ) : (
        <div className={styles.configs}>
          {data.map((c) => (
            <ConfigCard
              key={c.id}
              config={c}
              activating={activate.isPending && activate.variables === c.id}
              onActivate={() => activate.mutate(c.id)}
              onEdit={() => openDrawer(c)}
              onDuplicate={() => {
                const { id: _id, is_active: _active, ...rest } = c
                openDrawer({ ...rest, name: `${c.name} (bản sao)` })
              }}
              onDelete={() => remove.mutate(c.id)}
            />
          ))}
        </div>
      )}

      {data && <SimulatorPanel configs={data} />}

      <ConfigFormDrawer
        open={drawerOpen}
        initial={editing}
        loading={create.isPending || update.isPending}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(values) => {
          const action = editing?.id
            ? update.mutateAsync({ id: editing.id, ...values })
            : create.mutateAsync(values)
          action.then(() => setDrawerOpen(false)).catch(() => undefined)
        }}
      />
    </Space>
  )
}
