import { LockOutlined, PhoneOutlined, ToolFilled } from '@ant-design/icons'
import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import styles from '#/pages/auth/login.module.css'
import { useLogin } from '#/hooks/useAuth'
import type { LoginPayload } from '#/types/auth'

export function LoginPage({ expired }: { expired?: boolean }) {
  const login = useLogin()

  return (
    <main className={styles.page}>
      <Card variant="borderless" className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.mark}>
            <ToolFilled />
          </span>
          <div>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Thợ Nhanh
            </Typography.Title>
            <Typography.Text type="secondary">Đăng nhập trang quản trị</Typography.Text>
          </div>
        </div>

        {expired && !login.error && (
          <Alert
            type="warning"
            showIcon
            title="Phiên đăng nhập đã hết hạn, hãy đăng nhập lại"
            style={{ marginBottom: 16 }}
          />
        )}
        {login.error && (
          <Alert type="error" showIcon title={login.error.message} style={{ marginBottom: 16 }} />
        )}

        <Form<LoginPayload>
          layout="vertical"
          requiredMark={false}
          onFinish={(v) => login.mutate(v)}
        >
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Nhập số điện thoại' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              size="large"
              autoComplete="username"
              inputMode="tel"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Nhập mật khẩu' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={login.isPending}>
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </main>
  )
}
