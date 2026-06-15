import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '../components/Logo';
import { Card, Eyebrow, GoldButton, GhostButton } from '../components/ui';
import { colors, font, space, radius } from '../theme';
import { useStore } from '../store';

function Feature({ icon, color, title, body }: { icon: any; color: string; title: string; body: string }) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.fIcon, { backgroundColor: color + '1E', borderColor: color + '55' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.fTitle}>{title}</Text>
          <Text style={styles.fBody}>{body}</Text>
        </View>
      </View>
    </Card>
  );
}

export function HomeScreen() {
  const setTab = useStore((s) => s.setTab);
  return (
    <ScrollView contentContainerStyle={{ padding: space.lg, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <Logo size={104} />
        <Text style={styles.wordmark}>TRUE MATCH CO.</Text>
        <View style={styles.rule} />
        <Text style={styles.product}>
          HeartCheck<Text style={styles.tm}>™</Text>
        </Text>
        <Text style={styles.tagline}>Know Your Compatibility Before You Fall</Text>
      </View>

      <View style={{ marginTop: 28, marginBottom: 14 }}>
        <Eyebrow>What it does</Eyebrow>
      </View>

      <Feature
        icon="pulse-outline"
        color={colors.coral}
        title="HeartCheck Band (BLE)"
        body="Pair your HeartCheck wearable over Bluetooth to capture live biometric signals."
      />
      <Feature
        icon="radio-outline"
        color={colors.gold}
        title="Nearby Discovery"
        body="Go discoverable and let nearby members find you over Bluetooth, no link needed."
      />
      <Feature
        icon="git-compare-outline"
        color={colors.green}
        title="Compatibility Report"
        body="Instant multi-dimensional read on values, communication, emotional depth and goals."
      />

      <View style={{ marginTop: 18, gap: 12 }}>
        <GoldButton label="Discover Nearby" icon="navigate" onPress={() => setTab('discover')} />
        <GhostButton label="Pair HeartCheck Band" icon="bluetooth" tint={colors.gold} onPress={() => setTab('device')} />
      </View>

      <Text style={styles.footer}>truematchco.com  ·  demo build</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    color: colors.gold,
    fontFamily: font.serif,
    fontSize: 26,
    letterSpacing: 4,
    marginTop: 14,
    fontWeight: '600',
  },
  rule: { width: 70, height: 1, backgroundColor: colors.goldDim, marginVertical: 12 },
  product: { color: colors.text, fontFamily: font.serif, fontSize: 30, fontWeight: '600' },
  tm: { fontSize: 13, color: colors.gold },
  tagline: { color: colors.textMuted, fontStyle: 'italic', fontSize: 14, marginTop: 8, fontFamily: font.serif },
  fIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  fTitle: { color: colors.text, fontSize: 15.5, fontWeight: '700' },
  fBody: { color: colors.textMuted, fontSize: 12.5, marginTop: 3, lineHeight: 17 },
  footer: { color: colors.textDim, textAlign: 'center', marginTop: 30, fontSize: 12, letterSpacing: 1 },
});
