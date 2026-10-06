import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, InputNumber, Slider, Tooltip, Typography } from 'antd'
import { FACTORS, normalizeWeights, weightSum } from '#/components/matching/factors'
import { WeightBar } from '#/components/matching/WeightBar'
import styles from '#/components/matching/matching.module.css'
import { palette } from '#/theme/tokens'
import type { Weights } from '#/types/matching'

interface WeightSlidersProps {
  value: Weights
  onChange: (value: Weights) => void
}

export function WeightSliders({ value, onChange }: WeightSlidersProps) {
  const total = weightSum(value)
  const valid = Math.abs(total - 1) <= 0.001

  return (
    <div className={styles.sliders}>
      {FACTORS.map((f) => (
        <div key={f.key} className={styles.sliderRow}>
          <span className={styles.sliderLabel}>
            <i style={{ background: f.color }} />
            {f.label}
            <Tooltip title={f.formula}>
              <InfoCircleOutlined aria-label={f.formula} style={{ color: palette.muted }} />
            </Tooltip>
          </span>
          <Slider
            min={0}
            max={1}
            step={0.05}
            value={value[f.weightField]}
            onChange={(v) => onChange({ ...value, [f.weightField]: v })}
            styles={{ track: { background: f.color } }}
            aria-label={`Trọng số ${f.label}`}
          />
          <InputNumber
            min={0}
            max={1}
            step={0.05}
            precision={3}
            size="small"
            value={value[f.weightField]}
            onChange={(v) => onChange({ ...value, [f.weightField]: v ?? 0 })}
            style={{ width: 80 }}
            aria-label={`Nhập trọng số ${f.label}`}
          />
        </div>
      ))}
      <div className={styles.sumRow}>
        <Typography.Text type={valid ? 'success' : 'danger'}>
          Tổng trọng số: <strong>{total.toFixed(3)}</strong>
          {valid ? '' : ' (phải bằng 1)'}
        </Typography.Text>
        {!valid && (
          <Button size="small" onClick={() => onChange(normalizeWeights(value))}>
            Chuẩn hóa về tổng 1
          </Button>
        )}
      </div>
      {valid && <WeightBar weights={value} showLegend={false} />}
    </div>
  )
}
