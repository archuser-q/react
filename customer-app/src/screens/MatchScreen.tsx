import { useState } from 'react';
import { Alert, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { PulseDot } from '../components/PulseDot';
import { Header, Screen } from '../components/Screen';
import { StateView } from '../components/StateView';
import { api, errMsg, type OrderStatus } from '../api';
import { useApi, useInterval } from '../hooks/useApi';
import { ORDER_STATUS, etaMinutes, fmtKm, haversineKm, money, orderCode } from '../utils/format';
import { confirmCancel } from '../utils/cancel';
import { useNav } from '../navigation/NavigationContext';
import { colors, mono, op } from '../theme';

const POLL_MS = 5000;
const WAITING: OrderStatus[] = ['pending'];

export default function MatchScreen() {
  const { navigate, orderId } = useNav();
  const [cancelling, setCancelling] = useState(false);

  const q = useApi(async () => {
    if (!orderId) return null;
    const order = await api.getOrder(orderId);
    if (!order.worker) return { order, worker: null, tracking: null };
    const [worker, tracking] = await Promise.all([api.getWorker(order.worker.id), api.getTracking(order.id)]);
    return { order, worker, tracking };
  }, [orderId]);

  const order = q.data?.order;
  // Đơn chưa có thợ thì hỏi lại server mỗi 5 giây
  useInterval(() => q.reload(true), POLL_MS, !!order && WAITING.includes(order.status));

  if (!orderId) {
    return (
      <Screen>
        <Header title="Thợ phù hợp" />
        <StateView empty="Chưa có yêu cầu nào đang tìm thợ" icon="account-search-outline" actionLabel="Đặt dịch vụ" onAction={() => navigate('home')} />
      </Screen>
    );
  }
  if (!q.data || !order) {
    return (
      <Screen>
        <Header title="Thợ phù hợp" />
        <StateView loading={q.loading} error={q.error} onRetry={() => q.reload()} />
      </Screen>
    );
  }

  const cancel = () =>
    confirmCancel(async (reason) => {
      setCancelling(true);
      try {
        await api.cancelOrder(order.id, reason);
        await q.reload(true);
      } catch (e) {
        Alert.alert('Không hủy được', errMsg(e));
      } finally {
        setCancelling(false);
      }
    });

  const w = q.data.worker;
  const t = q.data.tracking;
  const km =
    t?.worker_latitude != null && t.worker_longitude != null
      ? haversineKm(t.worker_latitude, t.worker_longitude, order.latitude, order.longitude)
      : null;
  const ratings = w?.recent_reviews ?? [];
  const avg = ratings.length ? ratings.reduce((s, r) => s + r.rating, 0) / ratings.length : null;
  const trust = Math.round((w?.trust_score ?? 0) * 100);

  const subtitle =
    order.status === 'pending'
      ? 'Đang tìm thợ gần bạn...'
      : order.status === 'cancelled'
        ? 'Yêu cầu đã hủy'
        : 'Đã tìm được thợ cho bạn';

  return (
    <Screen>
      <Header title="Thợ phù hợp" subtitle={subtitle} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={q.refreshing} onRefresh={q.refresh} tintColor={colors.primary} colors={[colors.primary]} />}
      >
        <View style={styles.info}>
          <Icon name="lightning-bolt" size={14} color={colors.blue500} />
          <Text style={styles.infoText}>
            Hệ thống chọn thợ tốt nhất dựa trên{' '}
            <Text style={{ fontWeight: '700' }}>Weighted Scoring</Text>: khoảng cách, đánh giá, độ tin cậy.
          </Text>
        </View>

        {/* Thông tin yêu cầu */}
        <View style={styles.card}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{order.service_name}</Text>
            <Text style={[styles.price, { color: colors.primary }]}>{money(order.total_amount ?? order.estimated_price)}</Text>
          </View>
          <Text style={styles.spec} numberOfLines={2}>{orderCode(order.id)} · {order.address_line}</Text>
          <View style={[styles.meta, { marginTop: 10 }]}>
            {order.status === 'pending' ? (
              <View style={styles.metaItem}>
                <PulseDot size={6} color={colors.primary} />
                <Text style={[styles.metaText, { color: colors.primary, fontWeight: '600' }]}>Đang chờ thợ nhận đơn</Text>
              </View>
            ) : (
              <View style={styles.metaItem}>
                <Text style={[styles.metaText, { color: ORDER_STATUS[order.status].color, fontWeight: '600' }]}>
                  {ORDER_STATUS[order.status].label}
                </Text>
              </View>
            )}
          </View>
          {order.can_cancel && (
            <Pressable onPress={cancel} disabled={cancelling} style={[styles.cancel, cancelling && { opacity: 0.5 }]}>
              <Text style={styles.cancelText}>{cancelling ? 'Đang hủy...' : 'Hủy yêu cầu'}</Text>
            </Pressable>
          )}
        </View>

        {order.status === 'cancelled' && (
          <StateView empty={order.cancel_reason ? `Lý do: ${order.cancel_reason}` : 'Yêu cầu đã hủy'} icon="close-circle-outline" actionLabel="Đặt lại" onAction={() => navigate('home')} />
        )}

        {/* Thợ đã nhận đơn */}
        {w && (
          <View style={[styles.card, { borderColor: colors.primary, backgroundColor: op(colors.primary, 0.04) }]}>
            <View style={styles.row}>
              <View>
                <Avatar name={w.full_name} size={48} />
                <View style={styles.verified}>
                  <Icon name="check" size={10} color="#fff" />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{w.full_name}</Text>
                  <Text style={[styles.price, { color: colors.primary }]}>{money(order.total_amount ?? order.estimated_price)}</Text>
                </View>
                <Text style={styles.spec}>
                  {order.service_name}
                  {w.experience_years ? ` · ${w.experience_years} năm` : ''}
                </Text>
                <View style={styles.meta}>
                  <View style={styles.metaItem}>
                    <Icon name="star" size={12} color={colors.amber400} />
                    <Text style={styles.rating}>{avg ? avg.toFixed(1) : 'Mới'}</Text>
                    <Text style={styles.metaText}>({w.review_count})</Text>
                  </View>
                  {km !== null && (
                    <>
                      <View style={styles.metaItem}>
                        <Icon name="map-marker-outline" size={12} color={colors.gray400} />
                        <Text style={styles.metaText}>{fmtKm(km)}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Icon name="clock-outline" size={12} color={colors.gray400} />
                        <Text style={styles.metaText}>~{etaMinutes(km)} phút</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.trustRow}>
              <Icon name="shield-check" size={14} color={colors.emerald500} />
              <View style={styles.trackBar}>
                <View style={[styles.fill, { width: `${trust}%` }]} />
              </View>
              <Text style={styles.trust}>{trust}/100</Text>
            </View>

            <Pressable onPress={() => navigate('track', { orderId: order.id })} style={styles.choose}>
              <Text style={styles.chooseText}>Theo dõi thợ</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, gap: 12 },
  info: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12,
    backgroundColor: '#F0F9FF', borderWidth: 1, borderColor: colors.blue100,
  },
  infoText: { flex: 1, fontSize: 12, color: colors.blue700, lineHeight: 17 },
  card: {
    padding: 16, borderRadius: 16, borderWidth: 2, borderColor: colors.gray100, backgroundColor: '#fff',
  },
  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  verified: {
    position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: 9,
    backgroundColor: colors.blue500, borderWidth: 2, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 14, fontWeight: '700', color: colors.text },
  price: { fontSize: 14, fontWeight: '700' },
  spec: { fontSize: 12, color: colors.gray400, marginTop: 2 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: 12, fontWeight: '600', color: colors.text },
  metaText: { fontSize: 12, color: colors.gray400 },
  trustRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  trackBar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.gray100, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3, backgroundColor: colors.emerald500 },
  trust: { fontSize: 12, fontWeight: '700', color: colors.emerald600, fontFamily: mono },
  choose: {
    marginTop: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center',
  },
  chooseText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  cancel: {
    marginTop: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.red100, alignItems: 'center',
  },
  cancelText: { color: colors.red500, fontSize: 14, fontWeight: '600' },
});
