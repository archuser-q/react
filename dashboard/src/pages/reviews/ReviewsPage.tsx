import { Card, Space, Tabs } from 'antd'
import { QueryError } from '#/components/common/QueryError'
import { ReviewDrawer } from '#/components/reviews/ReviewDrawer'
import { ReviewFilters } from '@/components/reviews/ReviewFilters'
import type { ReviewFilterValue } from '#/components/reviews/ReviewFilters'
import { ReviewList } from '@/components/reviews/ReviewList'
import { ReviewStatsBar } from '#/components/reviews/ReviewStatsBar'
import { useReviewList, useReviewStats } from '#/hooks/useReviews'
import type { ReviewView } from '#/types/review'
import { PAGE_SIZE } from '#/utils/constants'

export interface ReviewSearch extends ReviewFilterValue {
  view?: ReviewView
  page?: number
  id?: number
  // Tham số cũ ?flagged=true, chỉ đọc một lần rồi bỏ khỏi URL
  flagged?: undefined
}

interface ReviewsPageProps {
  search: ReviewSearch
  onSearchChange: (search: ReviewSearch) => void
}

const ALL = 'all'

const EMPTY_TEXT: Record<ReviewView | typeof ALL, string> = {
  all: 'Không có đánh giá nào khớp bộ lọc',
  flagged: 'Không có đánh giá nào đang bị gắn cờ',
  low: 'Không có đánh giá thấp nào',
  hidden: 'Chưa ẩn đánh giá nào',
}

export function ReviewsPage({ search, onSearchChange }: ReviewsPageProps) {
  const { view, page, id, rating, sort, ...period } = search
  const statsFilter = {
    keyword: period.keyword,
    date_from: period.date_from,
    date_to: period.date_to,
  }

  const { data, isLoading, isFetching, error, refetch } = useReviewList({
    ...statsFilter,
    view,
    rating,
    sort,
    page: page ?? 1,
    page_size: PAGE_SIZE,
  })
  const { data: stats } = useReviewStats(statsFilter)

  const label = (text: string, n?: number) => (n === undefined ? text : `${text} (${n})`)

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <ReviewStatsBar
        data={stats}
        onRatingClick={(star) => onSearchChange({ ...search, rating: star, page: undefined })}
      />
      <Card variant="borderless" styles={{ body: { paddingTop: 4 } }}>
        <Tabs
          activeKey={view ?? ALL}
          onChange={(key) =>
            onSearchChange({
              ...search,
              view: key === ALL ? undefined : (key as ReviewView),
              page: undefined,
            })
          }
          items={[
            { key: ALL, label: label('Tất cả', stats?.total) },
            { key: 'flagged', label: label('Bị gắn cờ', stats?.flagged) },
            { key: 'low', label: label('Đánh giá thấp', stats?.low) },
            { key: 'hidden', label: label('Đã ẩn', stats?.hidden) },
          ]}
        />
        <ReviewFilters
          value={{ ...statsFilter, rating, sort }}
          onChange={(next) => onSearchChange({ ...search, ...next, page: undefined })}
        />
        {error ? (
          <QueryError error={error} onRetry={refetch} />
        ) : (
          <ReviewList
            data={data}
            loading={isLoading || isFetching}
            selectedId={id}
            emptyText={EMPTY_TEXT[view ?? ALL]}
            onPageChange={(p) => onSearchChange({ ...search, page: p })}
            onOpen={(reviewId) => onSearchChange({ ...search, id: reviewId })}
          />
        )}
      </Card>
      <ReviewDrawer
        reviewId={id ?? null}
        onClose={() => onSearchChange({ ...search, id: undefined })}
      />
    </Space>
  )
}
