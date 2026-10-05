import { StarFilled } from '@ant-design/icons'
import { Descriptions, Progress, Typography } from 'antd'
import { SectionCard } from '#/components/common/SectionCard'
import { palette } from '#/theme/tokens'
import type { WorkerProfile } from '#/types/worker'
import { formatDecimal, formatNumber, fromNow } from '#/utils/format'
import { toScore } from '#/utils/worker'

export function WorkerProfileInfo({ profile }: { profile: WorkerProfile }) {
  const hasLocation = profile.current_latitude !== null && profile.current_longitude !== null

  return (
    <SectionCard title="Thông tin nghề nghiệp">
      <Descriptions
        column={1}
        size="small"
        items={[
          {
            key: 'trust',
            label: 'Trust Score',
            children: (
              <Progress
                percent={toScore(profile.trust_score)}
                strokeColor={palette.green}
                format={(p) => `${p}/100`}
                style={{ maxWidth: 240, margin: 0 }}
              />
            ),
          },
          {
            key: 'orders',
            label: 'Đơn đã hoàn thành',
            children: formatNumber(profile.completed_orders),
          },
          {
            key: 'reviews',
            label: 'Lượt đánh giá',
            children: (
              <>
                {formatNumber(profile.review_count)} <StarFilled style={{ color: palette.amber }} />
              </>
            ),
          },
          {
            key: 'exp',
            label: 'Kinh nghiệm',
            children: profile.experience_years
              ? `${profile.experience_years} năm`
              : 'Chưa khai báo',
          },
          {
            key: 'radius',
            label: 'Bán kính nhận việc',
            children: `${formatDecimal(Number(profile.service_radius_km))} km`,
          },
          {
            key: 'location',
            label: 'Vị trí gần nhất',
            children: hasLocation ? (
              <>
                {profile.current_latitude?.toFixed(5)}, {profile.current_longitude?.toFixed(5)}
                <Typography.Text type="secondary">
                  {' '}
                  (cập nhật {fromNow(profile.location_updated_at)})
                </Typography.Text>
              </>
            ) : (
              <Typography.Text type="secondary">Chưa có dữ liệu vị trí</Typography.Text>
            ),
          },
          {
            key: 'bio',
            label: 'Giới thiệu',
            children: profile.bio || (
              <Typography.Text type="secondary">Thợ chưa viết giới thiệu</Typography.Text>
            ),
          },
        ]}
      />
    </SectionCard>
  )
}
