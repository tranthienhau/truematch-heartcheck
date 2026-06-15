import React from 'react';
import { View, Text, Pressable, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors, font } from '../theme';
import { NearbyUser } from '../data';

const SIZE = 300;
const C = SIZE / 2;

function PulseRing({ delay }: { delay: number }) {
  const a = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(a, {
        toValue: 1,
        duration: 2600,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <Animated.View
      style={[
        styles.pulse,
        {
          opacity: a.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0.5, 0] }),
          transform: [{ scale: a.interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }) }],
        },
      ]}
    />
  );
}

// place a user on the radar by index (angle) + distance (radius)
function place(u: NearbyUser, i: number) {
  const angle = (-90 + i * 122) * (Math.PI / 180);
  const r = 40 + Math.min(105, u.distanceM * 7);
  return { x: C + r * Math.cos(angle), y: C + r * Math.sin(angle) };
}

export function Radar({
  users,
  discovering,
  onSelect,
}: {
  users: NearbyUser[];
  discovering: boolean;
  onSelect: (u: NearbyUser) => void;
}) {
  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
      {discovering && <PulseRing delay={0} />}
      {discovering && <PulseRing delay={1300} />}

      <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="rg" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#E8C77A" stopOpacity="0.10" />
            <Stop offset="1" stopColor="#E8C77A" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx={C} cy={C} r={C - 6} fill="url(#rg)" />
        {[1, 2, 3].map((n) => (
          <Circle
            key={n}
            cx={C}
            cy={C}
            r={(C - 10) * (n / 3)}
            stroke={colors.border}
            strokeWidth={1}
            fill="none"
          />
        ))}
        <Line x1={C} y1={10} x2={C} y2={SIZE - 10} stroke={colors.borderSoft} strokeWidth={1} />
        <Line x1={10} y1={C} x2={SIZE - 10} y2={C} stroke={colors.borderSoft} strokeWidth={1} />
      </Svg>

      {/* center = you */}
      <View style={styles.center}>
        <Text style={styles.centerText}>YOU</Text>
      </View>

      {/* found users */}
      {users.map((u, i) => {
        const p = place(u, i);
        return (
          <Pressable
            key={u.id}
            onPress={() => onSelect(u)}
            style={[styles.dot, { left: p.x - 28, top: p.y - 28, borderColor: u.accent }]}
          >
            <Text style={[styles.dotInit, { color: u.accent }]}>{u.initials}</Text>
            <Text style={styles.dotDist}>{u.distanceM}m</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pulse: {
    position: 'absolute',
    width: SIZE - 20,
    height: SIZE - 20,
    borderRadius: SIZE,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  center: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.gold,
    shadowOpacity: 0.6,
    shadowRadius: 14,
  },
  centerText: { color: '#1A1408', fontWeight: '900', fontSize: 12, letterSpacing: 1 },
  dot: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceElev,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInit: { fontSize: 20, fontWeight: '800', fontFamily: font.serif },
  dotDist: { color: colors.textDim, fontSize: 10, marginTop: 1 },
});
