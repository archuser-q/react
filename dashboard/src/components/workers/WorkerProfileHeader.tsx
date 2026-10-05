import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'
import { AccountLockButton } from '#/components/common/AccountLockButton'
import { PersonAvatar } from '#/components/common/PersonAvatar'
import { UserStatusTag } from '#/components/common/UserStatusTag'
import { VerificationActions } from '#/components/workers/VerificationActions'
import { AvailabilityBadge, VerificationTag } from '#/components/workers/WorkerTags'
import type { AdminWorkerDetail } from '#/types/worker'
import { formatDateTime } from '#/utils/format'

export function WorkerProfileHeader({ worker }: { worker: AdminWorkerDetail }) {
  const { user, profile, documents } = worker

  return (
    <Card variant="borderless">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
        <PersonAvatar name={user.full_name} src={user.avatar_url} size={72} />
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <Space wrap size={8} style={{ marginBottom: 6 }}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {user.full_name}
            </Typography.Title>
            <VerificationTag status={profile.verification_status} />
            <UserStatusTag status={user.status} />
          </Space>
          <Space wrap size={20}>
            <Typography.Text>
              <PhoneOutlined /> {user.phone}
            </Typography.Text>
            {user.email && (
              <Typography.Text>
                <MailOutlined /> {user.email}
              </Typography.Text>
            )}
            {profile.verification_status === 'approved' && (
              <AvailabilityBadge availability={profile.availability} />
            )}
            <Typography.Text type="secondary">
              Đăng ký lúc {formatDateTime(profile.created_at)}
            </Typography.Text>
          </Space>
        </div>
        <Space wrap>
          <VerificationActions
            workerId={user.id}
            status={profile.verification_status}
            documents={documents}
          />
          <AccountLockButton user={user} />
        </Space>
      </div>
    </Card>
  )
}
