import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, RadialGradient, Circle } from 'react-native-svg';
import { goldGradient } from '../theme';

// Stylized TrueMatch mark: a heart intertwined with an infinity knot, gold.
export function Logo({ size = 96, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={goldGradient[0]} />
            <Stop offset="0.4" stopColor={goldGradient[1]} />
            <Stop offset="0.75" stopColor={goldGradient[2]} />
            <Stop offset="1" stopColor={goldGradient[3]} />
          </LinearGradient>
          <RadialGradient id="halo" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#E8C77A" stopOpacity="0.28" />
            <Stop offset="1" stopColor="#E8C77A" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {glow && <Circle cx="50" cy="50" r="48" fill="url(#halo)" />}

        {/* Infinity knot (figure-eight) */}
        <Path
          d="M22 50 C22 34 40 34 50 50 C60 66 78 66 78 50 C78 34 60 34 50 50 C40 66 22 66 22 50 Z"
          fill="none"
          stroke="url(#gold)"
          strokeWidth={5}
          strokeLinecap="round"
        />

        {/* Heart at the crossover */}
        <Path
          d="M50 60 C44 53 35 51 35 43 C35 38 39 35 43 35 C46 35 49 37 50 40 C51 37 54 35 57 35 C61 35 65 38 65 43 C65 51 56 53 50 60 Z"
          fill="url(#gold)"
        />
      </Svg>
    </View>
  );
}

// Small filled heart mark for badges / accents.
export function HeartMark({ size = 24, color = '#F25A5A' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 84 C18 62 12 40 12 28 C12 16 21 8 32 8 C40 8 47 13 50 21 C53 13 60 8 68 8 C79 8 88 16 88 28 C88 40 82 62 50 84 Z"
        fill={color}
      />
    </Svg>
  );
}
