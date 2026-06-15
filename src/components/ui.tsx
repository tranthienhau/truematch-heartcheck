import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, goldGradient, radius, space, shadow } from '../theme';

export function GoldText({ style, children }: { style?: TextStyle; children: React.ReactNode }) {
  // expo-linear-gradient masked text is heavy; gold tint reads well on black.
  return <Text style={[{ color: colors.gold }, style]}>{children}</Text>;
}

export function Eyebrow({ children, color = colors.textDim }: { children: React.ReactNode; color?: string }) {
  return (
    <Text style={{ color, letterSpacing: 3, fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }}>
      {children}
    </Text>
  );
}

export function Card({ style, children }: { style?: ViewStyle; children: React.ReactNode }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function GoldButton({
  label,
  icon,
  onPress,
  disabled,
  style,
}: {
  label: string;
  icon?: any;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        onPress?.();
      }}
      disabled={disabled}
      style={({ pressed }) => [{ opacity: disabled ? 0.4 : pressed ? 0.85 : 1 }, style]}
    >
      <LinearGradient
        colors={goldGradient as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.btn, shadow.gold]}
      >
        {icon && <Ionicons name={icon} size={18} color="#1A1408" style={{ marginRight: 8 }} />}
        <Text style={styles.btnText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function GhostButton({
  label,
  icon,
  onPress,
  tint = colors.text,
  style,
}: {
  label: string;
  icon?: any;
  onPress?: () => void;
  tint?: string;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      style={({ pressed }) => [styles.ghost, { opacity: pressed ? 0.7 : 1 }, style]}
    >
      {icon && <Ionicons name={icon} size={18} color={tint} style={{ marginRight: 8 }} />}
      <Text style={[styles.ghostText, { color: tint }]}>{label}</Text>
    </Pressable>
  );
}

export function Avatar({ initials, color, size = 56 }: { initials: string; color: string; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color + '22',
        borderWidth: 1.5,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color, fontSize: size * 0.4, fontWeight: '700', fontFamily: font.serif }}>
        {initials}
      </Text>
    </View>
  );
}

export function ScoreBar({ value, color }: { value: number; color: string }) {
  const w = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(w, {
      toValue: value,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value]);
  return (
    <View style={styles.track}>
      <Animated.View
        style={{
          height: '100%',
          borderRadius: 999,
          backgroundColor: color,
          width: w.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.md,
  },
  btn: {
    height: 54,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  btnText: { color: '#1A1408', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  ghost: {
    height: 50,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElev,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  ghostText: { fontSize: 15, fontWeight: '700' },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceElev,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
});
