import { CheckOutlined, EyeInvisibleOutlined, EyeOutlined, FlagOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useState } from 'react'
import { ModerationModal } from '#/components/reviews/ModerationModal'
import { useModerateReview } from '#/hooks/useReviews'
import type { ModerationAction, ReviewDetail } from '#/types/review'

export function ReviewActions({ review }: { review: ReviewDetail }) {
  const [action, setAction] = useState<ModerationAction | null>(null)
  const moderate = useModerateReview(review.id)

  return (
    <>
      <Space wrap>
        {review.is_hidden ? (
          <Button icon={<EyeOutlined />} onClick={() => setAction('restore')}>
            Hiển thị lại
          </Button>
        ) : (
          <>
            {review.is_flagged ? (
              <Button type="primary" icon={<CheckOutlined />} onClick={() => setAction('approve')}>
                Giữ lại
              </Button>
            ) : (
              <Button icon={<FlagOutlined />} onClick={() => setAction('flag')}>
                Gắn cờ
              </Button>
            )}
            <Button danger icon={<EyeInvisibleOutlined />} onClick={() => setAction('hide')}>
              Ẩn đánh giá
            </Button>
          </>
        )}
      </Space>
      <ModerationModal
        action={action}
        reviewId={review.id}
        loading={moderate.isPending}
        onCancel={() => setAction(null)}
        onSubmit={(note) =>
          action &&
          moderate
            .mutateAsync({ action, note })
            .then(() => setAction(null))
            .catch(() => undefined)
        }
      />
    </>
  )
}
