# Demo capture flow

How the screenshots and the screen-recording in this repo were produced, and how
to reproduce them on an iOS Simulator.

## Prerequisites

- Xcode + iOS Simulator (built and verified on iPhone 17 Pro, iOS 26)
- Node 20, `npx expo` (Expo SDK 56)
- `ffmpeg` (only for trimming / converting the recording)

## 1. Boot the simulator

```bash
xcrun simctl boot "iPhone 17 Pro"
open -a Simulator
```

## 2. Run the app (native debug build)

Expo Go cannot host SDK 56 here, so the app runs as a native debug build:

```bash
cd truematch-heartcheck
npm install
npx expo run:ios --device "iPhone 17 Pro"
```

First build runs `expo prebuild` + CocoaPods + `xcodebuild` (a few minutes); later
runs are fast.

## 3. Self-driving demo (autopilot)

Set `DEMO = true` in `src/autopilot.ts`. While on, the app steps itself through the
whole flow on a ~33s loop with no taps required (this is how `demo.mp4` was made):

```
Home → Discover → toggle Discoverable → nearby users appear over BLE
     → run HeartCheck on the top match → compatibility report
     → Band tab → pair HeartCheck band → live BPM stream
     → Profile → back to Home (loop)
```

The shipped default is `DEMO = false` (interactive, tap-driven).

## 4. Record

```bash
xcrun simctl io booted recordVideo --codec=h264 --force demo_raw.mov
# Ctrl-C after one full loop (~33s)
```

Convert / trim to mp4:

```bash
ffmpeg -i demo_raw.mov -c:v libx264 -pix_fmt yuv420p -movflags +faststart demo.mp4
```

## 5. Screenshots

Stills in `screenshots/` were extracted from the recording with ffmpeg, e.g.:

```bash
ffmpeg -i demo.mp4 -ss 00:00:02 -frames:v 1 screenshots/01-home.png
```

## Notes

- BLE here is fully simulated (dummy data) so it runs on a Simulator with no
  hardware. In a real build the same screens are backed by `react-native-ble-plx`
  for the HeartCheck band and BLE advertise/scan for Nearby Discovery.
