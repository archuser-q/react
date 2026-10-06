import { Tooltip } from 'antd'
import { FACTORS } from '#/components/matching/factors'
import styles from '#/components/matching/matching.module.css'
import type { Weights } from '#/types/matching'

export function WeightBar({
  weights,
  showLegend = true,
}: {
  weights: Weights
  showLegend?: boolean
}) {
  return (
    <div>
      <div className={styles.bar} role="img" aria-label="Tỷ trọng các tiêu chí">
        {FACTORS.map((f) => {
          const value = weights[f.weightField]
          return value > 0 ? (
            <Tooltip key={f.key} title={`${f.label}: ${Math.round(value * 100)}%`}>
              <span style={{ width: `${value * 100}%`, background: f.color }} />
            </Tooltip>
          ) : null
        })}
      </div>
      {showLegend && (
        <div className={styles.legend}>
          {FACTORS.map((f) => (
            <span key={f.key}>
              <i style={{ background: f.color }} />
              {f.label} {Math.round(weights[f.weightField] * 100)}%
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
