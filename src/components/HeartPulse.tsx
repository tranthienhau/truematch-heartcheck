import React from 'react';
import { Animated, Easing, View } from 'react-native';
import { HeartMark } from './Logo';
import { colors } from '../theme';

// Pulsing heart whose beat speed tracks the live BPM stream.
export function HeartPulse({ bpm, size = 120 }: { bpm: number; size?: number }) {
  const s = React.useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    const beatMs = bpm > 0 ? 60000 / bpm : 1000;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(s, { toValue: 1.18, duration: beatMs * 0.25, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(s, { toValue: 1, duration: beatMs * 0.35, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        Animated.timing(s, { toValue: 1.08, duration: beatMs * 0.18, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(s, { toValue: 1, duration: beatMs * 0.22, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bpm]);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ transform: [{ scale: s }] }}>
        <HeartMark size={size} color={colors.coral} />
      </Animated.View>
    </View>
  );
}
