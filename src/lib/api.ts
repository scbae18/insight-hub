const API_BASE_URL = 'http://your-server-ip:8000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const queryString = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString();
  
  const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Request failed');
  }
  
  return response.json();
}

// Types
export interface TodaySummary {
  today_inquiries: number;
  week_inquiries: number;
  avg_response_time_seconds: number;
  unanswered_count: number;
}

export interface TimeDistributionItem {
  hour: number;
  count: number;
}

export interface DashboardStats {
  period: string;
  inquiries: number;
  avg_response_time_seconds: number;
  time_distribution: TimeDistributionItem[];
}

export interface Lead {
  id: number;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  last_question: string | null;
  last_answer: string | null;
  last_message_time: string;
  question_count: number;
  answer_count: number;
  is_unanswered: boolean;
  unanswered_minutes: number | null;
}

export interface LeadsResponse {
  leads: Lead[];
  count: number;
  limit: number;
  offset: number;
}

export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadDetail {
  conversation: Conversation;
  messages: Message[];
  is_unanswered: boolean;
  unanswered_minutes: number | null;
}

export interface UnansweredAlert {
  id: number;
  user_id: string | null;
  last_question: string;
  last_message_time: string;
  unanswered_minutes: number;
}

export interface UnansweredAlertsResponse {
  alerts: UnansweredAlert[];
  count: number;
  threshold_minutes: number;
}

export interface PopularQuestion {
  question: string;
  count: number;
  last_asked: string;
}

export interface PopularQuestionsResponse {
  questions: PopularQuestion[];
}

export interface CarrierStat {
  carrier: string;
  count: number;
}

export interface PopularCarriersResponse {
  carriers: CarrierStat[];
  period: string;
}

export interface ModelStat {
  model: string;
  count: number;
}

export interface PopularModelsResponse {
  models: ModelStat[];
  period: string;
}

export interface TimeDistributionResponse {
  period: string;
  distribution: TimeDistributionItem[];
}

// API Functions
export const api = {
  getTodaySummary: () => 
    fetchApi<TodaySummary>('/api/dashboard/today-summary'),

  getStats: (period: 'today' | 'week' | 'month' = 'today') => 
    fetchApi<DashboardStats>('/api/dashboard/stats', { period }),

  getLeads: (params: {
    userId?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'created_at' | 'updated_at' | 'last_message_time';
    sortOrder?: 'ASC' | 'DESC';
  } = {}) => {
    const queryParams: Record<string, string | number> = {};
    if (params.userId) queryParams.userId = params.userId;
    if (params.limit !== undefined) queryParams.limit = params.limit;
    if (params.offset !== undefined) queryParams.offset = params.offset;
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
    return fetchApi<LeadsResponse>('/api/leads', queryParams);
  },

  getLeadDetail: (id: number) => 
    fetchApi<LeadDetail>(`/api/leads/${id}`),

  getUnansweredAlerts: (minutes: number = 15) => 
    fetchApi<UnansweredAlertsResponse>('/api/alerts/unanswered', { minutes }),

  getPopularQuestions: (limit: number = 10) => 
    fetchApi<PopularQuestionsResponse>('/api/analytics/popular-questions', { limit }),

  getTimeDistribution: (period: 'today' | 'week' | 'month' = 'today') => 
    fetchApi<TimeDistributionResponse>('/api/analytics/time-distribution', { period }),

  getPopularCarriers: (limit: number = 10, period: 'today' | 'week' | 'month' = 'today') => 
    fetchApi<PopularCarriersResponse>('/api/analytics/popular-carriers', { limit, period }),

  getPopularModels: (limit: number = 10, period: 'today' | 'week' | 'month' = 'today') => 
    fetchApi<PopularModelsResponse>('/api/analytics/popular-models', { limit, period }),
};
