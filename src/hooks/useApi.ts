import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useTodaySummary = () => {
  return useQuery({
    queryKey: ['todaySummary'],
    queryFn: api.getTodaySummary,
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useStats = (period: 'today' | 'week' | 'month' = 'today') => {
  return useQuery({
    queryKey: ['stats', period],
    queryFn: () => api.getStats(period),
  });
};

export const useLeads = (params: {
  userId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'updated_at' | 'last_message_time';
  sortOrder?: 'ASC' | 'DESC';
} = {}) => {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => api.getLeads(params),
  });
};

export const useLeadDetail = (id: number | null) => {
  return useQuery({
    queryKey: ['leadDetail', id],
    queryFn: () => api.getLeadDetail(id!),
    enabled: id !== null,
  });
};

export const useUnansweredAlerts = (minutes: number = 15) => {
  return useQuery({
    queryKey: ['unansweredAlerts', minutes],
    queryFn: () => api.getUnansweredAlerts(minutes),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const usePopularQuestions = (limit: number = 10) => {
  return useQuery({
    queryKey: ['popularQuestions', limit],
    queryFn: () => api.getPopularQuestions(limit),
  });
};

export const useTimeDistribution = (period: 'today' | 'week' | 'month' = 'today') => {
  return useQuery({
    queryKey: ['timeDistribution', period],
    queryFn: () => api.getTimeDistribution(period),
  });
};

export const usePopularCarriers = (limit: number = 10, period: 'today' | 'week' | 'month' = 'today') => {
  return useQuery({
    queryKey: ['popularCarriers', limit, period],
    queryFn: () => api.getPopularCarriers(limit, period),
  });
};

export const usePopularModels = (limit: number = 10, period: 'today' | 'week' | 'month' = 'today') => {
  return useQuery({
    queryKey: ['popularModels', limit, period],
    queryFn: () => api.getPopularModels(limit, period),
  });
};
