import type { FactorKey, Weights } from '#/types/matching'

export interface FactorMeta {
  key: FactorKey
  weightField: keyof Weights
  label: string
  color: string
  formula: string
}

// Màu đủ khác nhau để phân biệt trên thanh điểm xếp chồng
export const FACTORS: FactorMeta[] = [
  {
    key: 'distance',
    weightField: 'weight_distance',
    label: 'Khoảng cách',
    color: '#1F5F8B',
    formula: '1 - khoảng cách / bán kính tìm. Thợ càng gần càng cao điểm.',
  },
  {
    key: 'trust',
    weightField: 'weight_trust',
    label: 'Độ tin cậy',
    color: '#2E8B57',
    formula: 'Trust Score của thợ, tính từ đánh giá, tỷ lệ hoàn thành và khiếu nại.',
  },
  {
    key: 'price',
    weightField: 'weight_price',
    label: 'Giá',
    color: '#D9961A',
    formula:
      'Dựa trên tỷ lệ giá chốt / giá gốc của thợ trong 90 ngày. Không phát sinh thêm được 1 điểm, cao gấp đôi giá gốc được 0. Thợ mới được 0,5.',
  },
  {
    key: 'workload',
    weightField: 'weight_workload',
    label: 'Khối lượng việc',
    color: '#8C5A3C',
    formula: '1 - số đơn đang làm / 3. Thợ đang rảnh được 1 điểm, làm dở từ 3 đơn trở lên được 0.',
  },
]

export const weightSum = (w: Weights) =>
  Math.round(FACTORS.reduce((sum, f) => sum + (w[f.weightField] ?? 0), 0) * 1000) / 1000

// Đưa tổng về đúng 1, làm tròn 3 chữ số; phần dư dồn vào trọng số lớn nhất
export function normalizeWeights(w: Weights): Weights {
  const total = FACTORS.reduce((sum, f) => sum + (w[f.weightField] ?? 0), 0)
  if (total <= 0) {
    return { weight_distance: 0.25, weight_trust: 0.25, weight_price: 0.25, weight_workload: 0.25 }
  }
  const result = { ...w }
  FACTORS.forEach((f) => {
    result[f.weightField] = Math.round(((w[f.weightField] ?? 0) / total) * 1000) / 1000
  })
  const diff = Math.round((1 - weightSum(result)) * 1000) / 1000
  if (diff !== 0) {
    const largest = FACTORS.reduce((a, b) =>
      result[a.weightField] >= result[b.weightField] ? a : b,
    )
    result[largest.weightField] = Math.round((result[largest.weightField] + diff) * 1000) / 1000
  }
  return result
}

export const formatScore = (value: number) => (value * 100).toFixed(1)
