import { useEffect } from 'react';
import { useStore } from './store';
import { NEARBY_USERS } from './data';

// Self-driving demo: steps the app through the full HeartCheck flow on a loop
// so it can be screen-recorded hands-free. Set DEMO = true to replay it; the
// shipped app is interactive (DEMO = false) and driven by taps.
export const DEMO = false;

type Step = [number, () => void];

export function useAutopilot(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const s = () => useStore.getState();
    let timers: any[] = [];

    const reset = () => {
      s().closeReport();
      s().disconnectDevice();
      if (s().discoverable) s().toggleDiscoverable();
      s().setTab('home');
    };

    const script: Step[] = [
      [600, () => s().setTab('home')],
      [3600, () => s().setTab('discover')],
      [5400, () => { if (!s().discoverable) s().toggleDiscoverable(); }], // go discoverable
      [11200, () => s().initiateHeartCheck(NEARBY_USERS[0])], // run HeartCheck on Amelia
      [17000, () => s().closeReport()],
      [18200, () => s().setTab('device')],
      [19600, () => s().connectDevice()], // pair HeartCheck band
      [26500, () => s().setTab('profile')],
      [29500, () => { s().setTab('home'); reset(); }],
    ];

    const LOOP = 33000;
    const run = () => {
      reset();
      timers = script.map(([t, fn]) => setTimeout(fn, t));
      timers.push(setTimeout(run, LOOP));
    };
    run();

    return () => timers.forEach(clearTimeout);
  }, [enabled]);
}
