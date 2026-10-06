import { CheckCircleFilled, CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Popconfirm, Space, Tag, Typography } from 'antd'
import { WeightBar } from '#/components/matching/WeightBar'
import styles from '#/components/matching/matching.module.css'
import type { MatchingConfigItem } from '#/types/matching'
import { formatDateTime } from '#/utils/format'

interface ConfigCardProps {
  config: MatchingConfigItem
  activating: boolean
  onActivate: () => void
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
}

export function ConfigCard({
  config,
  activating,
  onActivate,
  onEdit,
  onDuplicate,
  onDelete,
}: ConfigCardProps) {
  return (
    <Card
      variant="borderless"
      className={config.is_active ? styles.cardActive : undefined}
      title={
        <Space size={8}>
          <span>{config.name}</span>
          {config.is_active && (
            <Tag color="success" icon={<CheckCircleFilled />} style={{ margin: 0 }}>
              Đang áp dụng
            </Tag>
          )}
        </Space>
      }
      extra={
        <Space size={0}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={onEdit}
            aria-label={`Sửa ${config.name}`}
          />
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={onDuplicate}
            aria-label={`Nhân bản ${config.name}`}
          />
          {!config.is_active && (
            <Popconfirm
              title={`Xóa cấu hình "${config.name}"?`}
              okText="Xóa"
              okButtonProps={{ danger: true }}
              cancelText="Hủy"
              onConfirm={onDelete}
            >
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                aria-label={`Xóa ${config.name}`}
              />
            </Popconfirm>
          )}
        </Space>
      }
    >
      <WeightBar weights={config} />
      <dl className={styles.params}>
        <div>
          <dt>Chế độ</dt>
          <dd>
            {config.mode === 'instant'
              ? 'Ghép tức thời'
              : `Theo lô, gom đơn ${config.batch_window_seconds} giây`}
          </dd>
        </div>
        <div>
          <dt>Bán kính tìm</dt>
          <dd>{config.search_radius_km} km</dd>
        </div>
        <div>
          <dt>Gửi offer cho</dt>
          <dd>{config.max_offers} thợ điểm cao nhất</dd>
        </div>
        <div>
          <dt>Chờ thợ phản hồi</dt>
          <dd>{config.offer_timeout_seconds} giây</dd>
        </div>
      </dl>
      <div className={styles.cardFoot}>
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          Sửa lần cuối {formatDateTime(config.updated_at)}
          {config.updated_by_name && ` bởi ${config.updated_by_name}`}
        </Typography.Text>
        {!config.is_active && (
          <Popconfirm
            title={`Áp dụng "${config.name}"?`}
            description="Các đơn tạo sau thời điểm này sẽ được ghép thợ theo cấu hình này."
            okText="Áp dụng"
            cancelText="Hủy"
            onConfirm={onActivate}
          >
            <Button size="small" type="primary" ghost loading={activating}>
              Áp dụng
            </Button>
          </Popconfirm>
        )}
      </div>
    </Card>
  )
}
