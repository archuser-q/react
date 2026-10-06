import { ExperimentOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Form,
  InputNumber,
  Segmented,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd'
import { useState } from 'react'
import { WeightBar } from '#/components/matching/WeightBar'
import { WeightSliders } from '#/components/matching/WeightSliders'
import { weightSum } from '#/components/matching/factors'
import { RankingTable } from '#/components/matching/RankingTable'
import styles from '#/components/matching/matching.module.css'
import { useServiceList } from '#/hooks/useCatalog'
import { useSimulate } from '#/hooks/useMatching'
import type { MatchingConfigItem, SimulatePayload, Weights } from '#/types/matching'

const PRESETS = [
  { label: 'Hồ Gươm', lat: 21.0285, lng: 105.8542 },
  { label: 'Cầu Giấy', lat: 21.0333, lng: 105.7937 },
  { label: 'Hai Bà Trưng', lat: 21.0058, lng: 105.8579 },
]

type Source = 'point' | 'order'

interface SimulatorForm {
  order_id?: number
  latitude?: number
  longitude?: number
  service_id?: number
  config_id?: number
  search_radius_km?: number
  include_busy: boolean
}

export function SimulatorPanel({ configs }: { configs: MatchingConfigItem[] }) {
  const [form] = Form.useForm<SimulatorForm>()
  const [source, setSource] = useState<Source>('point')
  const [customWeights, setCustomWeights] = useState<Weights | null>(null)
  const simulate = useSimulate()
  const services = useServiceList({ page: 1, page_size: 200 })
  const active = configs.find((c) => c.is_active)
  const selectedConfigId = Form.useWatch('config_id', form)
  const selected = configs.find((c) => c.id === selectedConfigId) ?? active
  const result = simulate.data
  const customInvalid = customWeights !== null && Math.abs(weightSum(customWeights) - 1) > 0.001

  const run = (values: SimulatorForm) => {
    const payload: SimulatePayload = {
      config_id: values.config_id,
      search_radius_km: values.search_radius_km,
      include_busy: values.include_busy,
      weights: customWeights ?? undefined,
      ...(source === 'order'
        ? { order_id: values.order_id }
        : {
            latitude: values.latitude,
            longitude: values.longitude,
            service_id: values.service_id,
          }),
    }
    simulate.mutate(payload)
  }

  return (
    <Card
      variant="borderless"
      title={
        <Space>
          <ExperimentOutlined />
          Thử thuật toán ghép thợ
        </Space>
      }
    >
      <Typography.Paragraph type="secondary">
        Chạy thử thuật toán trên một vị trí hoặc một đơn có sẵn để xem thợ nào được chọn và vì sao.
        Thao tác này chỉ mô phỏng, không gửi offer cho thợ.
      </Typography.Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ latitude: PRESETS[0].lat, longitude: PRESETS[0].lng, include_busy: false }}
        onFinish={run}
      >
        <div className={styles.simGrid}>
          <div>
            <Segmented<Source>
              value={source}
              onChange={setSource}
              options={[
                { value: 'point', label: 'Theo tọa độ' },
                { value: 'order', label: 'Theo đơn hàng' },
              ]}
              style={{ marginBottom: 16 }}
            />
            {source === 'order' ? (
              <Form.Item
                name="order_id"
                label="Mã đơn hàng"
                rules={[{ required: true, message: 'Nhập mã đơn' }]}
                extra="Lấy vị trí và dịch vụ của đơn này để chạy thử."
              >
                <InputNumber min={1} prefix="#" style={{ width: 180 }} />
              </Form.Item>
            ) : (
              <>
                <Space wrap size={6} style={{ marginBottom: 8 }}>
                  {PRESETS.map((p) => (
                    <Button
                      key={p.label}
                      size="small"
                      onClick={() => form.setFieldsValue({ latitude: p.lat, longitude: p.lng })}
                    >
                      {p.label}
                    </Button>
                  ))}
                </Space>
                <Space wrap>
                  <Form.Item name="latitude" label="Vĩ độ" rules={[{ required: true }]}>
                    <InputNumber min={-90} max={90} step={0.001} style={{ width: 150 }} />
                  </Form.Item>
                  <Form.Item name="longitude" label="Kinh độ" rules={[{ required: true }]}>
                    <InputNumber min={-180} max={180} step={0.001} style={{ width: 150 }} />
                  </Form.Item>
                </Space>
                <Form.Item name="service_id" label="Dịch vụ">
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="label"
                    placeholder="Mọi dịch vụ"
                    loading={services.isLoading}
                    options={services.data?.items.map((s) => ({
                      value: s.id,
                      label: `${s.name} (${s.category_name})`,
                    }))}
                  />
                </Form.Item>
              </>
            )}
          </div>

          <div>
            <Form.Item name="config_id" label="Cấu hình">
              <Select
                placeholder={active ? `${active.name} (đang áp dụng)` : 'Chọn cấu hình'}
                allowClear
                options={configs.map((c) => ({
                  value: c.id,
                  label: c.is_active ? `${c.name} (đang áp dụng)` : c.name,
                }))}
              />
            </Form.Item>
            <Space wrap size={16}>
              <Form.Item name="search_radius_km" label="Bán kính tìm">
                <InputNumber
                  min={0.5}
                  max={50}
                  step={0.5}
                  addonAfter="km"
                  placeholder={selected ? String(selected.search_radius_km) : '5'}
                  style={{ width: 140 }}
                />
              </Form.Item>
              <Form.Item name="include_busy" label="Tính cả thợ đang bận" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Space>
            <div className={styles.customToggle}>
              <Switch
                size="small"
                checked={customWeights !== null}
                onChange={(on) => setCustomWeights(on && selected ? { ...selected } : null)}
                aria-label="Thử trọng số khác"
              />
              <span>Thử trọng số khác (không lưu vào cấu hình)</span>
            </div>
            {customWeights ? (
              <WeightSliders value={customWeights} onChange={setCustomWeights} />
            ) : (
              selected && <WeightBar weights={selected} />
            )}
          </div>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          icon={<ExperimentOutlined />}
          loading={simulate.isPending}
          disabled={customInvalid}
          style={{ marginTop: 8 }}
        >
          Chạy mô phỏng
        </Button>
      </Form>

      {result && (
        <div style={{ marginTop: 24 }}>
          <Alert
            type={result.candidates_found ? 'info' : 'warning'}
            showIcon
            style={{ marginBottom: 12 }}
            title={
              result.candidates_found
                ? `Tìm thấy ${result.candidates_found} thợ đủ điều kiện trong ${result.search_radius_km} km. ${Math.min(result.max_offers, result.candidates_found)} thợ điểm cao nhất sẽ nhận offer.`
                : `Không có thợ nào đủ điều kiện trong ${result.search_radius_km} km. Thử tăng bán kính hoặc tính cả thợ đang bận.`
            }
            description={`Cấu hình: ${result.config_name}${
              result.target.order_id ? `, đơn #${result.target.order_id}` : ''
            }${result.target.service_name ? `, dịch vụ ${result.target.service_name}` : ', mọi dịch vụ'}`}
          />
          {result.candidates_found > 0 && <RankingTable data={result.ranking} />}
        </div>
      )}
    </Card>
  )
}
