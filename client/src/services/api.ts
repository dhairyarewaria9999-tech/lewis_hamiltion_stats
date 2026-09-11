import {
  CareerOverview,
  EraInfo,
  ChampionshipTrophy,
  ProductItem,
  MissionInitiative,
  FanMessage,
  TeamRadioClip,
  TelemetryData,
  CircuitInfo,
  HelmetItem
} from '../types';

const API_BASE = 'http://localhost:5000/api';

export const api = {
  async getCareerOverview(): Promise<CareerOverview> {
    const res = await fetch(`${API_BASE}/career/overview`);
    const json = await res.json();
    return json.data;
  },

  async getCareerEras(): Promise<EraInfo[]> {
    const res = await fetch(`${API_BASE}/career/eras`);
    const json = await res.json();
    return json.data;
  },

  async getCareerTrophies(): Promise<ChampionshipTrophy[]> {
    const res = await fetch(`${API_BASE}/career/trophies`);
    const json = await res.json();
    return json.data;
  },

  async getTelemetrySnapshot(): Promise<TelemetryData> {
    const res = await fetch(`${API_BASE}/telemetry/snapshot`);
    const json = await res.json();
    return json.data;
  },

  async getProducts(category?: string): Promise<ProductItem[]> {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/store/products${query}`);
    const json = await res.json();
    return json.data;
  },

  async checkout(orderData: {
    items: { id: string; name: string; quantity: number; size: string; color: string; price: number }[];
    customer: { name: string; email: string; country: string; city: string; address: string };
  }) {
    const res = await fetch(`${API_BASE}/store/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return await res.json();
  },

  async getMissionData(): Promise<{
    totalPledged: string;
    studentsImpacted: string;
    grantsAwarded: string;
    initiatives: MissionInitiative[];
  }> {
    const res = await fetch(`${API_BASE}/mission44`);
    const json = await res.json();
    return json.data;
  },

  async getRadioClips(): Promise<TeamRadioClip[]> {
    const res = await fetch(`${API_BASE}/paddock/radio`);
    const json = await res.json();
    return json.data;
  },

  async getFanMessages(): Promise<FanMessage[]> {
    const res = await fetch(`${API_BASE}/paddock/messages`);
    const json = await res.json();
    return json.data;
  },

  async postFanMessage(msg: {
    author: string;
    handle: string;
    country: string;
    flag: string;
    message: string;
  }): Promise<{ success: boolean; data?: FanMessage; errors?: Record<string, string[]> }> {
    const res = await fetch(`${API_BASE}/paddock/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    });
    return await res.json();
  },

  async sendContactInquiry(data: {
    name: string;
    email: string;
    subject: string;
    category: string;
    message: string;
  }) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async getCircuits(): Promise<{ data: CircuitInfo[]; activeTrackId: string }> {
    const res = await fetch(`${API_BASE}/circuits`);
    const json = await res.json();
    return json;
  },

  async setTrack(trackId: string): Promise<{ success: boolean; activeTrack?: CircuitInfo }> {
    const res = await fetch(`${API_BASE}/telemetry/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackId })
    });
    return await res.json();
  },

  async getHelmets(category?: string): Promise<HelmetItem[]> {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/helmets${query}`);
    const json = await res.json();
    return json.data;
  },

  async getHelmet(id: string): Promise<HelmetItem> {
    const res = await fetch(`${API_BASE}/helmets/${id}`);
    const json = await res.json();
    return json.data;
  }
};

