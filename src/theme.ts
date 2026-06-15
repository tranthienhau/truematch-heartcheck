// TrueMatch Co. / HeartCheck brand theme
// Sourced from truematchco.com: black + champagne-gold luxury, coral heart accent.

export const colors = {
  bg: '#0B0B0C',
  bg2: '#121214',
  surface: '#16161A',
  surfaceElev: '#1E1E24',
  border: '#2A2A30',
  borderSoft: '#222228',

  // Gold (logo gradient: champagne -> bronze)
  gold: '#E8C77A',
  goldLight: '#F6E7A8',
  goldDeep: '#C9A24B',
  goldDim: '#8A7740',

  // Heart / HeartCheck accent
  coral: '#F25A5A',
  red: '#EB4D4D',

  green: '#3FCB5A',
  greenDeep: '#25BA3B',

  text: '#F8F8F7',
  textMuted: '#B9B9B7',
  textDim: '#7C7C78',

  white: '#FFFFFF',
  black: '#000000',
};

export const goldGradient = ['#F8ECB8', '#E8C77A', '#C9A24B', '#A87B2C'];
export const heartGradient = ['#FF7B7B', '#F25A5A', '#D63B3B'];

export const font = {
  serif: 'Georgia', // elegant serif to echo the TRUE MATCH wordmark
  sans: 'System',
  mono: 'Menlo',
};

export const radius = { sm: 10, md: 16, lg: 22, xl: 28, pill: 999 };
export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };

export const shadow = {
  gold: {
    shadowColor: colors.gold,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
};
