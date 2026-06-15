import { create } from 'zustand';
import { NEARBY_USERS, NearbyUser } from './data';

type Tab = 'home' | 'device' | 'discover' | 'profile';
type DeviceStatus = 'idle' | 'scanning' | 'connected';
type ReportStatus = 'idle' | 'handshake' | 'exchanging' | 'analyzing' | 'ready';

// Timers kept outside the store so they never trigger re-renders.
let bpmTimer: any = null;
let discoverTimer: any = null;
let reportTimer: any = null;

type State = {
  tab: Tab;
  setTab: (t: Tab) => void;

  // HeartCheck BLE wearable (mock react-native-ble-plx device)
  deviceStatus: DeviceStatus;
  bpm: number;
  battery: number;
  hrv: number;
  connectDevice: () => void;
  disconnectDevice: () => void;

  // Nearby Discovery (BLE advertise + scan, simulated)
  discoverable: boolean;
  discovering: boolean;
  nearby: NearbyUser[];
  toggleDiscoverable: () => void;

  // HeartCheck compatibility session
  activeUser: NearbyUser | null;
  reportStatus: ReportStatus;
  reportProgress: number;
  initiateHeartCheck: (u: NearbyUser) => void;
  closeReport: () => void;
};

export const useStore = create<State>((set, get) => ({
  tab: 'home',
  setTab: (t) => set({ tab: t }),

  deviceStatus: 'idle',
  bpm: 0,
  battery: 87,
  hrv: 0,
  connectDevice: () => {
    if (get().deviceStatus !== 'idle') return;
    set({ deviceStatus: 'scanning' });
    setTimeout(() => {
      set({ deviceStatus: 'connected', bpm: 72, hrv: 58 });
      bpmTimer = setInterval(() => {
        // gentle wander around a resting heart rate + HRV jitter
        const b = get().bpm || 72;
        const next = Math.max(58, Math.min(96, b + Math.round((Math.sin(b) + (b % 3) - 1) )));
        set({ bpm: next, hrv: 50 + (next % 18) });
      }, 900);
    }, 1900);
  },
  disconnectDevice: () => {
    if (bpmTimer) clearInterval(bpmTimer);
    bpmTimer = null;
    set({ deviceStatus: 'idle', bpm: 0, hrv: 0 });
  },

  discoverable: false,
  discovering: false,
  nearby: [],
  toggleDiscoverable: () => {
    const on = !get().discoverable;
    if (discoverTimer) clearInterval(discoverTimer);
    discoverTimer = null;
    if (!on) {
      set({ discoverable: false, discovering: false, nearby: [] });
      return;
    }
    set({ discoverable: true, discovering: true, nearby: [] });
    // Reveal nearby HeartCheck users one by one as BLE picks them up.
    let i = 0;
    discoverTimer = setInterval(() => {
      if (i >= NEARBY_USERS.length) {
        clearInterval(discoverTimer);
        discoverTimer = null;
        set({ discovering: false });
        return;
      }
      const found = NEARBY_USERS.slice(0, i + 1);
      set({ nearby: found });
      i += 1;
    }, 1100);
  },

  activeUser: null,
  reportStatus: 'idle',
  reportProgress: 0,
  initiateHeartCheck: (u) => {
    if (reportTimer) clearInterval(reportTimer);
    set({ activeUser: u, reportStatus: 'handshake', reportProgress: 0 });
    const stages: ReportStatus[] = ['handshake', 'exchanging', 'analyzing', 'ready'];
    let p = 0;
    reportTimer = setInterval(() => {
      p += 4;
      const idx = Math.min(3, Math.floor(p / 26));
      set({ reportProgress: Math.min(100, p), reportStatus: stages[idx] });
      if (p >= 100) {
        clearInterval(reportTimer);
        reportTimer = null;
        set({ reportStatus: 'ready', reportProgress: 100 });
      }
    }, 90);
  },
  closeReport: () => {
    if (reportTimer) clearInterval(reportTimer);
    reportTimer = null;
    set({ activeUser: null, reportStatus: 'idle', reportProgress: 0 });
  },
}));
