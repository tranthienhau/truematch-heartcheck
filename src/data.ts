// Dummy data for the HeartCheck demo (no real backend / no real BLE).

export type Dimension = {
  key: string;
  label: string;
  icon: string; // ionicons name
  score: number; // 0-100
};

export type NearbyUser = {
  id: string;
  name: string;
  age: number;
  initials: string;
  tagline: string;
  distanceM: number; // BLE-estimated proximity in meters
  rssi: number; // signal strength
  accent: string;
  dimensions: Dimension[];
  overall: number;
};

const dim = (key: string, label: string, icon: string, score: number): Dimension => ({
  key,
  label,
  icon,
  score,
});

// Multi-dimensional compatibility model surfaced on truematchco.com:
// values, communication, emotional depth, life goals (+ lifestyle, intimacy).
export const NEARBY_USERS: NearbyUser[] = [
  {
    id: 'u_amelia',
    name: 'Amelia',
    age: 29,
    initials: 'A',
    tagline: 'Reads too much, walks too far',
    distanceM: 4,
    rssi: -52,
    accent: '#F25A5A',
    dimensions: [
      dim('values', 'Values', 'diamond-outline', 94),
      dim('communication', 'Communication', 'chatbubbles-outline', 88),
      dim('emotional', 'Emotional Depth', 'heart-half-outline', 91),
      dim('goals', 'Life Goals', 'compass-outline', 86),
      dim('lifestyle', 'Lifestyle', 'leaf-outline', 79),
      dim('intimacy', 'Intimacy', 'flame-outline', 83),
    ],
    overall: 89,
  },
  {
    id: 'u_noah',
    name: 'Noah',
    age: 32,
    initials: 'N',
    tagline: 'Builder. Climber. Bad cook.',
    distanceM: 9,
    rssi: -67,
    accent: '#E8C77A',
    dimensions: [
      dim('values', 'Values', 'diamond-outline', 71),
      dim('communication', 'Communication', 'chatbubbles-outline', 64),
      dim('emotional', 'Emotional Depth', 'heart-half-outline', 58),
      dim('goals', 'Life Goals', 'compass-outline', 77),
      dim('lifestyle', 'Lifestyle', 'leaf-outline', 69),
      dim('intimacy', 'Intimacy', 'flame-outline', 62),
    ],
    overall: 67,
  },
  {
    id: 'u_sofia',
    name: 'Sofia',
    age: 27,
    initials: 'S',
    tagline: 'Designer, plant hoarder, night owl',
    distanceM: 14,
    rssi: -74,
    accent: '#3FCB5A',
    dimensions: [
      dim('values', 'Values', 'diamond-outline', 82),
      dim('communication', 'Communication', 'chatbubbles-outline', 90),
      dim('emotional', 'Emotional Depth', 'heart-half-outline', 76),
      dim('goals', 'Life Goals', 'compass-outline', 72),
      dim('lifestyle', 'Lifestyle', 'leaf-outline', 88),
      dim('intimacy', 'Intimacy', 'flame-outline', 70),
    ],
    overall: 80,
  },
];

export const overallVerdict = (score: number) => {
  if (score >= 85) return { label: 'Strong Alignment', color: '#3FCB5A' };
  if (score >= 70) return { label: 'Promising Match', color: '#E8C77A' };
  if (score >= 55) return { label: 'Mixed Signals', color: '#F2A23A' };
  return { label: 'Low Alignment', color: '#F25A5A' };
};

// Local user's HeartCheck profile (the "me" side of every comparison).
export const ME = {
  name: 'Jordan',
  initials: 'J',
  age: 30,
  link: 'truematchco.com/h/jordan',
  tagline: 'Coffee, mountains, long conversations',
};
