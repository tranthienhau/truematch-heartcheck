import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Card, Eyebrow, GhostButton } from '../components/ui';
import { ME } from '../data';
import { colors, font, space } from '../theme';

const MY_DIMS = [
  { label: 'Values', icon: 'diamond-outline' },
  { label: 'Communication', icon: 'chatbubbles-outline' },
  { label: 'Emotional Depth', icon: 'heart-half-outline' },
  { label: 'Life Goals', icon: 'compass-outline' },
];

export function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: space.lg, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      <Eyebrow>Your HeartCheck</Eyebrow>
      <Text style={styles.h1}>Profile</Text>

      <Card style={{ alignItems: 'center', paddingVertical: 26, marginTop: 14 }}>
        <Avatar initials={ME.initials} color={colors.gold} size={84} />
        <Text style={styles.name}>{ME.name}, {ME.age}</Text>
        <Text style={styles.tag}>{ME.tagline}</Text>
        <View style={styles.linkPill}>
          <Ionicons name="link" size={13} color={colors.gold} />
          <Text style={styles.link}>{ME.link}</Text>
        </View>
      </Card>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Eyebrow>Profile completeness</Eyebrow>
      </View>
      {MY_DIMS.map((d) => (
        <Card key={d.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Ionicons name={d.icon as any} size={18} color={colors.gold} />
          <Text style={styles.dim}>{d.label}</Text>
          <Ionicons name="checkmark-circle" size={18} color={colors.green} />
        </Card>
      ))}

      <View style={{ marginTop: 14, gap: 12 }}>
        <GhostButton label="Share my HeartCheck link" icon="share-outline" tint={colors.gold} />
        <GhostButton label="Settings" icon="settings-outline" tint={colors.textMuted} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { color: colors.text, fontSize: 28, fontWeight: '700', fontFamily: font.serif, marginTop: 4 },
  name: { color: colors.text, fontSize: 22, fontWeight: '700', fontFamily: font.serif, marginTop: 14 },
  tag: { color: colors.textMuted, fontSize: 13, marginTop: 6, fontStyle: 'italic' },
  linkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElev,
  },
  link: { color: colors.gold, fontSize: 13, marginLeft: 6, fontWeight: '600' },
  dim: { color: colors.text, fontSize: 15, fontWeight: '600', flex: 1, marginLeft: 12 },
});
