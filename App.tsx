import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar, Platform, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native';

LogBox.ignoreLogs(['SafeAreaView has been deprecated']);
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme';
import { useStore } from './src/store';
import { HomeScreen } from './src/screens/HomeScreen';
import { DeviceScreen } from './src/screens/DeviceScreen';
import { DiscoveryScreen } from './src/screens/DiscoveryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ReportModal } from './src/screens/ReportModal';
import { useAutopilot, DEMO } from './src/autopilot';

const TABS = [
  { key: 'home', label: 'Home', icon: 'sparkles-outline', active: 'sparkles' },
  { key: 'device', label: 'Band', icon: 'pulse-outline', active: 'pulse' },
  { key: 'discover', label: 'Discover', icon: 'navigate-outline', active: 'navigate' },
  { key: 'profile', label: 'Profile', icon: 'person-outline', active: 'person' },
] as const;

export default function App() {
  const { tab, setTab } = useStore();
  useAutopilot(DEMO);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.body}>
          {tab === 'home' && <HomeScreen />}
          {tab === 'device' && <DeviceScreen />}
          {tab === 'discover' && <DiscoveryScreen />}
          {tab === 'profile' && <ProfileScreen />}
        </View>
      </SafeAreaView>

      <View style={styles.tabBar}>
        {TABS.map((t) => {
          const on = tab === t.key;
          return (
            <Pressable key={t.key} style={styles.tab} onPress={() => setTab(t.key as any)}>
              <Ionicons name={(on ? t.active : t.icon) as any} size={23} color={on ? colors.gold : colors.textDim} />
              <Text style={[styles.tabLabel, { color: on ? colors.gold : colors.textDim }]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <ReportModal />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1 },
  body: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.bg2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 14,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 10.5, fontWeight: '700', marginTop: 3, letterSpacing: 0.3 },
});
