import React from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radar } from '../components/Radar';
import { Card, Eyebrow, Avatar } from '../components/ui';
import { overallVerdict, NearbyUser } from '../data';
import { colors, font, space } from '../theme';
import { useStore } from '../store';

function NearbyRow({ u, onPress }: { u: NearbyUser; onPress: () => void }) {
  const v = overallVerdict(u.overall);
  return (
    <Pressable onPress={onPress}>
      <Card style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Avatar initials={u.initials} color={u.accent} size={50} />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={styles.name}>
            {u.name} <Text style={styles.age}>· {u.age}</Text>
          </Text>
          <Text style={styles.tag} numberOfLines={1}>{u.tagline}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Ionicons name="bluetooth" size={11} color={colors.textDim} />
            <Text style={styles.meta}> {u.distanceM}m · {u.rssi} dBm</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.score, { color: v.color }]}>{u.overall}%</Text>
          <View style={styles.initBtn}>
            <Text style={styles.initText}>HeartCheck</Text>
            <Ionicons name="chevron-forward" size={12} color={colors.gold} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

export function DiscoveryScreen() {
  const { discoverable, discovering, nearby, toggleDiscoverable, initiateHeartCheck } = useStore();

  return (
    <ScrollView contentContainerStyle={{ padding: space.lg, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      <Eyebrow>BLE Nearby Discovery</Eyebrow>
      <Text style={styles.h1}>Discover Nearby</Text>

      <Pressable onPress={toggleDiscoverable}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
          <View style={[styles.bIcon, { borderColor: discoverable ? colors.gold : colors.border }]}>
            <Ionicons name="radio" size={20} color={discoverable ? colors.gold : colors.textDim} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.toggleTitle}>Discoverable</Text>
            <Text style={styles.toggleSub}>
              {discoverable ? 'Broadcasting over Bluetooth' : 'You are hidden from nearby members'}
            </Text>
          </View>
          <Switch
            value={discoverable}
            onValueChange={toggleDiscoverable}
            trackColor={{ true: colors.goldDeep, false: colors.surfaceElev }}
            thumbColor={discoverable ? colors.goldLight : '#888'}
            ios_backgroundColor={colors.surfaceElev}
            pointerEvents="none"
          />
        </Card>
      </Pressable>

      <View style={{ alignItems: 'center', marginTop: 18 }}>
        <Radar users={discoverable ? nearby : []} discovering={discovering} onSelect={initiateHeartCheck} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 10 }}>
        <Eyebrow>{discoverable ? `${nearby.length} nearby` : 'Nearby members'}</Eyebrow>
        {discovering && <ActivityIndicator size="small" color={colors.gold} style={{ marginLeft: 10 }} />}
      </View>

      {!discoverable && (
        <Card style={{ alignItems: 'center', paddingVertical: 26 }}>
          <Ionicons name="eye-off-outline" size={26} color={colors.textDim} />
          <Text style={styles.empty}>Turn on Discoverable to find members around you.</Text>
        </Card>
      )}

      {discoverable && nearby.map((u) => (
        <NearbyRow key={u.id} u={u} onPress={() => initiateHeartCheck(u)} />
      ))}

      {discoverable && (
        <Text style={styles.note}>Tap a member to run a HeartCheck, no prior connection or shared link needed.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { color: colors.text, fontSize: 28, fontWeight: '700', fontFamily: font.serif, marginTop: 4 },
  bIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: colors.surfaceElev,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  toggleSub: { color: colors.textMuted, fontSize: 12.5, marginTop: 2 },
  name: { color: colors.text, fontSize: 16, fontWeight: '700' },
  age: { color: colors.textDim, fontWeight: '500' },
  tag: { color: colors.textMuted, fontSize: 12.5, marginTop: 2 },
  meta: { color: colors.textDim, fontSize: 11 },
  score: { fontSize: 20, fontWeight: '800' },
  initBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  initText: { color: colors.gold, fontSize: 12, fontWeight: '700', marginRight: 2 },
  empty: { color: colors.textMuted, fontSize: 13, marginTop: 10, textAlign: 'center' },
  note: { color: colors.textDim, fontSize: 11.5, textAlign: 'center', marginTop: 10, lineHeight: 16 },
});
