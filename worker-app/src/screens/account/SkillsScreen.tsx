import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../../components/Text';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, errMsg, qk } from '../../api';
import { useWorkerMe } from '../../auth/AuthContext';
import { Banner } from '../../components/Bits';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { useOverlay } from '../../components/Overlay';
import { Header, Screen } from '../../components/Screen';
import { StateView } from '../../components/StateView';
import type { ScreenProps } from '../../navigation/types';
import { colors, radius } from '../../theme';
import { money, serviceIcon } from '../../utils/format';

export default function SkillsScreen({ navigation }: ScreenProps<'Skills'>) {
  const me = useWorkerMe();
  const qc = useQueryClient();
  const ui = useOverlay();
  const catalog = useQuery({
    queryKey: qk.catalog,
    queryFn: async () => ({ categories: await api.categories(), services: await api.services() }),
    staleTime: 5 * 60_000,
  });
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (me.data) setPicked(new Set(me.data.skills.map((s) => s.service_id)));
  }, [me.data]);

  const groups = useMemo(() => {
    if (!catalog.data) return [];
    return catalog.data.categories
      .map((c) => ({ ...c, services: catalog.data.services.filter((s) => s.category_id === c.id) }))
      .filter((g) => g.services.length);
  }, [catalog.data]);

  if (!catalog.data || !me.data) {
    return (
      <Screen>
        <Header title="Dịch vụ nhận làm" />
        <StateView
          loading={catalog.isLoading || me.isLoading}
          error={catalog.error ? errMsg(catalog.error) : me.error ? errMsg(me.error) : null}
          onRetry={() => void catalog.refetch()}
        />
      </Screen>
    );
  }

  const toggle = (id: number) =>
    setPicked((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const toggleGroup = (ids: number[]) =>
    setPicked((s) => {
      const n = new Set(s);
      const all = ids.every((i) => n.has(i));
      ids.forEach((i) => (all ? n.delete(i) : n.add(i)));
      return n;
    });

  const save = async () => {
    if (!picked.size) return void ui.alert('Chưa chọn dịch vụ', 'Chọn ít nhất 1 dịch vụ bạn làm được.', 'warning');
    setBusy(true);
    try {
      await api.setServices([...picked]);
      await qc.invalidateQueries({ queryKey: qk.me });
      ui.toast(`Đã lưu ${picked.size} dịch vụ`);
      navigation.goBack();
    } catch (e) {
      void ui.alert('Chưa lưu được', errMsg(e), 'danger');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <Header title="Dịch vụ nhận làm" subtitle={`Đã chọn ${picked.size} dịch vụ`} right={{ icon: 'map-marker-radius-outline', onPress: () => navigation.navigate('ServiceArea'), label: 'Khu vực' }} />
      <ScrollView contentContainerStyle={styles.body}>
        <Banner text="Bạn chỉ nhận được đơn của những dịch vụ đã chọn. Giá hiển thị là giá tham chiếu của nền tảng; phát sinh thêm vật tư thì gửi báo giá cho khách duyệt." />
        {groups.map((g) => {
          const ids = g.services.map((s) => s.id);
          const all = ids.every((i) => picked.has(i));
          return (
            <View key={g.id} style={styles.group}>
              <View style={styles.groupHead}>
                <Text style={styles.groupTitle}>{g.name}</Text>
                <Pressable onPress={() => toggleGroup(ids)} hitSlop={8}>
                  <Text style={styles.all}>{all ? 'Bỏ chọn' : 'Chọn tất cả'}</Text>
                </Pressable>
              </View>
              {g.services.map((s, i) => {
                const on = picked.has(s.id);
                return (
                  <Pressable key={s.id} onPress={() => toggle(s.id)} style={[styles.item, i > 0 && styles.line]}>
                    <View style={[styles.icon, { backgroundColor: on ? colors.primaryLight : colors.line }]}>
                      <Icon name={serviceIcon(s.name)} size={18} color={on ? colors.primary : colors.faint} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{s.name}</Text>
                      <Text style={styles.price}>
                        Từ {money(s.base_price)}
                        {s.unit ? ` / ${s.unit}` : ''}
                      </Text>
                    </View>
                    <Icon name={on ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color={on ? colors.primary : colors.faint} />
                  </Pressable>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Button title={`Lưu (${picked.size} dịch vụ)`} onPress={save} loading={busy} size="lg" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { padding: 16, gap: 14, paddingBottom: 24 },
  group: { backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  groupHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingTop: 12, paddingBottom: 6 },
  groupTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  all: { fontSize: 13, color: colors.primary, fontWeight: '700' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 12 },
  line: { borderTopWidth: 1, borderTopColor: colors.line },
  icon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '600', color: colors.text },
  price: { fontSize: 12, color: colors.faint, marginTop: 2 },
  footer: { padding: 16, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.line },
});
