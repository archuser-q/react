import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { App, Button, Card, Dropdown, Skeleton, Tag, Typography } from 'antd'
import { useState } from 'react'
import { CategoryFormModal } from '#/components/catalog/CategoryFormModal'
import styles from '#/components/catalog/catalog.module.css'
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from '#/hooks/useCatalog'
import type { CategoryItem } from '#/types/catalog'

interface CategoryPanelProps {
  categories?: CategoryItem[]
  loading: boolean
  selectedId?: number
  onSelect: (id?: number) => void
}

export function CategoryPanel({ categories, loading, selectedId, onSelect }: CategoryPanelProps) {
  const { modal } = App.useApp()
  const [editing, setEditing] = useState<CategoryItem | null | 'new'>(null)
  const create = useCreateCategory()
  const update = useUpdateCategory()
  const remove = useDeleteCategory()
  const totalServices = categories?.reduce((sum, c) => sum + c.services_total, 0) ?? 0

  const confirmDelete = (c: CategoryItem) =>
    modal.confirm({
      title: `Xóa danh mục "${c.name}"?`,
      content: 'Chỉ xóa được danh mục không còn dịch vụ nào.',
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () =>
        remove
          .mutateAsync(c.id)
          .then(() => selectedId === c.id && onSelect(undefined))
          .catch(() => undefined),
    })

  return (
    <Card
      variant="borderless"
      title="Danh mục"
      extra={
        <Button size="small" icon={<PlusOutlined />} onClick={() => setEditing('new')}>
          Thêm
        </Button>
      }
      styles={{ body: { padding: 8 } }}
    >
      {loading && !categories ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <ul className={styles.categories}>
          <li className={styles.categoryRow}>
            <button
              type="button"
              className={`${styles.category} ${selectedId === undefined ? styles.categoryActive : ''}`}
              onClick={() => onSelect(undefined)}
            >
              <span>Tất cả dịch vụ</span>
              <span className={styles.count}>{totalServices}</span>
            </button>
          </li>
          {categories?.map((c) => (
            <li key={c.id} className={styles.categoryRow}>
              <button
                type="button"
                className={`${styles.category} ${selectedId === c.id ? styles.categoryActive : ''}`}
                onClick={() => onSelect(c.id)}
              >
                <span className={c.is_active ? undefined : styles.muted}>
                  {c.name}
                  {!c.is_active && (
                    <Tag style={{ marginLeft: 6 }} bordered={false}>
                      Đang ẩn
                    </Tag>
                  )}
                </span>
                <span className={styles.count}>
                  {c.services_active}/{c.services_total}
                </span>
              </button>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [
                    { key: 'edit', icon: <EditOutlined />, label: 'Sửa tên, mô tả' },
                    c.is_active
                      ? { key: 'hide', icon: <EyeInvisibleOutlined />, label: 'Tạm ẩn danh mục' }
                      : { key: 'show', icon: <EyeOutlined />, label: 'Hiển thị lại' },
                    { type: 'divider' },
                    {
                      key: 'delete',
                      icon: <DeleteOutlined />,
                      label: 'Xóa danh mục',
                      danger: true,
                    },
                  ],
                  onClick: ({ key }) => {
                    if (key === 'edit') setEditing(c)
                    if (key === 'hide' || key === 'show')
                      update.mutate({ id: c.id, is_active: key === 'show' })
                    if (key === 'delete') confirmDelete(c)
                  },
                }}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<MoreOutlined />}
                  aria-label={`Thao tác với danh mục ${c.name}`}
                />
              </Dropdown>
            </li>
          ))}
        </ul>
      )}
      <Typography.Paragraph type="secondary" className={styles.hint}>
        Số bên phải: dịch vụ đang bán / tổng số dịch vụ. Danh mục bị ẩn sẽ không hiện trên app khách
        hàng.
      </Typography.Paragraph>

      <CategoryFormModal
        open={editing !== null}
        category={editing === 'new' ? null : editing}
        loading={create.isPending || update.isPending}
        onCancel={() => setEditing(null)}
        onSubmit={(values) => {
          const action =
            editing === 'new' || editing === null
              ? create.mutateAsync(values).then((c) => onSelect(c.id))
              : update.mutateAsync({ id: editing.id, ...values })
          action.then(() => setEditing(null)).catch(() => undefined)
        }}
      />
    </Card>
  )
}
