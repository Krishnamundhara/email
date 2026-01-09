import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export interface VerificationResult {
  email: string;
  isValid: boolean;
  error?: string;
}

export interface CampaignResponse {
  campaignId: string;
  totalEmails: number;
  validEmails: number;
  invalidEmails: number;
  verification: VerificationResult[];
}

export async function createCampaign(
  name: string,
  emails: string[],
  subject: string,
  body: string
): Promise<CampaignResponse> {
  const response = await api.post('/campaigns', {
    name,
    emails,
    subject,
    body,
  });
  return response.data;
}

export async function getCampaign(id: string) {
  const response = await api.get(`/campaigns/${id}`);
  return response.data;
}

export async function getAllCampaigns() {
  const response = await api.get('/campaigns');
  return response.data;
}

export async function sendCampaign(id: string) {
  const response = await api.post(`/campaigns/${id}/send`);
  return response.data;
}

export async function stopCampaign(id: string) {
  const response = await api.post(`/campaigns/${id}/stop`);
  return response.data;
}

export async function getCampaignResults(id: string) {
  const response = await api.get(`/campaigns/${id}/results`);
  return response.data;
}

export async function healthCheck() {
  const response = await api.get('/health');
  return response.data;
}

export async function checkServices() {
  const response = await api.get('/health/check-services');
  return response.data;
}
