import { useState } from 'react';
import { MessageSquare, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TimeDistributionChart } from '@/components/dashboard/TimeDistributionChart';
import { PeriodSelector } from '@/components/dashboard/PeriodSelector';
import { PopularQuestionsCard } from '@/components/analytics/PopularQuestionsCard';
import { ErrorState } from '@/components/common/ErrorState';
import { useTodaySummary, useStats, usePopularQuestions, useUnansweredAlerts } from '@/hooks/useApi';
import { AlertsList } from '@/components/alerts/AlertsList';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  
  const { data: summary, isLoading: summaryLoading, error: summaryError, refetch: refetchSummary } = useTodaySummary();
  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useStats(period);
  const { data: questions, isLoading: questionsLoading } = usePopularQuestions(5);
  const { data: alerts, isLoading: alertsLoading } = useUnansweredAlerts(30);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}초`;
    return `${Math.round(seconds / 60)}분`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">대시보드</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            RAG 챗봇 운영 현황을 한눈에 확인하세요
          </p>
        </div>

        {/* Summary Cards */}
        {summaryError ? (
          <ErrorState onRetry={() => refetchSummary()} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="오늘 문의"
              value={summary?.today_inquiries ?? 0}
              icon={MessageSquare}
              variant="primary"
              isLoading={summaryLoading}
            />
            <StatCard
              title="이번 주 문의"
              value={summary?.week_inquiries ?? 0}
              icon={TrendingUp}
              isLoading={summaryLoading}
            />
            <StatCard
              title="평균 응답 시간"
              value={summary ? formatTime(summary.avg_response_time_seconds) : '-'}
              icon={Clock}
              isLoading={summaryLoading}
            />
            <StatCard
              title="미응답 문의"
              value={summary?.unanswered_count ?? 0}
              icon={AlertTriangle}
              variant={summary?.unanswered_count ? 'warning' : 'default'}
              isLoading={summaryLoading}
            />
          </div>
        )}

        {/* Period Selector & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">기간별 통계</h2>
          <PeriodSelector value={period} onChange={setPeriod} />
        </div>

        {/* Charts Grid */}
        {statsError ? (
          <ErrorState onRetry={() => refetchStats()} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TimeDistributionChart 
                data={stats?.time_distribution ?? []} 
                isLoading={statsLoading}
              />
            </div>
            
            <Card className="p-5">
              <h3 className="text-base font-semibold text-foreground mb-4">기간 요약</h3>
              {statsLoading ? (
                <div className="space-y-4">
                  <div className="h-16 bg-muted rounded animate-pulse" />
                  <div className="h-16 bg-muted rounded animate-pulse" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground">총 문의</p>
                    <p className="text-2xl font-bold text-primary mt-1">
                      {stats?.inquiries ?? 0}건
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">평균 응답 시간</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stats ? formatTime(stats.avg_response_time_seconds) : '-'}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PopularQuestionsCard 
            questions={questions?.questions ?? []} 
            isLoading={questionsLoading}
          />
          
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="text-base font-semibold text-foreground">미응답 알림</h3>
            </div>
            <AlertsList 
              alerts={alerts?.alerts ?? []} 
              isLoading={alertsLoading}
            />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
