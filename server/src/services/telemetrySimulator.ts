import { TelemetryData, CircuitInfo } from '../types/index.js';
import { circuits } from '../data/mockData.js';

class TelemetrySimulator {
  private activeCircuit: CircuitInfo = circuits[0];
  private lapProgress = 0.28;
  private lapTimeSeconds = 24.5;
  private subscribers: Set<(data: TelemetryData) => void> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private currentData: TelemetryData;

  // Smoothing state
  private curSpeed = 310;
  private curRpm = 11800;
  private curThrottle = 100;
  private curBrake = 0;
  private curLatG = 0.2;
  private curLongG = 1.6;

  // Tires
  private flTemp = 101.4;
  private frTemp = 103.2;
  private rlTemp = 98.6;
  private rrTemp = 99.8;

  constructor() {
    this.currentData = this.generateSnapshot();
    this.startSimulation();
  }

  private startSimulation() {
    const TICK_MS = 50; // 20Hz update rate
    this.intervalId = setInterval(() => {
      this.tick(TICK_MS);
    }, TICK_MS);
  }

  private tick(deltaMs: number) {
    const totalLapSeconds = this.activeCircuit.lengthKm * 14.4;
    const progressDelta = (deltaMs / 1000) / totalLapSeconds;

    this.lapProgress = (this.lapProgress + progressDelta) % 1.0;
    this.lapTimeSeconds = (this.lapTimeSeconds + (deltaMs / 1000)) % totalLapSeconds;

    // Determine current track zone
    const zones = this.activeCircuit.zones;
    const zone = zones.find(
      z => this.lapProgress >= z.startPct && this.lapProgress < z.endPct
    ) || zones[0];

    // Smooth interpolations towards zone targets with subtle micro-noise for realism
    const lerpFactor = 0.12;
    const noise = (Math.random() - 0.5) * 2;

    this.curSpeed += (zone.targetSpeed - this.curSpeed) * lerpFactor + noise * 0.4;
    this.curThrottle += (zone.throttle - this.curThrottle) * lerpFactor;
    this.curBrake += (zone.brake - this.curBrake) * lerpFactor;
    this.curLatG += (zone.latG - this.curLatG) * lerpFactor + noise * 0.08;
    this.curLongG += (zone.longG - this.curLongG) * lerpFactor + noise * 0.08;

    // RPM calculations linked to speed and gear ratio
    const targetRpm = Math.min(12800, Math.max(4500, (this.curSpeed / (zone.gear * 44)) * 11500 + noise * 60));
    this.curRpm += (targetRpm - this.curRpm) * 0.2;

    // Dynamic tire heating
    const heatLoad = (Math.abs(this.curLatG) * 0.05) + (this.curBrake > 30 ? 0.08 : -0.02);
    this.flTemp = Math.min(125, Math.max(90, this.flTemp + heatLoad * (this.curLatG > 0 ? 1.4 : 0.8)));
    this.frTemp = Math.min(125, Math.max(90, this.frTemp + heatLoad * (this.curLatG < 0 ? 1.4 : 0.8)));
    this.rlTemp = Math.min(125, Math.max(90, this.rlTemp + (this.curThrottle > 80 ? 0.04 : -0.01)));
    this.rrTemp = Math.min(125, Math.max(90, this.rrTemp + (this.curThrottle > 80 ? 0.04 : -0.01)));

    // Lap time formatting
    const mins = Math.floor(this.lapTimeSeconds / 60);
    const secs = (this.lapTimeSeconds % 60).toFixed(3).padStart(6, '0');
    const formattedLap = `${mins}:${secs}`;

    const deltaSign = this.lapTimeSeconds < 84.8 ? '-' : '+';
    const deltaDiff = Math.abs(this.lapTimeSeconds - (this.lapProgress * 84.8)).toFixed(3);
    const deltaToFastest = `${deltaSign}${deltaDiff}s`;

    this.currentData = {
      speed: Math.round(Math.max(0, this.curSpeed)),
      rpm: Math.round(Math.max(4000, this.curRpm)),
      gear: zone.gear,
      throttle: Math.round(Math.max(0, Math.min(100, this.curThrottle))),
      brake: Math.round(Math.max(0, Math.min(100, this.curBrake))),
      drsActive: zone.drs,
      ersHarvesting: this.curBrake > 40,
      ersDeploying: this.curThrottle > 85,
      gForceLat: parseFloat(this.curLatG.toFixed(2)),
      gForceLong: parseFloat(this.curLongG.toFixed(2)),
      tireTemps: {
        fl: parseFloat(this.flTemp.toFixed(1)),
        fr: parseFloat(this.frTemp.toFixed(1)),
        rl: parseFloat(this.rlTemp.toFixed(1)),
        rr: parseFloat(this.rrTemp.toFixed(1)),
      },
      lapTime: formattedLap,
      lapSeconds: parseFloat(this.lapTimeSeconds.toFixed(3)),
      lapProgress: parseFloat((this.lapProgress * 100).toFixed(2)),
      trackSection: zone.name,
      sector: zone.sector,
      deltaToFastest,
      timestamp: Date.now()
    };

    // Broadcast to subscribers
    for (const callback of this.subscribers) {
      try {
        callback(this.currentData);
      } catch (err) {
        console.error('Error in telemetry subscriber callback:', err);
      }
    }
  }

  public getCurrentTelemetry(): TelemetryData {
    return this.currentData;
  }

  public setTrack(trackId: string): boolean {
    const found = circuits.find(c => c.id.toLowerCase() === trackId.toLowerCase());
    if (found) {
      this.activeCircuit = found;
      this.lapProgress = 0.05;
      this.lapTimeSeconds = 3.5;
      this.curSpeed = found.zones[0]?.targetSpeed || 250;
      this.curThrottle = 85;
      this.curBrake = 0;
      return true;
    }
    return false;
  }

  public getActiveTrack(): CircuitInfo {
    return this.activeCircuit;
  }

  public subscribe(callback: (data: TelemetryData) => void): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private generateSnapshot(): TelemetryData {
    return {
      speed: 312,
      rpm: 11850,
      gear: 8,
      throttle: 100,
      brake: 0,
      drsActive: true,
      ersHarvesting: false,
      ersDeploying: true,
      gForceLat: 0.15,
      gForceLong: 1.75,
      tireTemps: { fl: 102.1, fr: 103.5, rl: 99.2, rr: 100.1 },
      lapTime: '0:24.512',
      lapSeconds: 24.512,
      lapProgress: 28.5,
      trackSection: 'Wellington Straight',
      sector: 1,
      deltaToFastest: '-0.245s',
      timestamp: Date.now()
    };
  }
}

export const telemetrySimulator = new TelemetrySimulator();
