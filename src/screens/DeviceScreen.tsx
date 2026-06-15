import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeartPulse } from '../components/HeartPulse';
import { Card, Eyebrow, GoldButton, GhostButton } from '../components/ui';
import { colors, font, space } from '../theme';
import { useStore } from '../store';

function Stat({ icon, color, value, unit, label }: { icon: any; color: string; value: string; unit: string; label: string }) {
  return (
    <Card style={{ flex: 1, alignItems: 'center', paddingVertical: 18 }}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={styles.statVal}>
        {value}
        <Text style={styles.statUnit}> {unit}</Text>
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

export function DeviceScreen() {
  const { deviceStatus, bpm, hrv, battery, connectDevice, disconnectDevice } = useStore();
  const connected = deviceStatus === 'connected';

  return (
    <ScrollView contentContainerStyle={{ padding: space.lg, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      <Eyebrow>Bluetooth Low Energy</Eyebrow>
      <Text style={styles.h1}>HeartCheck Band</Text>

      <Card style={{ alignItems: 'center', paddingVertical: 30, marginTop: 16 }}>
        {deviceStatus === 'idle' && (
          <>
            <View style={styles.discIcon}>
              <Ionicons name="bluetooth" size={40} color={colors.gold} />
            </View>
            <Text style={styles.status}>Not paired</Text>
            <Text style={styles.sub}>Pair your HeartCheck band to stream live signals.</Text>
          </>
        )}

        {deviceStatus === 'scanning' && (
          <>
            <ActivityIndicator size="large" color={colors.gold} />
            <Text style={[styles.status, { marginTop: 16 }]}>Scanning for devices…</Text>
            <Text style={styles.sub}>HeartCheck-Band-7F3A</Text>
          </>
        )}

        {connected && (
          <>
            <HeartPulse bpm={bpm} size={132} />
            <Text style={styles.bpm}>{bpm}</Text>
            <Text style={styles.bpmLabel}>BPM · live</Text>
            <View style={styles.connRow}>
              <View style={styles.dotGreen} />
              <Text style={styles.connText}>Connected · HeartCheck-Band-7F3A</Text>
            </View>
          </>
        )}
      </Card>

      {connected && (
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          <Stat icon="heart-outline" color={colors.coral} value={String(bpm)} unit="bpm" label="Heart Rate" />
          <Stat icon="analytics-outline" color={colors.gold} value={String(hrv)} unit="ms" label="HRV" />
          <Stat icon="battery-half-outline" color={colors.green} value={String(battery)} unit="%" label="Battery" />
        </View>
      )}

      <View style={{ marginTop: 22 }}>
        {connected ? (
          <GhostButton label="Disconnect" icon="bluetooth-outline" tint={colors.coral} onPress={disconnectDevice} />
        ) : (
          <GoldButton
            label={deviceStatus === 'scanning' ? 'Pairing…' : 'Pair HeartCheck Band'}
            icon="bluetooth"
            disabled={deviceStatus === 'scanning'}
            onPress={connectDevice}
          />
        )}
      </View>

      <Text style={styles.note}>Demo build streams simulated biometric data, no hardware required.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { color: colors.text, fontSize: 28, fontWeight: '700', fontFamily: font.serif, marginTop: 4 },
  discIcon: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElev,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: { color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 14 },
  sub: { color: colors.textMuted, fontSize: 13, marginTop: 6, textAlign: 'center', paddingHorizontal: 20 },
  bpm: { color: colors.coral, fontSize: 56, fontWeight: '800', marginTop: 6, fontVariant: ['tabular-nums'] },
  bpmLabel: { color: colors.textMuted, fontSize: 12, letterSpacing: 2, marginTop: -4, textTransform: 'uppercase' },
  connRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  dotGreen: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.green, marginRight: 8 },
  connText: { color: colors.textMuted, fontSize: 12.5 },
  statVal: { color: colors.text, fontSize: 22, fontWeight: '800', marginTop: 8, fontVariant: ['tabular-nums'] },
  statUnit: { color: colors.textDim, fontSize: 12, fontWeight: '600' },
  statLabel: { color: colors.textDim, fontSize: 11, marginTop: 2, letterSpacing: 0.5 },
  note: { color: colors.textDim, fontSize: 11.5, textAlign: 'center', marginTop: 22, lineHeight: 16 },
});
