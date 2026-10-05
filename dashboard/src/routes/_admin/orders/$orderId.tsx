import { createFileRoute, notFound, useRouter } from '@tanstack/react-router'
import { OrderDetailPage } from '#/pages/orders/OrderDetailPage'

export const Route = createFileRoute('/_admin/orders/$orderId')({
  params: {
    parse: ({ orderId }) => {
      const id = Number(orderId)
      if (!Number.isInteger(id) || id <= 0) throw notFound()
      return { orderId: id }
    },
    stringify: ({ orderId }) => ({ orderId: String(orderId) }),
  },
  component: OrderDetailRoute,
})

function OrderDetailRoute() {
  const { orderId } = Route.useParams()
  const navigate = Route.useNavigate()
  const router = useRouter()
  return (
    <OrderDetailPage
      orderId={orderId}
      onBack={() =>
        router.history.canGoBack() ? router.history.back() : navigate({ to: '/orders' })
      }
    />
  )
}
