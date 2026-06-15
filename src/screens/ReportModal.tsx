import React from 'react';
import { View, Text, Modal, ScrollView, StyleSheet, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, ScoreBar, GoldButton, Eyebrow } from '../components/ui';
import { HeartMark } from '../components/Logo';
import { ME, overallVerdict } from '../data';
import { colors, font, space } from '../theme';
import { useStore } from '../store';

const STAGE_TEXT: Record<string, string> = {
  handshake: 'BLE handshake…',
  exchanging: 'Exchanging HeartCheck profiles…',
  analyzing: 'Analyzing compatibility…',
  ready: 'Done',
};

function Ring({ value, color }: { value: number; color: string }) {
  const r = 58;
  const circ = 2 * Math.PI * r;
  return (
    <View style={{ width: 150, height: 150, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={150} height={150} style={StyleSheet.absoluteFill}>
        <Circle cx={75} cy={75} r={r} stroke={colors.surfaceElev} strokeWidth={11} fill="none" />
        <Circle
          cx={75}
          cy={75}
          r={r}
          stroke={color}
          strokeWidth={11}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={circ * (1 - value / 100)}
          transform="rotate(-90 75 75)"
        />
      </Svg>
      <Text style={[styles.ringVal, { color }]}>{value}%</Text>
      <Text style={styles.ringLabel}>MATCH</Text>
    </View>
  );
}

export function ReportModal() {
  const { activeUser, reportStatus, reportProgress, closeReport } = useStore();
  const open = !!activeUser;
  const ready = reportStatus === 'ready';
  const u = activeUser;
  const verdict = u ? overallVerdict(u.overall) : { label: '', color: colors.gold };

  return (
    <Modal visible={open} animationType="slide" transparent onRequestClose={closeReport}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.grab} />
          {!u ? null : !ready ? (
            // ---- progress state ----
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <View style={styles.pair}>
                <Avatar initials={ME.initials} color={colors.gold} size={56} />
                <View style={{ marginHorizontal: 14 }}>
                  <HeartMark size={26} color={colors.coral} />
                </View>
                <Avatar initials={u.initials} color={u.accent} size={56} />
              </View>
              <Text style={styles.runTitle}>Running HeartCheck</Text>
              <Text style={styles.runSub}>{STAGE_TEXT[reportStatus]}</Text>
              <View style={styles.progTrack}>
                <View style={[styles.progFill, { width: `${reportProgress}%` }]} />
              </View>
              <Text style={styles.progPct}>{reportProgress}%</Text>
            </View>
          ) : (
            // ---- ready state ----
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
              <View style={{ alignItems: 'center' }}>
                <Eyebrow>HeartCheck Report</Eyebrow>
                <View style={[styles.pair, { marginTop: 14 }]}>
                  <View style={{ alignItems: 'center' }}>
                    <Avatar initials={ME.initials} color={colors.gold} size={50} />
                    <Text style={styles.pName}>{ME.name}</Text>
                  </View>
                  <View style={{ marginHorizontal: 16 }}>
                    <HeartMark size={22} color={colors.coral} />
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Avatar initials={u.initials} color={u.accent} size={50} />
                    <Text style={styles.pName}>{u.name}</Text>
                  </View>
                </View>

                <View style={{ marginTop: 14 }}>
                  <Ring value={u.overall} color={verdict.color} />
                </View>
                <View style={[styles.verdict, { borderColor: verdict.color + '66', backgroundColor: verdict.color + '14' }]}>
                  <Text style={[styles.verdictText, { color: verdict.color }]}>{verdict.label}</Text>
                </View>
              </View>

              <View style={{ marginTop: 22 }}>
                <Eyebrow>Dimensions</Eyebrow>
              </View>
              {u.dimensions.map((d) => (
                <View key={d.key} style={styles.dimRow}>
                  <View style={styles.dimHead}>
                    <Ionicons name={d.icon as any} size={15} color={colors.gold} />
                    <Text style={styles.dimLabel}>{d.label}</Text>
                    <Text style={styles.dimScore}>{d.score}</Text>
                  </View>
                  <ScoreBar value={d.score} color={overallVerdict(d.score).color} />
                </View>
              ))}

              <View style={{ marginTop: 22 }}>
                <GoldButton label="Done" icon="checkmark" onPress={closeReport} />
              </View>
            </ScrollView>
          )}

          {!ready && (
            <Pressable onPress={closeReport} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#000000CC', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.bg2,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: space.lg,
    paddingBottom: 30,
    maxHeight: '90%',
  },
  grab: { width: 42, height: 5, borderRadius: 3, backgroundColor: colors.border, alignSelf: 'center', marginTop: 10, marginBottom: 8 },
  pair: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  pName: { color: colors.textMuted, fontSize: 12, marginTop: 6, fontWeight: '600' },
  runTitle: { color: colors.text, fontSize: 20, fontWeight: '700', fontFamily: font.serif, marginTop: 22 },
  runSub: { color: colors.textMuted, fontSize: 13, marginTop: 6 },
  progTrack: { width: '80%', height: 8, borderRadius: 999, backgroundColor: colors.surfaceElev, marginTop: 22, overflow: 'hidden' },
  progFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 999 },
  progPct: { color: colors.gold, fontSize: 13, fontWeight: '700', marginTop: 8, fontVariant: ['tabular-nums'] },
  ringVal: { fontSize: 34, fontWeight: '800', fontVariant: ['tabular-nums'] },
  ringLabel: { color: colors.textDim, fontSize: 11, letterSpacing: 2, marginTop: -2 },
  verdict: { marginTop: 16, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 999, borderWidth: 1 },
  verdictText: { fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
  dimRow: { marginTop: 14 },
  dimHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  dimLabel: { color: colors.text, fontSize: 14, fontWeight: '600', marginLeft: 8, flex: 1 },
  dimScore: { color: colors.textMuted, fontSize: 14, fontWeight: '700', fontVariant: ['tabular-nums'] },
  cancel: { alignItems: 'center', paddingVertical: 14 },
  cancelText: { color: colors.textDim, fontSize: 14, fontWeight: '600' },
});
